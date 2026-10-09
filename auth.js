
const SUPABASE_URL = "https://kcfbjixhkxpyntdmnqhx.supabase.co/rest/v1/;
const  = "YOUR_SUPABASE_PUBLISHABLE_KEY";
sb_publishable_zwSvLdZsnR0QdAgOUZ4Avw_znzNv8sk
const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

async function signUp(email, password) {
  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password
  });

  if (error) throw error;
  return data;
}

async function logIn(email, password) {
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw error;
  return data;
}

async function logOut() {
  const { error } = await supabaseClient.auth.signOut();
  if (error) throw error;
}

async function getCurrentUser() {
  const { data, error } = await supabaseClient.auth.getUser();
  if (error) throw error;
  return data.user;
}
