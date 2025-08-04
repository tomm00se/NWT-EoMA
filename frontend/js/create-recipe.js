const baseUrl = `http://localhost/backend/public/api`;

// DOM elements
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const recipeForm = document.getElementById("recipeForm");
const submitBtn = document.getElementById("submitBtn");
const footerSignOutLink = document.getElementById("footerSignOutLink");

// check if user is authenticated
function checkAuthentication() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    // redirect to signin page
    window.location.href = "signin.html";
    return false;
  }
  return true;
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    if (!checkAuthentication()) {
        return;
    }

    console.log('Page loaded, initializing...');
    updateNavigationForUser();
    setupEventListeners();
    updateRemoveButtons();
});

// Navigation functionality
if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
        navToggle.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Close mobile menu on nav link click
    document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
            navToggle.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });
}

// Navbar scroll styling
window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }
});

// Setup all event listeners
function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Form submission
    if (recipeForm) {
        recipeForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Footer sign out link
    if (footerSignOutLink) {
        footerSignOutLink.addEventListener("click", (e) => {
            e.preventDefault();
            openSignOutModal();
        });
    }
    
    // Add buttons
    const addIngredientBtn = document.getElementById("addIngredientBtn");
    const addInstructionBtn = document.getElementById("addInstructionBtn");
    
    if (addIngredientBtn) {
        addIngredientBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Add ingredient clicked');
            addIngredientField();
        });
    }
    
    if (addInstructionBtn) {
        addInstructionBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Add instruction clicked');
            addInstructionField();
        });
    }

    // Setup image upload
    setupImageUpload();
    
    // Modal controls
    setupModalControls();
    
    // ESC key to close modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
}

function setupModalControls() {
    const successModal = document.getElementById("successModal");
    const errorModal = document.getElementById("errorModal");
    const signOutModal = document.getElementById("signOutModal");
    
    // Success modal
    const closeSuccessModal = document.getElementById("closeSuccessModal");
    const createAnotherBtn = document.getElementById("create-another-btn");
    
    if (closeSuccessModal) {
        closeSuccessModal.addEventListener('click', closeSuccessModalFunc);
    }
    if (createAnotherBtn) {
        createAnotherBtn.addEventListener('click', function() {
            closeSuccessModalFunc();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    if (successModal) {
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) closeSuccessModalFunc();
        });
    }
    
    // Error modal
    const closeErrorModal = document.getElementById("closeErrorModal");
    if (closeErrorModal) {
        closeErrorModal.addEventListener('click', closeErrorModalFunc);
    }
    if (errorModal) {
        errorModal.addEventListener('click', (e) => {
            if (e.target === errorModal) closeErrorModalFunc();
        });
    }
    
    // Sign out modal
    const closeModal = document.getElementById("closeModal");
    const cancelSignOut = document.getElementById("cancelSignOut");
    const confirmSignOut = document.getElementById("confirmSignOut");
    
    if (closeModal) closeModal.addEventListener('click', closeSignOutModalFunc);
    if (cancelSignOut) cancelSignOut.addEventListener('click', closeSignOutModalFunc);
    if (confirmSignOut) confirmSignOut.addEventListener('click', handleLogout);
    
    if (signOutModal) {
        signOutModal.addEventListener('click', (e) => {
            if (e.target === signOutModal) closeSignOutModalFunc();
        });
    }
}

// User authentication
async function updateNavigationForUser() {
    const user = JSON.parse(localStorage.getItem("user"));
    const signInLink = document.querySelector(".signin-link");
    
    if (signInLink) {
        if (user && user.name) {
            signInLink.textContent = "Profile";
            signInLink.href = "profile.html";
            signInLink.classList.add("user-greeting");
        } else {
            signInLink.textContent = "Sign In";
            signInLink.href = "signin.html";
            signInLink.classList.remove("user-greeting");
        }
    }
}

function openSignOutModal() {
    const signOutModal = document.getElementById("signOutModal");
    if (signOutModal) {
        signOutModal.classList.add("active");
        document.body.style.overflow = "hidden";
    }
}

function closeSignOutModalFunc() {
    const signOutModal = document.getElementById("signOutModal");
    if (signOutModal) {
        signOutModal.classList.remove("active");
        document.body.style.overflow = "";
    }
}

