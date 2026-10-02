create table public.route_submission_rate_limits (
  ip_hash text primary key check (char_length(ip_hash) = 64),
  window_started_at timestamptz not null default date_trunc('hour', now()),
  request_count integer not null check (request_count >= 0),
  updated_at timestamptz not null default now()
);

alter table public.route_submission_rate_limits enable row level security;
revoke all on public.route_submission_rate_limits from anon, authenticated;
grant all on public.route_submission_rate_limits to service_role;

create or replace function public.consume_route_submission_rate_limit(
  p_ip_hash text,
  p_max_requests integer default 5
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  current_window timestamptz := date_trunc('hour', now());
  current_count integer;
begin
  insert into public.route_submission_rate_limits (ip_hash, window_started_at, request_count, updated_at)
  values (p_ip_hash, current_window, 1, now())
  on conflict (ip_hash) do update
    set window_started_at = case
      when public.route_submission_rate_limits.window_started_at < current_window then current_window
      else public.route_submission_rate_limits.window_started_at
    end,
    request_count = case
      when public.route_submission_rate_limits.window_started_at < current_window then 1
      else public.route_submission_rate_limits.request_count + 1
    end,
    updated_at = now()
  returning request_count into current_count;
  return current_count <= greatest(coalesce(p_max_requests, 5), 1);
end;
$$;

revoke all on function public.consume_route_submission_rate_limit(text, integer) from public, anon, authenticated;
grant execute on function public.consume_route_submission_rate_limit(text, integer) to service_role;
