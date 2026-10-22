import './style.css'
import supabase from './supabase';

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const result = document.getElementById("result");
const copyBtn = document.getElementById("copy-session");
const welcome_message = document.getElementById("welcome-msg");

let copy_access_token = null;

async function logOut(){
  result.textContent = "Logging out..."
  const { error } = await supabase.auth.signOut();

  if (error) {
    alert(`Failed to log out: ${error}`)
    return;
  }

  copy_access_token = null;
  result.textContent = "Logged out";
  welcome_message.textContent = "Welcome to the auth test"
}

loginBtn.addEventListener("click", async (e) => {
  if(copy_access_token){
    await logOut();
  }

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
  logOut();
})

copyBtn.addEventListener("click", async () => {
  if(copy_access_token){
    await navigator.clipboard.writeText(copy_access_token);
    alert('Copy successful');
  }else{
    alert('Seems like its empty, SORREHH HAHAHAHA');
  }
})

async function checkUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    copy_access_token = session.access_token;
    result.textContent = `Access Token Tail: ${session.access_token.slice(-10)}`;
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