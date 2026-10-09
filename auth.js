/* ======================================
   TOOLNEST - AUTHENTICATION
   SUPABASE JS V2
   ====================================== */

// 1. SUPABASE PROJECT URL
const SUPABASE_URL =
  "https://kcfbjixhkxpyntdmnqhx.supabase.co/rest/v1/;

// 2. SUPABASE PUBLISHABLE KEY
// Replace the placeholder below with your real public/publishable key.
const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_zwSvLdZsnR0QdAgOUZ4Avw_znzNv8sk;

// 3. INITIALIZE SUPABASE
if (!window.supabase) {
  throw new Error(
    "Supabase library missing. Load Supabase JS v2 before auth.js."
  );
}

if (
  SUPABASE_PUBLISHABLE_KEY ===
  "PASTE_YOUR_REAL_PUBLISHABLE_KEY_HERE"
) {
  throw new Error(
    "Please paste your Supabase Publishable Key into auth.js."
  );
}

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

// 4. SIGN UP
async function signUp(email, password) {
  const { data, error } = await supabaseClient.auth.signUp({
    email: email.trim(),
    password: password
  });

  if (error) throw error;
  return data;
}

// 5. LOGIN
async function logIn(email, password) {
  const { data, error } =
    await supabaseClient.auth.signInWithPassword({
      email: email.trim(),
      password: password
    });

  if (error) throw error;
  return data;
}

// 6. LOGOUT
async function logOut() {
  const { error } = await supabaseClient.auth.signOut();
  if (error) throw error;
}

// 7. GET CURRENT USER
async function getCurrentUser() {
  const { data, error } = await supabaseClient.auth.getUser();
  if (error) throw error;
  return data.user;
}

// 8. LISTEN FOR AUTHENTICATION CHANGES
supabaseClient.auth.onAuthStateChange((event, session) => {
  window.dispatchEvent(
    new CustomEvent("toolnest-auth-change", {
      detail: { event, session }
    })
  );
});

// 9. MAKE FUNCTIONS AVAILABLE TO HTML
window.toolnestAuth = {
  signUp,
  logIn,
  logOut,
  getCurrentUser
};

console.log("ToolNest authentication ready.");
