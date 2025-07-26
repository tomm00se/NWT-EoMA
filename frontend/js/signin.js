const signInForm = document.getElementById("signInForm");
const registerForm = document.getElementById("registerForm");
const showRegisterLink = document.getElementById("showRegister");
const showSignInLink = document.getElementById("showSignIn");
const loginForm = document.getElementById("loginForm");
const registrationForm = document.getElementById("registrationForm");
const signInState = document.getElementById("signInState");

function signInStatus(message, isError = false) {
  signInState.textContent = message;
  signInState.classList.remove("show", "error");
  if (isError) {
    signInState.classList.add("error");
  }
  signInState.classList.add("show");

  // Hide the message after 5 seconds (This should be enough time for most users to read notification message)
  setTimeout(() => {
    signInState.classList.remove("show");
  }, 5000);
}

// Event listener to switch to the REGISTRATION FORM (Default state)
showRegisterLink.addEventListener("click", (e) => {
  e.preventDefault();
  signInForm.style.display = "none";
  registerForm.style.display = "block";
  signInState.classList.remove("show");
});

// Event listener to switch to the SIGN-IN form
showSignInLink.addEventListener("click", (e) => {
  e.preventDefault();
  registerForm.style.display = "none";
  signInForm.style.display = "block";
  signInState.classList.remove("show");
});

// Handle Sign In form submission
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  // TODO: Check email and password exist
  // TODO: If exist, navigate to homepage with user data populated via api call
  // TODO: If !exist, inform
  // TODO: If !exist, register
});

// Handle Registration form submission
registrationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    signInStatus("Passwords do not match.", true);
    return;
  }

  // TODO: email validation check
  // TODO: post request to make user in db via API call
  // TODO: new user navigates to home page logged in

  registrationForm.reset(); // Clear form

  // Switch to sign-in form after simulated successful registration
  signInForm.style.display = "block";
  registerForm.style.display = "none";
});