async function handleLogout() {
    try {
        const response = await fetch(`${baseUrl}/users/logout/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });
        
        if (response.ok) {
            localStorage.removeItem("user");
            localStorage.removeItem("favorites");
            localStorage.removeItem("userRatings");
            await updateNavigationForUser();
            closeSignOutModalFunc();
            alert("Successfully logged out!");
        } else {
            const errorData = await response.json();
            alert(`Logout failed: ${errorData.message || "Unknown error"}`);
        }
    } catch (error) {
        localStorage.removeItem("user");
        localStorage.removeItem("favorites");
        localStorage.removeItem("userRatings");
        await updateNavigationForUser();
        closeSignOutModalFunc();
        alert("Logged out locally (server connection failed)");
    }
}

// Dynamic form field management
function addIngredientField() {
    console.log('Adding ingredient field...');
    const container = document.getElementById('ingredientsContainer');
    if (!container) {
        console.error('Ingredients container not found');
        return;
    }
    
    const newItem = createIngredientField();
    container.appendChild(newItem);
    updateRemoveButtons();
    
    // Focus on the first input of the new ingredient
    const firstInput = newItem.querySelector('input[name="ingredientName"]');
    if (firstInput) {
        firstInput.focus();
    }
}

function createIngredientField() {
    const div = document.createElement('div');
    div.className = 'ingredient-item';
    div.innerHTML = `
        <div class="form-row">
            <div class="form-group flex-grow">
                <input type="text" name="ingredientName" class="form-input" placeholder="Ingredient name" required>
            </div>
            <div class="form-group">
                <input type="text" name="ingredientAmount" class="form-input" placeholder="Amount" required>
            </div>
            <div class="form-group">
                <select name="ingredientUnit" class="form-select">
                    <option value="cups">cups</option>
                    <option value="tbsp">tbsp</option>
                    <option value="tsp">tsp</option>
                    <option value="oz">oz</option>
                    <option value="lbs">lbs</option>
                    <option value="g">grams</option>
                    <option value="kg">kg</option>
                    <option value="ml">ml</option>
                    <option value="l">liters</option>
                    <option value="pieces">pieces</option>
                    <option value="to taste">to taste</option>
                </select>
            </div>
            <button type="button" class="btn-remove-ingredient" onclick="removeIngredient(this)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
            </button>
        </div>
    `;
    return div;
}

function addInstructionField() {
    console.log('Adding instruction field...');
    const container = document.getElementById('instructionsContainer');
    if (!container) {
        console.error('Instructions container not found');
        return;
    }
    
    const stepNumber = container.children.length + 1;
    const newItem = createInstructionField(stepNumber);
    container.appendChild(newItem);
    updateRemoveButtons();
    
    // Focus on the textarea of the new instruction
    const textarea = newItem.querySelector('textarea');
    if (textarea) {
        textarea.focus();
    }
}

function createInstructionField(stepNumber) {
    const div = document.createElement('div');
    div.className = 'instruction-item';
    div.innerHTML = `
        <div class="instruction-header">
            <span class="step-number">${stepNumber}</span>
            <button type="button" class="btn-remove-instruction" onclick="removeInstruction(this)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
            </button>
        </div>
        <textarea name="instructionText" class="form-textarea" placeholder="Describe this step in detail" rows="3" required></textarea>
    `;
    return div;
}

function removeIngredient(button) {
    const item = button.closest('.ingredient-item');
    if (item) {
        item.remove();
        updateRemoveButtons();
    }
}

function removeInstruction(button) {
    const item = button.closest('.instruction-item');
    if (item) {
        item.remove();
        updateInstructionNumbers();
        updateRemoveButtons();
    }
}

function updateRemoveButtons() {
    const ingredientItems = document.querySelectorAll('.ingredient-item');
    const instructionItems = document.querySelectorAll('.instruction-item');
    
    // Update ingredient remove buttons
    ingredientItems.forEach((item, index) => {
        const removeBtn = item.querySelector('.btn-remove-ingredient');
        if (removeBtn) {
            removeBtn.disabled = ingredientItems.length === 1;
        }
    });
    
    // Update instruction remove buttons
    instructionItems.forEach((item, index) => {
        const removeBtn = item.querySelector('.btn-remove-instruction');
        if (removeBtn) {
            removeBtn.disabled = instructionItems.length === 1;
        }
    });
}

function updateInstructionNumbers() {
    const instructionItems = document.querySelectorAll('.instruction-item');
    instructionItems.forEach((item, index) => {
        const stepNumber = item.querySelector('.step-number');
        if (stepNumber) {
            stepNumber.textContent = index + 1;
        }
    });
}

// Image upload functionality
function setupImageUpload() {
    const imageInput = document.getElementById('recipeImage');
    const uploadArea = document.getElementById('imageUploadArea');
    const changeImageBtn = document.getElementById('changeImageBtn');
    const removeImageBtn = document.getElementById('removeImageBtn');

    if (!imageInput || !uploadArea) return;

    // Click to upload
    uploadArea.addEventListener('click', () => {
        imageInput.click();
    });

    // Change image button
    if (changeImageBtn) {
        changeImageBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            imageInput.click();
        });
    }

    // Remove image button
    if (removeImageBtn) {
        removeImageBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            clearImagePreview();
        });
    }

    // File input change
    imageInput.addEventListener('change', handleImageSelect);

    // Drag and drop functionality
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('drag-over');
    });

    uploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            if (isValidImageFile(files[0])) {
                imageInput.files = files;
                handleImageSelect({ target: { files: files } });
            } else {
                showFormError('Please select a valid image file (PNG, JPG, JPEG)');
            }
        }
    });
}

function handleImageSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type against whitelist
    if (!isValidImageFile(file)) {
        showFormError('Please select a valid image file (PNG, JPG, JPEG)');
        // Clear the input
        event.target.value = '';
        return;
    }

    // Validate file size (5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
        showFormError('Image file size must be less than 5MB');
        // Clear the input
        event.target.value = '';
        return;
    }

    // Create file reader
    const reader = new FileReader();
    reader.onload = function(e) {
        showImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
}

// Image whitelist
function isValidImageFile(file) {
    const allowedTypes = [
        'image/png',
        'image/jpeg'
    ];
    return allowedTypes.includes(file.type);
}

function showImagePreview(imageSrc) {
    const uploadPlaceholder = document.getElementById('uploadPlaceholder');
    const imagePreview = document.getElementById('imagePreview');
    const previewImage = document.getElementById('previewImage');

    if (uploadPlaceholder && imagePreview && previewImage) {
        previewImage.src = imageSrc;
        uploadPlaceholder.style.display = 'none';
        imagePreview.style.display = 'block';
    }
}

function clearImagePreview() {
    const imageInput = document.getElementById('recipeImage');
    const uploadPlaceholder = document.getElementById('uploadPlaceholder');
    const imagePreview = document.getElementById('imagePreview');
    const previewImage = document.getElementById('previewImage');

    if (imageInput) imageInput.value = '';
    if (previewImage) previewImage.src = '';
    if (uploadPlaceholder) uploadPlaceholder.style.display = 'block';
    if (imagePreview) imagePreview.style.display = 'none';
}

// Form reset function
function resetForm() {
    console.log('Resetting form...');
    
    if (!recipeForm) {
        console.error('Recipe form not found');
        return;
    }
    
    recipeForm.reset();
    
    // Clear image preview
    clearImagePreview();
    
    // Reset dynamic fields to single items
    const ingredientsContainer = document.getElementById('ingredientsContainer');
    const instructionsContainer = document.getElementById('instructionsContainer');
    
    if (ingredientsContainer) {
        // Clear all but the first ingredient
        while (ingredientsContainer.children.length > 1) {
            ingredientsContainer.removeChild(ingredientsContainer.lastChild);
        }
        
        // Reset the remaining fields
        const firstIngredientName = ingredientsContainer.querySelector('input[name="ingredientName"]');
        const firstIngredientAmount = ingredientsContainer.querySelector('input[name="ingredientAmount"]');
        const firstIngredientUnit = ingredientsContainer.querySelector('select[name="ingredientUnit"]');
        
        if (firstIngredientName) firstIngredientName.value = '';
        if (firstIngredientAmount) firstIngredientAmount.value = '';
        if (firstIngredientUnit) firstIngredientUnit.selectedIndex = 0;
    }
    
    if (instructionsContainer) {
        // Clear all but the first instruction
        while (instructionsContainer.children.length > 1) {
            instructionsContainer.removeChild(instructionsContainer.lastChild);
        }
        
        // Reset the remaining fields
        const firstInstructionText = instructionsContainer.querySelector('textarea[name="instructionText"]');
        if (firstInstructionText) firstInstructionText.value = '';
    }
    
    // Clear validation states
    document.querySelectorAll('.form-error').forEach(error => error.remove());
    document.querySelectorAll('.error').forEach(field => field.classList.remove('error'));
    
    updateRemoveButtons();
    updateInstructionNumbers();
    
    console.log('Form reset complete');
}

// Form submission and validation
async function handleFormSubmit(e) {
    e.preventDefault();
    console.log('Form submission started...');
    
    // Show loading state
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-flex';
    submitBtn.disabled = true;
    
    try {
        const formData = new FormData(e.target);
        
        // Collect categories (checkboxes)
        const categories = [];
        document.querySelectorAll('input[name="categories"]:checked').forEach(checkbox => {
            categories.push(checkbox.value);
        });
        
        // Collect ingredients
        const ingredients = [];
        document.querySelectorAll('.ingredient-item').forEach(item => {
            const name = item.querySelector('input[name="ingredientName"]').value.trim();
            const amount = item.querySelector('input[name="ingredientAmount"]').value.trim();
            const unit = item.querySelector('select[name="ingredientUnit"]').value;
            
            if (name && amount) {
                ingredients.push({
                    name: name,
                    quantity: amount,
                    unit: unit
                });
            }
        });
        
        // Collect instructions/steps
        const steps = [];
        document.querySelectorAll('.instruction-item').forEach((item, index) => {
            const instructions = item.querySelector('textarea[name="instructionText"]').value.trim();
            
            if (instructions) {
                steps.push({
                    step_number: index + 1,
                    instructions: instructions,
                    step_time: "0" // Default to 0 since no time field in new form
                });
            }
        });
        
        // Validate required data
        if (categories.length === 0) {
            throw new Error('Please select at least one category.');
        }
        if (ingredients.length === 0) {
            throw new Error('Please add at least one ingredient.');
        }
        if (steps.length === 0) {
            throw new Error('Please add at least one instruction step.');
        }
        
        // Handle image
        const imageFile = formData.get('recipeImage');
        if (!imageFile || imageFile.size === 0) {
            throw new Error('Please select an image for your recipe.');
        }
        
        // Convert image to base64
        const reader = new FileReader();
        reader.onload = async function(event) {
            const payload = {
                title: formData.get('recipeName'),
                description: formData.get('recipeDescription'),
                ingredients: ingredients,
                steps: steps,
                categories: categories,
                total_time: formData.get('cookingTime'),
                servings: formData.get('servings'),
                image_url: event.target.result
            };
            
            console.log('Sending payload:', payload);
            
            try {
                const response = await fetch(`${baseUrl}/recipes/create/`, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    console.log('Recipe created successfully:', data);
                    showSuccessModal();
                    resetForm();
                } else {
                    console.error('Server error:', data);
                    showErrorModal(data.message || 'Failed to create recipe. Please try again.');
                }
            } catch (networkError) {
                console.error('Network error:', networkError);
                showErrorModal('Network error. Please check your connection and try again.');
            } finally {
                // Reset button state
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;
            }
        };
        
        reader.onerror = function() {
            throw new Error('Failed to process image. Please try a different image.');
        };
        
        reader.readAsDataURL(imageFile);
        
    } catch (error) {
        console.error('Form validation error:', error);
        showErrorModal(error.message);
        
        // Reset button state
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
    }
}

function showFormError(message) {
    // Create a general error message at the top of the form
    const existingError = document.querySelector('.general-form-error');
    if (existingError) {
        existingError.remove();
    }
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'general-form-error form-error';
    errorDiv.textContent = message;
    
    if (recipeForm) {
        recipeForm.insertBefore(errorDiv, recipeForm.firstChild);
    }
}

// Modal functions
function showSuccessModal() {
    const successModal = document.getElementById("successModal");
    if (successModal) {
        successModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeSuccessModalFunc() {
    const successModal = document.getElementById("successModal");
    if (successModal) {
        successModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function showErrorModal(message) {
    const errorMessage = document.getElementById('errorMessage');
    const errorModal = document.getElementById("errorModal");
    
    if (errorMessage) {
        errorMessage.textContent = message;
    }
    if (errorModal) {
        errorModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeErrorModalFunc() {
    const errorModal = document.getElementById("errorModal");
    if (errorModal) {
        errorModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function closeAllModals() {
    closeSuccessModalFunc();
    closeErrorModalFunc();
    closeSignOutModalFunc();
}

// Make functions global for onclick handlers
window.removeIngredient = removeIngredient;
window.removeInstruction = removeInstruction;
window.resetForm = resetForm;
window.closeSuccessModalFunc = closeSuccessModalFunc;
