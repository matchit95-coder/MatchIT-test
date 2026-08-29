import './style.css'
import supabase from './supabase';

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const result = document.getElementById("result");
const welcome_message = document.getElementById("welcome-msg");

loginBtn.addEventListener("click", async (e) => {
  result.textContent = "processing.......";

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
});

  if (error) {
    console.error(error);
    alert("Error initiating google OAuth")
  }
})

logoutBtn.addEventListener("click", async (e) => {
  result.textContent = "Logging out..."
  const { error } = await supabase.auth.signOut();

  if (error) {
    alert(`Failed to log out: ${error}`)
    return;
  }

  result.textContent = "Logged out";
  welcome_message.textContent = "Welcome to the auth test"
})

async function checkUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    result.textContent = `Access Token: ${session.access_token}`;
    console.log('Logged in!');
    console.log('Whole session', session);
    console.log('User:', session.user);
    console.log('Access token:', session.access_token);
    welcome_message.textContent = `Welcome to the auth test, ${session.user.email}`
  }
}

// this function automatically runs when user is redirected
// back here again after successful OAuth transaction
checkUser();