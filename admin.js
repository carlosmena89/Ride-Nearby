(async () => {
const config = window.RIDE_CONFIG || {};
const supabase = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);
const ADMIN_EMAIL = 'cjmena89@gmail.com';
const authCard = document.querySelector('#auth-card');
const dashboard = document.querySelector('#dashboard');
const authForm = document.querySelector('#login-form');
const authMessage = document.querySelector('#auth-message');
const loginButton = document.querySelector('#login-button');
const dashboardMessage = document.querySelector('#dashboard-message');
const list = document.querySelector('#submission-list');
const empty = document.querySelector('#empty-dashboard');
const count = document.querySelector('#pending-count');

const setMessage = (element, message, type = '') => {
  element.textContent = message;
  element.className = `form-message ${type}`;
};

const escapeSlug = (value) => value.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const formatDate = (value) => new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
const formValue = (form, name) => form.elements[name].value.trim();

const renderSubmission = (submission) => {
  const card = document.querySelector('#submission-template').content.firstElementChild.cloneNode(true);
  card.dataset.id = submission.id;
  card.querySelector('.submission-date').textContent = formatDate(submission.created_at);
  card.querySelector('.submission-title').textContent = submission.proposed_name;
  card.querySelector('.submission-start').textContent = submission.start_name;
  card.querySelector('.submission-distance').textContent = `~${submission.distance_km} km`;
  card.querySelector('.submission-duration').textContent = `~${Math.round(Number(submission.duration_minutes) / 60 * 10) / 10} h`;
  card.querySelector('.submission-stop-list').textContent = submission.stops.join('  →  ');
  card.querySelector('.submission-reason').textContent = submission.recommendation_reason;
  const source = card.querySelector('.submission-source');
  if (submission.source_url) {
    source.href = submission.source_url;
    source.textContent = submission.source_url;
  } else {
    source.remove();
  }

  const form = card.querySelector('.publish-form');
  form.elements.name_en.value = submission.proposed_name;
  form.elements.name_es.value = submission.proposed_name;
  form.elements.slug.value = escapeSlug(submission.proposed_name);
  form.elements.source_url.value = submission.source_url || '';
  form.elements.description_en.value = submission.recommendation_reason;
  form.elements.description_es.value = submission.recommendation_reason;
  form.dataset.id = submission.id;

  form.addEventListener('submit', (event) => moderate(event, submission.id, 'approve'));
  card.querySelector('[data-action="reject"]').addEventListener('click', () => moderate(null, submission.id, 'reject'));
  return card;
};

const loadSubmissions = async () => {
  setMessage(dashboardMessage, 'Loading pending submissions…');
  const { data, error } = await supabase.rpc('list_pending_route_submissions');
  if (error) {
    setMessage(dashboardMessage, error.message, 'error');
    return;
  }
  list.replaceChildren(...data.map(renderSubmission));
  count.textContent = String(data.length);
  empty.hidden = data.length !== 0;
  dashboardMessage.textContent = '';
  dashboardMessage.className = 'form-message';
};

const moderate = async (event, submissionId, action) => {
  if (event) event.preventDefault();
  const card = list.querySelector(`[data-id="${submissionId}"]`);
  const form = card?.querySelector('.publish-form');
  const message = card?.querySelector('.publish-message');
  let route = null;

  if (action === 'approve') {
    route = {
      slug: formValue(form, 'slug'),
      name_en: formValue(form, 'name_en'),
      name_es: formValue(form, 'name_es'),
      region_en: formValue(form, 'region_en'),
      region_es: formValue(form, 'region_es'),
      latitude: formValue(form, 'latitude'),
      longitude: formValue(form, 'longitude'),
      difficulty_key: formValue(form, 'difficulty_key'),
      description_en: formValue(form, 'description_en'),
      description_es: formValue(form, 'description_es'),
      source_name_en: formValue(form, 'source_name_en'),
      source_name_es: formValue(form, 'source_name_es'),
      source_url: formValue(form, 'source_url')
    };
    if (!form.reportValidity()) return;
  } else if (!window.confirm('Reject this route suggestion?')) {
    return;
  }

  if (form) form.querySelectorAll('input, textarea, select, button').forEach((control) => { control.disabled = true; });
  const { error } = await supabase.rpc('moderate_route_submission', { p_submission_id: submissionId, p_action: action, p_route: route });
  if (error) {
    if (form) form.querySelectorAll('input, textarea, select, button').forEach((control) => { control.disabled = false; });
    setMessage(message || dashboardMessage, error.message, 'error');
    return;
  }
  await loadSubmissions();
};

const showDashboard = (session) => {
  if (!session?.user?.email || session.user.email.toLowerCase() !== ADMIN_EMAIL) {
    setMessage(authMessage, 'This email is not authorized for the route dashboard.', 'error');
    return;
  }
  authCard.hidden = true;
  dashboard.hidden = false;
  loadSubmissions();
};

authForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = document.querySelector('#admin-email').value.trim().toLowerCase();
  const password = document.querySelector('#admin-password').value;
  if (email !== ADMIN_EMAIL) {
    setMessage(authMessage, `Use the authorized admin email: ${ADMIN_EMAIL}`, 'error');
    return;
  }
  setMessage(authMessage, 'Signing in…');
  loginButton.disabled = true;
  try {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMessage(authMessage, error.message, 'error');
    else setMessage(authMessage, 'Signed in successfully.', 'success');
  } catch (error) {
    setMessage(authMessage, error instanceof Error ? error.message : 'Could not connect to Supabase.', 'error');
  } finally {
    loginButton.disabled = false;
  }
});

document.querySelector('#sign-out').addEventListener('click', async () => {
  await supabase.auth.signOut();
  window.location.reload();
});

supabase.auth.onAuthStateChange((_event, session) => {
  if (session) showDashboard(session);
});

const { data: { session } } = await supabase.auth.getSession();
if (session) showDashboard(session);
})();
