import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

import { auth } from "./firebase.js";

// Add approved family Google account emails here.
// Leave empty while testing. Once ready, add emails and only those accounts can access the app.
const APPROVED_EMAILS = [
  // "you@example.com",
  // "mom@example.com",
  // "uncle@example.com"
];

const provider = new GoogleAuthProvider();

function isApproved(user) {
  if (APPROVED_EMAILS.length === 0) return true;
  return APPROVED_EMAILS.includes(user.email.toLowerCase());
}

export function setupAuth(onLogin, onLogout) {
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const mobileLogoutBtn = document.getElementById("mobileLogoutBtn");
  const unauthorizedLogoutBtn = document.getElementById("unauthorizedLogoutBtn");
  const userEmail = document.getElementById("userEmail");
  const appContent = document.getElementById("appContent");
  const signedOutMessage = document.getElementById("signedOutMessage");
  const unauthorizedMessage = document.getElementById("unauthorizedMessage");
  const sidebar = document.getElementById("sidebar");
  const menuBtn = document.getElementById("menuBtn");

  loginBtn.onclick = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  logoutBtn.onclick = logout;
  mobileLogoutBtn.onclick = logout;
  unauthorizedLogoutBtn.onclick = logout;

  onAuthStateChanged(auth, async user => {
    if (user && isApproved(user)) {
      userEmail.textContent = user.email;
      appContent.classList.remove("hidden");
      sidebar.classList.remove("hidden");
      menuBtn.classList.remove("hidden");
      mobileLogoutBtn.classList.remove("hidden");
      signedOutMessage.classList.add("hidden");
      unauthorizedMessage.classList.add("hidden");
      await onLogin(user);
    } else if (user && !isApproved(user)) {
      userEmail.textContent = "";
      appContent.classList.add("hidden");
      sidebar.classList.add("hidden");
      menuBtn.classList.add("hidden");
      mobileLogoutBtn.classList.add("hidden");
      signedOutMessage.classList.add("hidden");
      unauthorizedMessage.classList.remove("hidden");
      onLogout();
    } else {
      userEmail.textContent = "";
      appContent.classList.add("hidden");
      sidebar.classList.add("hidden");
      menuBtn.classList.add("hidden");
      mobileLogoutBtn.classList.add("hidden");
      signedOutMessage.classList.remove("hidden");
      unauthorizedMessage.classList.add("hidden");
      onLogout();
    }
  });
}
