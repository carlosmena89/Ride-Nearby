import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const config = window.RIDE_CONFIG || {};
const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey);
const form = document.querySelector('#reset-form');
const message = document.querySelector('#reset-message');

const setMessage = (text, type = '') => {
  message.textContent = text;
  message.className = `form-message ${type}`;
};

const showForm = () => {
  form.hidden = false;
  setMessage('Choose a strong password for the admin dashboard.');
};

supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'PASSWORD_RECOVERY' && session) showForm();
});

const { data: { session }, error } = await supabase.auth.getSession();
if (error || !session) {
  setMessage('This recovery link is invalid or has expired. Request a new one from Supabase.', 'error');
} else {
  showForm();
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const password = document.querySelector('#new-password').value;
  const confirmation = document.querySelector('#confirm-password').value;
  if (password !== confirmation) {
    setMessage('The passwords do not match.', 'error');
    return;
  }
  const { error: updateError } = await supabase.auth.updateUser({ password });
  if (updateError) {
    setMessage(updateError.message, 'error');
    return;
  }
  setMessage('Password saved. You can now sign in to the admin dashboard.', 'success');
  window.setTimeout(() => { window.location.href = './admin.html'; }, 1200);
});
