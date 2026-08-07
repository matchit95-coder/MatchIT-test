import './style.css'
import { createClient } from '@supabase/supabase-js';

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const result = document.getElementById("result");

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

loginBtn.addEventListener("click", async (e) => {
  result.textContent = "processing.......";

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });

  if (error) {
    console.error(error);
  }
})

logoutBtn.addEventListener("click", async (e) => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    alert(`Failed to log out: ${error}`)
    return;
  }

  result.textContent = "Logged out";
})

async function checkUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    result.textContent = `Access Token: ${session.access_token}`;
    console.log('Logged in!');
    console.log('Whole session', session)
    console.log('User:', session.user);
    console.log('Access token:', session.access_token);
  }
}

checkUser();