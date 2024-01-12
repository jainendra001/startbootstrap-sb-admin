// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBfmuawM17F_FDL3JYIwwEqBc_SX8jlLqI",
    authDomain: "admin-panel-13d07.firebaseapp.com",
    projectId: "admin-panel-13d07",
    storageBucket: "admin-panel-13d07.appspot.com",
    messagingSenderId: "1081320855204",
    appId: "1:1081320855204:web:9c0cf5c0db06fae238f831",
    measurementId: "G-Y1W1JH7YY1"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", function() {
  const loginForm = document.getElementById("loginForm");
  const loginEmailInput = document.getElementById("loginEmail");
  const loginPasswordInput = document.getElementById("loginPassword");

  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const email = loginEmailInput.value;
    const password = loginPasswordInput.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Success! Welcome back!");
        window.alert("Success! Welcome back!");
        // Redirect to dashboard or desired page
        window.location.href = "../index.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error occurred. Try again.");
        window.alert("Error occurred. Try again.");
      });
  });
});
