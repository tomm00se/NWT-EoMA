// DOM element references
const signInContainer = document.getElementById("signInContainer");
const registerContainer = document.getElementById("registerContainer");
const showRegisterLink = document.getElementById("showRegister");
const showSignInLink = document.getElementById("showSignIn");
const loginForm = document.getElementById("loginForm");
const registrationForm = document.getElementById("registrationForm");
const signInState = document.getElementById("signInState");

// Navigation elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

/**
 * Display status messages to user with optional error styling
 * @param {string} message - The message to display
 * @param {boolean} isError - Whether this is an error message
 */
function signInStatus(message, isError = false) {
    signInState.textContent = message;
    signInState.classList.remove("show", "error");
    if (isError) {
        signInState.classList.add("error");
    }
    signInState.classList.add("show");
    // Auto-hide message after 5 seconds
    setTimeout(() => {
        signInState.classList.remove("show");
    }, 5000);
}

/**
 * Smoothly transition from sign-in to register container
 * Uses fade-out/fade-in with 0.492s timing for professional feel
 */
function switchToRegister() {
    // Start fade-out of sign-in container
    signInContainer.classList.add("fade-out");
    // After sign-in fades out, fade-in register container
    setTimeout(() => {
        registerContainer.classList.add("fade-in");
        signInState.classList.remove("show"); // Clear any status messages
    }, 314); // Match CSS transition duration
}

/**
 * Smoothly transition from register to sign-in container
 * Uses fade-out/fade-in with 0.492s timing for professional feel
 */
function switchToSignIn() {
    // Start fade-out of register container
    registerContainer.classList.remove("fade-in");
    // After register fades out, fade-in sign-in container
    setTimeout(() => {
        signInContainer.classList.remove("fade-out");
        signInState.classList.remove("show"); // Clear any status messages
    }, 314); // Match CSS transition duration
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile navigation toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Event listener for switching to registration form
showRegisterLink.addEventListener("click", (e) => {
    e.preventDefault();
    switchToRegister();
});

// Event listener for switching to sign-in form
showSignInLink.addEventListener("click", (e) => {
    e.preventDefault();
    switchToSignIn();
});

// Handle sign-in form submission
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    // TODO: Implement authentication logic
    // TODO: Validate credentials against backend API
    // TODO: Handle successful login (redirect to dashboard)
    // TODO: Handle failed login (show error message)

    // Temporary feedback for development
    signInStatus("Sign-in functionality coming soon!");
});

// Handle registration form submission
registrationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Client-side password validation
    if (password !== confirmPassword) {
        signInStatus("Passwords do not match.", true);
        return;
    }

    // TODO: Implement comprehensive email validation
    // TODO: Send registration data to backend API
    // TODO: Handle successful registration (auto-login or redirect)
    // TODO: Handle registration errors (email exists, weak password, etc.)

    // Clear form after successful validation
    registrationForm.reset();
    // Provide user feedback and transition back to sign-in
    signInStatus("Account created successfully! Please sign in.");
    switchToSignIn();
});

// Handle window resize for responsive navigation
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});
