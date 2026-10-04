import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

const jsonResponse = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: corsHeaders });

const cleanText = (value: unknown, maxLength: number) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed." }, 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const turnstileSecret = Deno.env.get("TURNSTILE_SECRET");
  const turnstileHostname = Deno.env.get("TURNSTILE_HOSTNAME");
  const rateLimitSalt = Deno.env.get("RATE_LIMIT_SALT");
  if (!supabaseUrl || !serviceRoleKey || !turnstileSecret || !turnstileHostname || !rateLimitSalt) {
    return jsonResponse({ error: "Submission service is not configured." }, 503);
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid request body." }, 400);
  }

  const proposedName = cleanText(body.proposedName, 100);
  const startName = cleanText(body.startName, 120);
  const recommendationReason = cleanText(body.recommendationReason, 1500);
  const rawStops = Array.isArray(body.stops) ? body.stops : [];
  const stops = rawStops.map((stop) => cleanText(stop, 120)).filter(Boolean).slice(0, 20);
  const distanceKm = Number(body.distanceKm);
  const durationMinutes = Number(body.durationMinutes);
  const sourceUrl = cleanText(body.sourceUrl, 1000);
  const routeUrl = cleanText(body.routeUrl, 1000);
  const mainRoads = cleanText(body.mainRoads, 500);
  const turnstileToken = cleanText(body.turnstileToken, 2048);

  if (proposedName.length < 3 || startName.length < 2 || stops.length < 2) {
    return jsonResponse({ error: "Add a route name, starting point and at least two stops." }, 400);
  }
  if (!Number.isFinite(distanceKm) || distanceKm < 1 || distanceKm > 2000) {
    return jsonResponse({ error: "Route distance must be between 1 and 2,000 km." }, 400);
  }
  if (!Number.isInteger(durationMinutes) || durationMinutes < 1 || durationMinutes > 2880) {
    return jsonResponse({ error: "Ride time must be between 1 minute and 48 hours." }, 400);
  }
  if (recommendationReason.length < 20) {
    return jsonResponse({ error: "Tell us a little more about why you recommend this route." }, 400);
  }
  if (!routeUrl) return jsonResponse({ error: "Add a link to the route so we can preserve the intended trace." }, 400);
  try {
    if (new URL(routeUrl).protocol !== "https:") throw new Error("HTTPS required");
  } catch {
    return jsonResponse({ error: "The route link must be a valid HTTPS URL." }, 400);
  }
  if (sourceUrl) {
    try {
      if (new URL(sourceUrl).protocol !== "https:") throw new Error("HTTPS required");
    } catch {
      return jsonResponse({ error: "The source link must be a valid HTTPS URL." }, 400);
    }
  }
  if (!turnstileToken) return jsonResponse({ error: "Complete the anti-spam check and try again." }, 400);

  const verificationBody = new URLSearchParams({
    secret: turnstileSecret,
    response: turnstileToken,
  });
  const forwardedFor = request.headers.get("cf-connecting-ip");
  if (forwardedFor) verificationBody.set("remoteip", forwardedFor);

  let verification: { success?: boolean; hostname?: string; action?: string };
  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: verificationBody,
    });
    verification = await response.json();
  } catch {
    return jsonResponse({ error: "Could not verify the anti-spam check. Please try again." }, 502);
  }
  if (!verification.success || verification.hostname !== turnstileHostname || verification.action !== "submit-route") {
    return jsonResponse({ error: "The anti-spam check could not be verified. Please try again." }, 400);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const clientIp = request.headers.get("cf-connecting-ip")?.trim()
    || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (!clientIp) return jsonResponse({ error: "Could not identify the request source." }, 400);

  const hashInput = new TextEncoder().encode(`${rateLimitSalt}:${clientIp}`);
  const digest = await crypto.subtle.digest("SHA-256", hashInput);
  const ipHash = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
  const { data: allowed, error: rateLimitError } = await supabase.rpc("consume_route_submission_rate_limit", {
    p_ip_hash: ipHash,
    p_max_requests: 5,
  });
  if (rateLimitError) {
    console.error("Route suggestion rate-limit failed:", rateLimitError.message);
    return jsonResponse({ error: "We could not accept suggestions right now. Please try again later." }, 503);
  }
  if (!allowed) return jsonResponse({ error: "Too many suggestions from this network. Please try again later." }, 429);

  const { error } = await supabase.from("route_submissions").insert({
    proposed_name: proposedName,
    start_name: startName,
    stops,
    distance_km: distanceKm,
    duration_minutes: durationMinutes,
    recommendation_reason: recommendationReason,
    route_url: routeUrl,
    main_roads: mainRoads || null,
    source_url: sourceUrl || null,
    status: "pending",
  });

  if (error) {
    console.error("Route suggestion insert failed:", error.message);
    return jsonResponse({ error: "We could not save your suggestion. Please try again later." }, 500);
  }

  return jsonResponse({ ok: true }, 201);
});
