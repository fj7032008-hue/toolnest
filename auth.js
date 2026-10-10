/* ======================================
   TOOLNEST - AUTHENTICATION
   SUPABASE JS V2
   ====================================== */

const SUPABASE_URL =
  "https://kcfbjixhkxpyntdmnqhx.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_zwSvLdZsnR0QdAgOUZ4Avw_znzNv8sk";

// Check Supabase library
if (!window.supabase) {
  throw new Error(
    "Supabase library missing. Load Supabase JS v2 before auth.js."
  );
}

// Initialize Supabase
const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

// Sign up
async function signUp(email, password) {
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  const { data, error } = await supabaseClient.auth.signUp({
    email: email.trim(),
    password: password
  });

  if (error) throw error;

  return data;
}

// Login
async function logIn(email, password) {
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  const { data, error } =
    await supabaseClient.auth.signInWithPassword({
      email: email.trim(),
      password: password
    });

  if (error) throw error;

  return data;
}

// Logout
async function logOut() {
  const { error } = await supabaseClient.auth.signOut();

  if (error) throw error;
}

// Get current user
async function getCurrentUser() {
  const { data, error } = await supabaseClient.auth.getUser();

  if (error) throw error;

  return data.user;
}

// Get current session
async function getCurrentSession() {
  const { data, error } = await supabaseClient.auth.getSession();

  if (error) throw error;

  return data.session;
}

// Authentication change listener
supabaseClient.auth.onAuthStateChange((event, session) => {
  window.dispatchEvent(
    new CustomEvent("toolnest-auth-change", {
      detail: { event, session }
    })
  );
});

// Make functions available to index.html
window.toolnestAuth = {
  signUp,
  logIn,
  logOut,
  getCurrentUser,
  getCurrentSession
};

console.log("ToolNest authentication ready.");
