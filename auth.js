/* ======================================
   TOOLNEST - AUTHENTICATION
   SUPABASE JS V2
   ====================================== */

const SUPABASE_URL =
  "https://kcfbjixhkxpyntdmnqhx.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_zwSvLdZsnR0QdAgOUZ4Avw_znzNv8sk";

const TOOLNEST_URL =
  "https://fj7032008-hue.github.io/toolnest/";

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

// ======================================
// SIGN UP
// ======================================

async function signUp(email, password) {
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  const { data, error } = await supabaseClient.auth.signUp({
    email: email.trim(),
    password: password,
    options: {
      emailRedirectTo: TOOLNEST_URL
    }
  });

  if (error) {
    console.error("Signup error:", error.message);
    throw error;
  }

  return data;
}

// ======================================
// LOGIN
// ======================================

async function logIn(email, password) {
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  const { data, error } =
    await supabaseClient.auth.signInWithPassword({
      email: email.trim(),
      password: password
    });

  if (error) {
    console.error("Login error:", error.message);
    throw error;
  }

  return data;
}

// ======================================
// LOGOUT
// ======================================

async function logOut() {
  const { error } = await supabaseClient.auth.signOut();

  if (error) {
    console.error("Logout error:", error.message);
    throw error;
  }

  return true;
}

// ======================================
// GET CURRENT USER
// ======================================

async function getCurrentUser() {
  const { data, error } = await supabaseClient.auth.getUser();

  if (error) {
    throw error;
  }

  return data.user;
}

// ======================================
// GET CURRENT SESSION
// ======================================

async function getCurrentSession() {
  const { data, error } = await supabaseClient.auth.getSession();

  if (error) {
    throw error;
  }

  return data.session;
}

// ======================================
// AUTH STATE CHANGE LISTENER
// ======================================

supabaseClient.auth.onAuthStateChange((event, session) => {
  window.dispatchEvent(
    new CustomEvent("toolnest-auth-change", {
      detail: {
        event,
        session
      }
    })
  );

  console.log("Auth event:", event);
});

// ======================================
// EXPORT FUNCTIONS
// ======================================

window.toolnestAuth = {
  signUp,
  logIn,
  logOut,
  getCurrentUser,
  getCurrentSession
};

console.log("ToolNest authentication ready!");
