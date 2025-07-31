// DOM elements
const signInContainer = document.getElementById("signInContainer");
const registerContainer = document.getElementById("registerContainer");
const showRegisterLink = document.getElementById("showRegister");
const showSignInLink = document.getElementById("showSignIn");
const loginForm = document.getElementById("loginForm");
const registrationForm = document.getElementById("registrationForm");
const signInState = document.getElementById("signInState");

// redirect if already logged in
document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.name) {
    // already logged in, redirect
    window.location.href = "index.html";
  }
});

// nav elements
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

const baseUrl = `http://localhost/backend/public/api`;

// show status message
function signInStatus(message, isError = false) {
  signInState.textContent = message;
  signInState.classList.remove("show", "error");
  if (isError) {
    signInState.classList.add("error");
  }
  signInState.classList.add("show");
  // auto-hide after 5s
  setTimeout(() => {
    signInState.classList.remove("show");
  }, 5000);
}

function registerStatus(message, isError = false) {
  const registerState = document.getElementById("registerState");
  registerState.textContent = message;
  registerState.classList.remove("show", "error");
  if (isError) {
    registerState.classList.add("error");
  }
  registerState.classList.add("show");
  // auto-hide after 5s
  setTimeout(() => {
    registerState.classList.remove("show");
  }, 5000);
}

// smoothly transition from sign-in to register container
function switchToRegister() {
  // fade out signin
  signInContainer.classList.add("fade-out");
  // fade in register
  setTimeout(() => {
    registerContainer.classList.add("fade-in");
    signInState.classList.remove("show"); // clear status
  }, 314); // Match CSS transition duration
}

// back to signin
function switchToSignIn() {
  // fade out register
  registerContainer.classList.remove("fade-in");
  // fade in signin
  setTimeout(() => {
    signInContainer.classList.remove("fade-out");
    signInState.classList.remove("show"); // clear status
  }, 314); // Match CSS transition duration
}

// navbar scroll styling
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// mobile nav toggle
navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// close mobile menu on nav click
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// switch to register form
showRegisterLink.addEventListener("click", (e) => {
  e.preventDefault();
  switchToRegister();
});

// switch to signin form
showSignInLink.addEventListener("click", (e) => {
  e.preventDefault();
  switchToSignIn();
});

// signin form submit
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  // basic validation
  if (!email || !password) {
    signInStatus("Please enter both email and password.", true);
    return;
  }

  try {
    const response = await fetch(`${baseUrl}/users/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData.message || "Login failed. Please try again.";
      throw new Error(errorMessage);
    }

    const data = await response.json();

    // store user data
    localStorage.setItem("user", JSON.stringify(data.user));

    // clear form
    loginForm.reset();

    // success message
    signInStatus("Login successful! Redirecting...");

    // redirect after delay
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);
  } catch (error) {
    // login error
    signInStatus(error.message, true);
  }
});

// register form submit
registrationForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const dietaryPreference = document.getElementById(
    "registerDietaryRequirement"
  ).value;

  // password validation
  if (password !== confirmPassword) {
    registerStatus("Passwords do not match.", true);
    return;
  }

  try {
    const response = await fetch(`${baseUrl}/users/registration/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        dietary_preference: dietaryPreference,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData.message || "Registration failed. Please try again.";
      throw new Error(errorMessage);
    }

    // clear form
    registrationForm.reset();
    // success feedback
    registerStatus("Account created successfully! Please sign in.");
    switchToSignIn();
  } catch (error) {
    // registration error
    registerStatus(error.message, true);
  }
});

// cleanup nav on resize
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
  }
});
