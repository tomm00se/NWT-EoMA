// DOM element references
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const exploreBtn = document.getElementById('exploreBtn');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const recipesGrid = document.getElementById('recipesGrid');
const filterBtns = document.querySelectorAll('.filter-btn');

// Sample recipe data with detailed information for modal display
// TODO: Implement actual PHP API
const sampleRecipes = [
    {
        id: 1,
        title: "Spaghetti Bolognese",
        category: "Main Course",
        description: "Classic Italian pasta dish with rich meat sauce, slow-cooked with aromatic herbs and vegetables for the perfect comfort meal.",
        time: "45 min",
        rating: "4.8",
        ratingCount: 156,
        icon: "🍝",
        tags: ["main", "italian", "meat"],
        servings: "4 people",
        difficulty: "Medium",
        ingredients: [
            { name: "Ground beef", quantity: "500g" },
            { name: "Spaghetti pasta", quantity: "400g" },
            { name: "Onion, diced", quantity: "1 large" },
            { name: "Garlic cloves, minced", quantity: "3" },
            { name: "Canned tomatoes", quantity: "400g" },
            { name: "Tomato paste", quantity: "2 tbsp" },
            { name: "Red wine", quantity: "1/2 cup" },
            { name: "Fresh basil", quantity: "1/4 cup" },
            { name: "Parmesan cheese", quantity: "1/2 cup" },
            { name: "Olive oil", quantity: "2 tbsp" },
            { name: "Salt and pepper", quantity: "to taste" }
        ],
        instructions: [
            "Heat olive oil in a large pan over medium heat. Add diced onion and cook until translucent, about 5 minutes.",
            "Add minced garlic and cook for another minute until fragrant.",
            "Add ground beef and cook, breaking it up with a spoon, until browned and cooked through.",
            "Stir in tomato paste and cook for 2 minutes. Add red wine and let it simmer for 3 minutes.",
            "Add canned tomatoes, breaking them up with a spoon. Season with salt and pepper.",
            "Reduce heat to low and simmer for 20-25 minutes, stirring occasionally.",
            "Meanwhile, cook spaghetti according to package directions until al dente. Drain and reserve 1/2 cup pasta water.",
            "Stir fresh basil into the sauce. Toss pasta with sauce, adding pasta water if needed.",
            "Serve immediately topped with grated Parmesan cheese."
        ]
    },
    {
        id: 2,
        title: "Vegan Pancakes",
        category: "Breakfast",
        description: "Fluffy American-style pancakes made entirely plant-based with simple ingredients that everyone will love.",
        time: "20 min",
        rating: "4.6",
        ratingCount: 156,
        icon: "🥞",
        tags: ["breakfast", "vegan", "vegetarian", "quick"],
        servings: "3 people",
        difficulty: "Easy",
        ingredients: [
            { name: "All-purpose flour", quantity: "2 cups" },
            { name: "Baking powder", quantity: "2 tsp" },
            { name: "Salt", quantity: "1/2 tsp" },
            { name: "Sugar", quantity: "2 tbsp" },
            { name: "Plant milk (almond/oat)", quantity: "1 3/4 cups" },
            { name: "Vanilla extract", quantity: "1 tsp" },
            { name: "Vegetable oil", quantity: "2 tbsp" },
            { name: "Apple cider vinegar", quantity: "1 tbsp" }
        ],
        instructions: [
            "In a large bowl, whisk together flour, baking powder, salt, and sugar.",
            "In another bowl, combine plant milk, vanilla extract, oil, and apple cider vinegar.",
            "Pour the wet ingredients into the dry ingredients and stir until just combined. Don't overmix - lumps are okay.",
            "Heat a non-stick pan or griddle over medium heat. Lightly oil the surface.",
            "Pour 1/4 cup of batter for each pancake onto the hot surface.",
            "Cook until bubbles form on the surface and edges look set, about 2-3 minutes.",
            "Flip and cook for another 1-2 minutes until golden brown.",
            "Serve immediately with maple syrup, fresh berries, or your favorite toppings."
        ]
    },
    {
        id: 3,
        title: "Healthy Pizza",
        category: "Main Course",
        description: "Nutritious pizza with whole wheat base, fresh vegetables, and light cheese for a guilt-free indulgence.",
        time: "35 min",
        rating: "4.7",
        ratingCount: 156,
        icon: "🍕",
        tags: ["main", "healthy", "vegetarian"],
        servings: "2 people",
        difficulty: "Medium",
        ingredients: [
            { name: "Whole wheat pizza dough", quantity: "1 ball" },
            { name: "Tomato sauce", quantity: "1/2 cup" },
            { name: "Mozzarella cheese (part-skim)", quantity: "1 cup" },
            { name: "Bell peppers, sliced", quantity: "1 cup" },
            { name: "Red onion, sliced", quantity: "1/2 cup" },
            { name: "Cherry tomatoes, halved", quantity: "1 cup" },
            { name: "Fresh spinach", quantity: "2 cups" },
            { name: "Olive oil", quantity: "1 tbsp" },
            { name: "Fresh basil leaves", quantity: "1/4 cup" },
            { name: "Italian seasoning", quantity: "1 tsp" }
        ],
        instructions: [
            "Preheat your oven to 475°F (245°C). If using a pizza stone, place it in the oven while preheating.",
            "Roll out the whole wheat dough on a floured surface to your desired thickness.",
            "Transfer dough to a pizza pan or parchment paper if using a pizza stone.",
            "Brush the dough lightly with olive oil and sprinkle with Italian seasoning.",
            "Spread tomato sauce evenly over the dough, leaving a 1-inch border for the crust.",
            "Sprinkle mozzarella cheese over the sauce, then add bell peppers, onions, and cherry tomatoes.",
            "Add fresh spinach leaves on top of other vegetables.",
            "Bake for 12-15 minutes until crust is golden and cheese is bubbly.",
            "Remove from oven and immediately top with fresh basil leaves. Let cool for 2-3 minutes before slicing."
        ]
    },
    {
        id: 4,
        title: "Easy Lamb Biryani",
        category: "Main Course",
        description: "Aromatic Indian rice dish with tender lamb and exotic spices, layered and slow-cooked to perfection.",
        time: "60 min",
        rating: "4.9",
        ratingCount: 156,
        icon: "🍛",
        tags: ["main", "indian", "meat"],
        servings: "6 people",
        difficulty: "Hard",
        ingredients: [
            { name: "Lamb, cut in pieces", quantity: "750g" },
            { name: "Basmati rice", quantity: "2 cups" },
            { name: "Onions, sliced", quantity: "2 large" },
            { name: "Yogurt", quantity: "1/2 cup" },
            { name: "Ginger-garlic paste", quantity: "2 tbsp" },
            { name: "Biryani masala", quantity: "2 tsp" },
            { name: "Saffron threads", quantity: "1/4 tsp" },
            { name: "Warm milk", quantity: "1/4 cup" },
            { name: "Ghee or oil", quantity: "4 tbsp" },
            { name: "Fresh mint leaves", quantity: "1/2 cup" },
            { name: "Fresh cilantro", quantity: "1/2 cup" },
            { name: "Salt", quantity: "to taste" }
        ],
        instructions: [
            "Soak saffron in warm milk and set aside. Wash and soak basmati rice for 30 minutes.",
            "Marinate lamb pieces with yogurt, ginger-garlic paste, biryani masala, and salt for at least 30 minutes.",
            "Heat ghee in a heavy-bottomed pot. Fry sliced onions until golden brown and crispy. Remove and set aside.",
            "In the same pot, cook marinated lamb over medium heat until tender, about 20-25 minutes.",
            "In a separate large pot, boil water with whole spices (bay leaves, cardamom, cinnamon). Add soaked rice.",
            "Cook rice until 70% done (still firm). Drain and set aside.",
            "Layer the partially cooked rice over the cooked lamb. Sprinkle fried onions, mint, and cilantro.",
            "Drizzle saffron milk over the top. Cover tightly with aluminum foil, then place the lid.",
            "Cook on high heat for 3-4 minutes, then reduce to lowest heat and cook for 45 minutes.",
            "Let it rest for 10 minutes before opening. Gently mix and serve with raita and pickles."
        ]
    },
    {
        id: 5,
        title: "Couscous Salad",
        category: "Salad",
        description: "Fresh Mediterranean salad with fluffy couscous, dried fruits, nuts, and a zesty lemon dressing.",
        time: "15 min",
        rating: "4.5",
        ratingCount: 156,
        icon: "🥗",
        tags: ["salad", "healthy", "vegetarian", "quick"],
        servings: "4 people",
        difficulty: "Easy",
        ingredients: [
            { name: "Couscous", quantity: "1 cup" },
            { name: "Vegetable broth", quantity: "1 cup" },
            { name: "Dried cranberries", quantity: "1/2 cup" },
            { name: "Chopped almonds", quantity: "1/2 cup" },
            { name: "Fresh parsley", quantity: "1/4 cup" },
            { name: "Red bell pepper, diced", quantity: "1" },
            { name: "Cucumber, diced", quantity: "1" },
            { name: "Lemon juice", quantity: "3 tbsp" },
            { name: "Olive oil", quantity: "3 tbsp" },
            { name: "Honey", quantity: "1 tsp" },
            { name: "Salt and pepper", quantity: "to taste" }
        ],
        instructions: [
            "Bring vegetable broth to a boil in a medium saucepan.",
            "Remove from heat and stir in couscous. Cover and let stand for 5 minutes.",
            "Fluff couscous with a fork and let it cool to room temperature.",
            "In a small bowl, whisk together lemon juice, olive oil, honey, salt, and pepper for dressing.",
            "In a large bowl, combine cooled couscous, dried cranberries, chopped almonds, and fresh parsley.",
            "Add diced bell pepper and cucumber to the couscous mixture.",
            "Pour dressing over the salad and toss gently to combine.",
            "Let the salad sit for 10 minutes to allow flavors to meld. Serve chilled or at room temperature."
        ]
    },
    {
        id: 6,
        title: "Plum Clafoutis",
        category: "Dessert",
        description: "Traditional French baked dessert with sweet juicy plums in a custard-like batter, perfect with vanilla ice cream.",
        time: "50 min",
        rating: "4.4",
        ratingCount: 156,
        icon: "🍰",
        tags: ["dessert", "french", "vegetarian"],
        servings: "6 people",
        difficulty: "Medium",
        ingredients: [
            { name: "Fresh plums, pitted and halved", quantity: "500g" },
            { name: "Eggs", quantity: "3 large" },
            { name: "Whole milk", quantity: "1 cup" },
            { name: "Sugar", quantity: "1/2 cup" },
            { name: "All-purpose flour", quantity: "1/2 cup" },
            { name: "Vanilla extract", quantity: "1 tsp" },
            { name: "Salt", quantity: "pinch" },
            { name: "Butter for greasing", quantity: "1 tbsp" },
            { name: "Powdered sugar", quantity: "for dusting" }
        ],
        instructions: [
            "Preheat oven to 375°F (190°C). Butter a 9-inch round baking dish or cast-iron skillet.",
            "Arrange plum halves cut-side down in the prepared baking dish.",
            "In a blender, combine eggs, milk, sugar, flour, vanilla extract, and salt. Blend until smooth.",
            "Alternatively, whisk ingredients in a bowl until well combined and no lumps remain.",
            "Pour the batter over the plums, filling the spaces between the fruit.",
            "Bake for 35-40 minutes until the clafoutis is golden and set in the center.",
            "A knife inserted in the center should come out clean.",
            "Let cool for 10 minutes before serving. Dust with powdered sugar.",
            "Serve warm or at room temperature. Delicious with vanilla ice cream or whipped cream."
        ]
    }
];

// Modal HTML structure creation
function createModalHTML() {
    const modalHTML = `
        <div id="recipeModal" class="modal-overlay">
            <div class="modal-content">
                <button class="modal-close" onclick="closeRecipeModal()">&times;</button>
                <div class="modal-header">
                    <div class="modal-hero-image" id="modalHeroImage">
                        🍽️
                    </div>
                    <div class="modal-title-section">
                        <h2 class="modal-recipe-title" id="modalTitle">Recipe Title</h2>
                        <div class="modal-recipe-meta" id="modalMeta">
                            <div class="modal-meta-item">
                                <span>⏱️</span>
                                <span id="modalTime">0 min</span>
                            </div>
                            <div class="modal-meta-item">
                                <span>⭐</span>
                                <span id="modalRating">0.0</span>
                            </div>
                            <div class="modal-meta-item">
                                <span>🏷️</span>
                                <span id="modalCategory">Category</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="modal-section">
                        <p class="modal-description" id="modalDescription">Recipe description will appear here.</p>
                    </div>

                    <!-- Favorites Section -->
                    <div class="favorites-section" id="favoritesSection">
                        <div class="favorites-header">
                            <h3 class="favorites-title">Save This Recipe</h3>
                        </div>
                        
                        <button class="favorite-btn btn-add-favorite" id="addFavoriteBtn">
                            <span class="favorite-icon">❤️</span>
                            <span>Add to Favorites</span>
                        </button>
                        
                        <button class="favorite-btn btn-remove-favorite" id="removeFavoriteBtn" style="display: none;">
                            <span class="favorite-icon">💔</span>
                            <span>Remove from Favorites</span>
                        </button>
                        
                        <div class="favorite-success" id="favoriteSuccess">
                            <p>✨ Recipe added to your favorites!</p>
                        </div>
                        
                        <div class="favorite-removed" id="favoriteRemoved">
                            <p>🗑️ Recipe removed from your favorites.</p>
                        </div>
                    </div>
                    
                    <div class="modal-section">
                        <h3 class="modal-section-title">Ingredients</h3>
                        <ul class="ingredients-list" id="modalIngredients">
                            <!-- Ingredients will be populated dynamically -->
                        </ul>
                    </div>
                    
                    <div class="modal-section">
                        <h3 class="modal-section-title">Instructions</h3>
                        <ol class="instructions-list" id="modalInstructions">
                            <!-- Instructions will be populated dynamically -->
                        </ol>
                    </div>

                    <!-- Rating Section -->
                    <div class="rating-section" id="ratingSection">
                        <div class="rating-header">
                            <h3 class="rating-title">Rate This Recipe</h3>
                            <div class="current-rating">
                                <span class="rating-stars-display" id="currentRatingStars">★★★★☆</span>
                                <span id="currentRatingText">(4.8 from 156 ratings)</span>
                            </div>
                        </div>
                        
                        <div class="interactive-rating" id="interactiveRating">
                            <p class="rating-prompt">How would you rate this recipe?</p>
                            <div class="star-rating" id="starRating">
                                <span class="star" data-rating="1">★</span>
                                <span class="star" data-rating="2">★</span>
                                <span class="star" data-rating="3">★</span>
                                <span class="star" data-rating="4">★</span>
                                <span class="star" data-rating="5">★</span>
                            </div>
                            <div class="rating-feedback" id="ratingFeedback"></div>
                            
                            <div class="rating-submit-section" id="ratingSubmitSection">
                                <button class="rating-btn btn-submit-rating" id="submitRatingBtn" disabled>
                                    Submit Rating
                                </button>
                                <button class="rating-btn btn-cancel-rating" id="cancelRatingBtn">
                                    Cancel
                                </button>
                            </div>
                        </div>
                        
                        <div class="rating-success" id="ratingSuccess">
                            <p>✨ Thank you! Your rating has been submitted.</p>
                        </div>
                    </div>
                    
                    <div class="modal-tags" id="modalTags">
                        <!-- Tags will be populated dynamically -->
                    </div>
                </div>
            </div>
        </div>
    `;
    return modalHTML;
}

// Initialize modal and event delegation on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add modal HTML to the body
    document.body.insertAdjacentHTML('beforeend', createModalHTML());
    
    // Event delegation for recipe card clicks with smooth effects
    document.addEventListener('click', function(e) {
        const recipeCard = e.target.closest('.recipe-card');
        if (recipeCard) {
            const recipeId = recipeCard.getAttribute('data-recipe-id');
            if (recipeId) {
                // Add subtle click feedback animation
                recipeCard.style.transform = 'scale(0.8)';
                recipeCard.style.opacity = '0.8';
                
                // Open modal with smooth transition after brief delay
                setTimeout(() => {
                    openRecipeModal(parseInt(recipeId));
                    
                    // Reset card appearance
                    recipeCard.style.transform = '';
                    recipeCard.style.opacity = '';
                }, 150);
            }
        }
    });
    
    // Get modal reference for additional event listeners
    const modal = document.getElementById('recipeModal');
    
    // Click outside modal to close functionality
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeRecipeModal();
        }
    });
    
    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeRecipeModal();
        }
    });
    
    // Prevent modal content clicks from closing modal
    const modalContent = modal.querySelector('.modal-content');
    modalContent.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});

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

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Cancels the default behavior of the anchor tag
        const scrollTarget = document.querySelector(this.getAttribute('href'));
        if (scrollTarget) {
            const offsetTop = scrollTarget.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Explore button functionality
exploreBtn.addEventListener('click', () => {
    const recipesSection = document.getElementById('recipes');
    const offsetTop = recipesSection.offsetTop - 70;
    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
});

// Search functionality
function handleSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm) {
        // Filter recipes based on search term
        // TODO: Add search item to query the API
        const filteredRecipes = sampleRecipes.filter(recipe => 
            recipe.title.toLowerCase().includes(searchTerm) ||
            recipe.description.toLowerCase().includes(searchTerm) ||
            recipe.category.toLowerCase().includes(searchTerm) ||
            recipe.tags.some(tag => tag.includes(searchTerm))
        );
        
        // Update recipes display
        displayRecipes(filteredRecipes);
        
        // Scroll to recipes section
        const recipesSection = document.getElementById('recipes');
        const offsetTop = recipesSection.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Update section title to show search results
        const sectionTitle = document.querySelector('#recipes .section-title');
        sectionTitle.textContent = `Search Results for "${searchTerm}"`;
    }
}

searchBtn.addEventListener('click', handleSearch);

// This event listener allows a user to press enter to search (keyboard navigation)
// as opposed to using a pointer event
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// Filter functionality
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active filter button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter recipes
        const filterValue = btn.getAttribute('data-search-filter');
        let filteredRecipes;
        
        if (filterValue === 'all') {
            filteredRecipes = sampleRecipes;
        } else if (filterValue === 'favorites') {
            // Handle favorites filter
            displayFavorites();
            const sectionTitle = document.querySelector('#recipes .section-title');
            sectionTitle.textContent = 'My Favorite Recipes';
            return; // Exit early for favorites
        } else {
            filteredRecipes = sampleRecipes.filter(recipe => {
                switch (filterValue) {
                    case 'vegetarian':
                        return recipe.tags.includes('vegetarian');
                    case 'quick':
                        return recipe.tags.includes('quick');
                    case 'healthy':
                        return recipe.tags.includes('healthy');
                    case 'dessert':
                        return recipe.tags.includes('dessert');
                    default:
                        return true;
                }
            });
        }
        
        // Update recipes display
        displayRecipes(filteredRecipes);
        
        // Update section title
        const sectionTitle = document.querySelector('#recipes .section-title');
        if (filterValue === 'all') {
            sectionTitle.textContent = 'Featured Recipes';
        } else {
            sectionTitle.textContent = `${btn.textContent} Recipes`;
        }
    });
});

// Recipe card creation
function createRecipeCard(recipe) {
    const isFavorite = isFavoriteRecipe(recipe.id);

    return `
        <div class="recipe-card ${isFavorite ? 'is-favorite' : ''}" data-recipe-id="${recipe.id}" style="cursor: pointer;" title="Click to view recipe details">
            <div class="recipe-image">${recipe.icon}</div>
            <div class="recipe-favorite-indicator" title="${isFavorite ? 'This is one of your favorites!' : 'Add to favorites'}">
                ❤️
            </div>
            <div class="recipe-info">
                <div class="recipe-category">${recipe.category}</div>
                <h3 class="recipe-title">${recipe.title}</h3>
                <p class="recipe-description">${recipe.description}</p>
                <div class="recipe-meta">
                    <span class="recipe-time">⏱️ ${recipe.time}</span>
                    <span class="recipe-rating">★ ${recipe.rating}</span>
                </div>
            </div>
        </div>
    `;
}

// Display recipes in grid
function displayRecipes(recipes) {
    recipesGrid.innerHTML = recipes.map(recipe => createRecipeCard(recipe)).join('');
    
    // Add click handlers to recipe cards
    document.querySelectorAll('.recipe-card').forEach(card => {
        card.addEventListener('click', () => {
            const recipeId = card.getAttribute('data-recipe-id');
            openRecipeModal(recipeId);
        });
    });
}

// Load more button functionality
loadMoreBtn.addEventListener('click', () => {
    // In a real application, this would load more recipes from the server
    alert('More recipes would be loaded here! Please sign in to access the full recipe collection.');
});

// Animation on scroll for recipe cards
function animateOnScroll() {
    const cards = document.querySelectorAll('.recipe-card, .feature-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Display initial recipes
    displayRecipes(sampleRecipes);
    
    // Set up scroll animations
    animateOnScroll();
    
    // Add entrance animation to hero elements
    setTimeout(() => { // using setTime out to delay content delivery for UX
        document.querySelector('.hero-content').style.opacity = '1';
        document.querySelector('.hero-content').style.transform = 'translateY(0)';
    }, 100);
    
    setTimeout(() => {
        document.querySelector('.hero-image').style.opacity = '1';
        document.querySelector('.hero-image').style.transform = 'translateY(0)';
    }, 400);
});

// Handle window resize for responsive navigation
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Recipe modal functionality
// Modal functionality with smooth animations and API-ready structure
function openRecipeModal(recipeId) {
    console.log('Opening modal for recipe ID:', recipeId);
    
    // Find the recipe data
    // TODO: Replace with API call later
    // Convert recipeId to number to ensure proper comparison
    const recipe = sampleRecipes.find(r => r.id === parseInt(recipeId));
    if (!recipe) {
        console.error('Recipe not found:', recipeId);
        alert('Recipe not found. Please try again.');
        return;
    }
    
    // Get modal elements
    const modal = document.getElementById('recipeModal');
    const body = document.body;
    
    if (!modal) {
        console.error('Modal element not found');
        return;
    }
    
    // Show loading state briefly (simulates API call delay)
    // TODO: Remove/modify when implementing API call
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.opacity = '0.7';
    
    // Populate modal content first
    populateModalContent(recipe);
    
    // Prevent body scrolling
    body.classList.add('modal-open');
    
    // Show modal with smooth animation
    modal.style.display = 'flex';
    
    // Small delay to ensure display change is processed
    requestAnimationFrame(() => {
        modal.classList.add('show');
        modalContent.style.opacity = '1';
    });
    
    // Focus management for accessibility
    setTimeout(() => {
        const closeButton = modal.querySelector('.modal-close');
        if (closeButton) {
            closeButton.focus();
        }
    }, 350); // Wait for animation to complete
}

function closeRecipeModal() {
    // Clean up rating event listeners when modal closes
    cleanupRatingEventListeners();
    
    const modal = document.getElementById('recipeModal');
    const body = document.body;
    
    if (!modal) {
        console.error('Modal element not found');
        return;
    }
    
    // Start fade-out animation
    modal.classList.remove('show');
    
    // Wait for animation to complete before hiding
    setTimeout(() => {
        modal.style.display = 'none';
        body.classList.remove('modal-open');
        
        // Reset modal content opacity for next opening
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.opacity = '1';
        }
        
        console.log('Modal closed successfully');
    }, 300); // Match the CSS transition duration
}

function populateModalContent(recipe) {
    if (!recipe) {
        console.error('No recipe data provided to populateModalContent');
        return;
    }
    
    try {
        // Update basic recipe information
        document.getElementById('modalTitle').textContent = recipe.title;
        document.getElementById('modalTime').textContent = recipe.time;
        document.getElementById('modalRating').textContent = recipe.rating;
        document.getElementById('modalCategory').textContent = recipe.category;
        document.getElementById('modalDescription').textContent = recipe.description;
        document.getElementById('modalHeroImage').textContent = recipe.icon;
        
        // Rebuild meta information instead of appending
        const modalMeta = document.getElementById('modalMeta');
        let metaHTML = `
            <div class="modal-meta-item">
                <span>⏱️</span>
                <span id="modalTime">${recipe.time}</span>
            </div>
            <div class="modal-meta-item">
                <span>⭐</span>
                <span id="modalRating">${recipe.rating}</span>
            </div>
            <div class="modal-meta-item">
                <span>🏷️</span>
                <span id="modalCategory">${recipe.category}</span>
            </div>
        `;
        
        // Add additional meta information if available
        if (recipe.servings) {
            metaHTML += `
                <div class="modal-meta-item">
                    <span>👥</span>
                    <span>${recipe.servings}</span>
                </div>
            `;
        }
        
        if (recipe.difficulty) {
            const difficultyEmoji = {
                'Easy': '🟢',
                'Medium': '🟡', 
                'Hard': '🔴'
            };
            metaHTML += `
                <div class="modal-meta-item">
                    <span>${difficultyEmoji[recipe.difficulty] || '⚪'}</span>
                    <span>${recipe.difficulty}</span>
                </div>
            `;
        }
        
        // Replace the entire meta section instead of appending
        modalMeta.innerHTML = metaHTML;
        
        // Populate ingredients list with real data
        const ingredientsList = document.getElementById('modalIngredients');
        if (recipe.ingredients && recipe.ingredients.length > 0) {
            const ingredientsHTML = recipe.ingredients.map(ingredient => `
                <li class="ingredient-item">
                    <span class="ingredient-name">${ingredient.name}</span>
                    <span class="ingredient-quantity">${ingredient.quantity}</span>
                </li>
            `).join('');
            ingredientsList.innerHTML = ingredientsHTML;
        } else {
            // Fallback for recipes without detailed ingredients
            ingredientsList.innerHTML = `
                <li class="ingredient-item">
                    <span class="ingredient-name">Detailed ingredients coming soon...</span>
                    <span class="ingredient-quantity">-</span>
                </li>
            `;
        }
        
        // Populate instructions list with real data
        const instructionsList = document.getElementById('modalInstructions');
        if (recipe.instructions && recipe.instructions.length > 0) {
            const instructionsHTML = recipe.instructions.map(instruction => `
                <li class="instruction-step">
                    <div class="instruction-text">${instruction}</div>
                </li>
            `).join('');
            instructionsList.innerHTML = instructionsHTML;
        } else {
            // Fallback for recipes without detailed instructions
            instructionsList.innerHTML = `
                <li class="instruction-step">
                    <div class="instruction-text">Detailed cooking instructions will be available soon. Please check back later for complete step-by-step directions.</div>
                </li>
            `;
        }
        
        // Populate tags with styling
        const tagsContainer = document.getElementById('modalTags');
        if (recipe.tags && recipe.tags.length > 0) {
            const tagsHTML = recipe.tags.map(tag => `
                <span class="modal-tag">#${tag}</span>
            `).join('');
            tagsContainer.innerHTML = tagsHTML;
        } else {
            tagsContainer.innerHTML = '';
        }
        
        console.log('Modal content populated successfully for:', recipe.title);

        // Initialize rating system for this recipe
        initializeRatingSystem(recipe);

        // Initialize favorites system for this recipe
        initializeFavoritesSystem(recipe);
        
    } catch (error) {
        console.error('Error populating modal content:', error);
        // Show error message to user
        document.getElementById('modalDescription').textContent = 'Sorry, there was an error loading the recipe details. Please try again.';
    }
}

// Rating System Functionality
let currentUserRating = 0;
let isRatingSubmitted = false;

// Clean up rating event listeners to prevent accumulation
function cleanupRatingEventListeners() {
    const modal = document.getElementById('recipeModal');
    
    // Remove existing star event listeners if they exist
    if (modal._currentRatingHandlers) {
        modal._currentRatingHandlers.forEach(handlerInfo => {
            handlerInfo.events.forEach(eventInfo => {
                handlerInfo.element.removeEventListener(eventInfo.type, eventInfo.handler);
            });
        });
        modal._currentRatingHandlers = null;
    }
    
    // Clear any lingering rating states
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.classList.remove('hovered', 'selected');
    });
    
    console.log('Rating event listeners cleaned up');
}

// Initialize rating system when modal opens
function initializeRatingSystem(recipe) {
    // Clean up any existing event listeners first
    cleanupRatingEventListeners();
    
    const stars = document.querySelectorAll('.star');
    const ratingFeedback = document.getElementById('ratingFeedback');
    const submitBtn = document.getElementById('submitRatingBtn');
    const cancelBtn = document.getElementById('cancelRatingBtn');
    const submitSection = document.getElementById('ratingSubmitSection');
    const ratingSuccess = document.getElementById('ratingSuccess');
    const interactiveRating = document.getElementById('interactiveRating');
    
    // Reset rating state for THIS specific recipe
    currentUserRating = 0;
    isRatingSubmitted = false;
    ratingSuccess.classList.remove('show');
    interactiveRating.style.display = 'block';
    submitBtn.disabled = true;
    submitSection.classList.remove('show');
    ratingFeedback.classList.remove('show');
    
    // Clear any existing star states
    stars.forEach(star => {
        star.classList.remove('hovered', 'selected');
    });
    
    // Check if user has already rated THIS specific recipe
    // TODO: Change from localStorage and integrate with backend
    const existingRating = localStorage.getItem(`rating_${recipe.id}`);
    console.log(`Checking existing rating for recipe ${recipe.id}:`, existingRating);
    
    if (existingRating) {
        showRatingSubmitted(parseInt(existingRating));
        return;
    }
    
    // Create new event handlers with proper closure for current recipe
    const starEventHandlers = [];
    
    // Add event listeners to stars with proper cleanup tracking
    stars.forEach((star, index) => {
        const starIndex = index;
        
        // Mouse enter handler
        const mouseEnterHandler = () => {
            highlightStars(starIndex + 1);
            showRatingFeedback(starIndex + 1);
        };
        
        // Mouse leave handler  
        const mouseLeaveHandler = () => {
            if (currentUserRating === 0) {
                clearStarHighlight();
                ratingFeedback.classList.remove('show');
            } else {
                highlightStars(currentUserRating);
                showRatingFeedback(currentUserRating);
            }
        };
        
        // Click handler
        const clickHandler = () => {
            currentUserRating = starIndex + 1;
            selectStars(currentUserRating);
            showRatingFeedback(currentUserRating);
            enableSubmitButton();
            console.log(`Selected rating ${currentUserRating} for recipe ${recipe.id}`);
        };
        
        // Add event listeners
        star.addEventListener('mouseenter', mouseEnterHandler);
        star.addEventListener('mouseleave', mouseLeaveHandler);
        star.addEventListener('click', clickHandler);
        
        // Store handlers for cleanup
        starEventHandlers.push({
            element: star,
            events: [
                { type: 'mouseenter', handler: mouseEnterHandler },
                { type: 'mouseleave', handler: mouseLeaveHandler },
                { type: 'click', handler: clickHandler }
            ]
        });
    });
    
    // Store event handlers for cleanup (attach to the modal for current recipe)
    const modal = document.getElementById('recipeModal');
    modal._currentRatingHandlers = starEventHandlers;
    
    // Submit button event - create new handler each time
    const submitHandler = () => {
        if (currentUserRating > 0) {
            console.log(`Submitting rating ${currentUserRating} for recipe ${recipe.id}`);
            submitRating(recipe.id, currentUserRating);
        }
    };
    
    // Cancel button event - create new handler each time
    const cancelHandler = () => {
        resetRating();
    };
    
    // Remove existing button event listeners if any
    const newSubmitBtn = submitBtn.cloneNode(true);
    const newCancelBtn = cancelBtn.cloneNode(true);
    submitBtn.parentNode.replaceChild(newSubmitBtn, submitBtn);
    cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);
    
    // Add new event listeners to the new button elements
    newSubmitBtn.addEventListener('click', submitHandler);
    newCancelBtn.addEventListener('click', cancelHandler);
    
    console.log(`Rating system initialized for recipe: ${recipe.title} (ID: ${recipe.id})`);
}

// Highlight stars up to the given rating
function highlightStars(rating) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('hovered');
        } else {
            star.classList.remove('hovered');
        }
        star.classList.remove('selected');
    });
}

// Select stars (when clicked)
function selectStars(rating) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        star.classList.remove('hovered');
        if (index < rating) {
            star.classList.add('selected');
        } else {
            star.classList.remove('selected');
        }
    });
}

// Clear star highlight
function clearStarHighlight() {
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.classList.remove('hovered', 'selected');
    });
}

// Show rating feedback text
function showRatingFeedback(rating) {
    const ratingFeedback = document.getElementById('ratingFeedback');
    const feedbackTexts = {
        1: "Poor - Hmm...",
        2: "Fair - It's okay",
        3: "Good - I liked it",
        4: "Very Good - Really enjoyed it",
        5: "Excellent - Outstanding recipe!"
    };
    
    ratingFeedback.textContent = feedbackTexts[rating];
    ratingFeedback.className = `rating-feedback rating-text rating-${rating} show`;
}

// Enable submit button
function enableSubmitButton() {
    const submitBtn = document.getElementById('submitRatingBtn');
    const submitSection = document.getElementById('ratingSubmitSection');
    
    submitBtn.disabled = false;
    submitSection.classList.add('show');
}

// Reset rating to initial state
function resetRating() {
    currentUserRating = 0;
    clearStarHighlight();
    const ratingFeedback = document.getElementById('ratingFeedback');
    const submitSection = document.getElementById('ratingSubmitSection');
    
    ratingFeedback.classList.remove('show');
    submitSection.classList.remove('show');
    
    document.getElementById('submitRatingBtn').disabled = true;
}

// Submit rating (save to localStorage for now)
// TODO: Integrate with backend
function submitRating(recipeId, rating) {
    console.log(`Attempting to submit rating ${rating} for recipe ${recipeId}`);
    
    try {
        // Save to localStorage with recipe-specific key
        const ratingKey = `rating_${recipeId}`;
        localStorage.setItem(ratingKey, rating.toString());
        
        // Verify the save worked
        const savedRating = localStorage.getItem(ratingKey);
        console.log(`Rating saved successfully. Key: ${ratingKey}, Value: ${savedRating}`);
        
        // Update recipe rating in memory
        const recipe = sampleRecipes.find(r => r.id === recipeId);
        if (recipe) {
            updateRecipeRating(recipe, rating);
            console.log(`Updated recipe ${recipe.title} with new rating`);
        } else {
            console.error(`Recipe with ID ${recipeId} not found in sampleRecipes`);
        }
        
        // Show success message
        showRatingSubmitted(rating);
        
        // Update recipe card in the background
        updateRecipeCardRating(recipeId);
        
        console.log(`Rating submission completed for recipe ${recipeId}`);
        
    } catch (error) {
        console.error('Error submitting rating:', error);
        alert('Sorry, there was an error saving your rating. Please try again.');
    }
}

// Show rating submitted state
function showRatingSubmitted(rating) {
    const interactiveRating = document.getElementById('interactiveRating');
    const ratingSuccess = document.getElementById('ratingSuccess');
    
    interactiveRating.style.display = 'none';
    ratingSuccess.innerHTML = `
        <p>✨ You rated this recipe ${rating} star${rating !== 1 ? 's' : ''}!</p>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; opacity: 0.8;">
            Thank you for your feedback!
        </p>
    `;
    ratingSuccess.classList.add('show');
    
    isRatingSubmitted = true;
}

// Update recipe rating calculation
// TODO: Currently simplified for placeholder value but to be
// amended in FULL with backend integration
function updateRecipeRating(recipe, newRating) {
    // Simple rating update
    const currentRating = parseFloat(recipe.rating);
    const ratingCount = parseInt(localStorage.getItem(`rating_count_${recipe.id}`) || '156');
    
    // Calculate new average (simplified)
    const newAverage = ((currentRating * ratingCount) + newRating) / (ratingCount + 1);
    recipe.rating = newAverage.toFixed(1);
    
    // Update count
    localStorage.setItem(`rating_count_${recipe.id}`, (ratingCount + 1).toString());
    
    // Update current rating display
    updateCurrentRatingDisplay(recipe);
}

// Update current rating display in modal
function updateCurrentRatingDisplay(recipe) {
    const ratingCount = parseInt(localStorage.getItem(`rating_count_${recipe.id}`) || '156');
    const starsDisplay = document.getElementById('currentRatingStars');
    const ratingText = document.getElementById('currentRatingText');
    
    // Generate star display
    const rating = parseFloat(recipe.rating);
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    let starsHTML = '★'.repeat(fullStars);
    if (hasHalfStar) starsHTML += '☆';
    starsHTML += '☆'.repeat(5 - fullStars - (hasHalfStar ? 1 : 0));
    
    starsDisplay.textContent = starsHTML;
    ratingText.textContent = `(${recipe.rating} from ${ratingCount + 1} ratings)`;
}

// Update recipe card rating in the grid
function updateRecipeCardRating(recipeId) {
    const recipe = sampleRecipes.find(r => r.id === recipeId);
    if (recipe) {
        // Find the recipe card in the DOM and update its rating
        const recipeCard = document.querySelector(`[data-recipe-id="${recipeId}"]`);
        if (recipeCard) {
            const ratingElement = recipeCard.querySelector('.recipe-rating');
            if (ratingElement) {
                ratingElement.textContent = `★ ${recipe.rating}`;
            }
        }
    }
}

// Favorites System Functionality
// TODO: Replace localStorage with backend integration
let userFavorites = JSON.parse(localStorage.getItem('userFavorites')) || [];

// Check if a recipe is in favorites
function isFavoriteRecipe(recipeId) {
    return userFavorites.includes(parseInt(recipeId));
}

// Add recipe to favorites
function addToFavorites(recipeId) {
    const id = parseInt(recipeId);
    if (!userFavorites.includes(id)) {
        userFavorites.push(id);
        saveFavoritesToStorage();
        updateFavoritesDisplay();
        showFavoriteSuccess('added');
        updateRecipeCardFavoriteStatus(id, true);
        console.log(`Recipe ${recipeId} added to favorites`);
        return true;
    }
    return false;
}

// Remove recipe from favorites
function removeFromFavorites(recipeId) {
    const id = parseInt(recipeId);
    const index = userFavorites.indexOf(id);
    if (index > -1) {
        userFavorites.splice(index, 1);
        saveFavoritesToStorage();
        updateFavoritesDisplay();
        showFavoriteSuccess('removed');
        updateRecipeCardFavoriteStatus(id, false);
        console.log(`Recipe ${recipeId} removed from favorites`);
        return true;
    }
    return false;
}

// Save favorites to localStorage
// TODO: Replace localStorage with backend integration
function saveFavoritesToStorage() {
    localStorage.setItem('userFavorites', JSON.stringify(userFavorites));
}

// Initialize favorites system when modal opens
function initializeFavoritesSystem(recipe) {
    const addBtn = document.getElementById('addFavoriteBtn');
    const removeBtn = document.getElementById('removeFavoriteBtn');
    const favoriteSuccess = document.getElementById('favoriteSuccess');
    const favoriteRemoved = document.getElementById('favoriteRemoved');
    
    // Reset UI state
    favoriteSuccess.classList.remove('show');
    favoriteRemoved.classList.remove('show');
    
    // Check if recipe is already in favorites
    const isFavorite = isFavoriteRecipe(recipe.id);
    
    if (isFavorite) {
        addBtn.style.display = 'none';
        removeBtn.style.display = 'flex';
    } else {
        addBtn.style.display = 'flex';
        removeBtn.style.display = 'none';
    }
    
    // Remove existing event listeners by cloning buttons
    const newAddBtn = addBtn.cloneNode(true);
    const newRemoveBtn = removeBtn.cloneNode(true);
    addBtn.parentNode.replaceChild(newAddBtn, addBtn);
    removeBtn.parentNode.replaceChild(newRemoveBtn, removeBtn);
    
    // Add event listeners
    newAddBtn.addEventListener('click', () => {
        if (addToFavorites(recipe.id)) {
            newAddBtn.style.display = 'none';
            newRemoveBtn.style.display = 'flex';
        }
    });
    
    newRemoveBtn.addEventListener('click', () => {
        if (removeFromFavorites(recipe.id)) {
            newRemoveBtn.style.display = 'none';
            newAddBtn.style.display = 'flex';
        }
    });
    
    console.log(`Favorites system initialized for recipe: ${recipe.title} (Favorite: ${isFavorite})`);
}

// Show favorite success/removed message
function showFavoriteSuccess(action) {
    const favoriteSuccess = document.getElementById('favoriteSuccess');
    const favoriteRemoved = document.getElementById('favoriteRemoved');
    
    // Hide both first
    favoriteSuccess.classList.remove('show');
    favoriteRemoved.classList.remove('show');
    
    if (action === 'added') {
        setTimeout(() => {
            favoriteSuccess.classList.add('show');
            setTimeout(() => favoriteSuccess.classList.remove('show'), 3000);
        }, 100);
    } else if (action === 'removed') {
        setTimeout(() => {
            favoriteRemoved.classList.add('show');
            setTimeout(() => favoriteRemoved.classList.remove('show'), 3000);
        }, 100);
    }
}

// Update favorites display throughout the app
function updateFavoritesDisplay() {
    updateFavoritesCount();
    updateAllRecipeCards();
}

// Update favorites count in filter button
function updateFavoritesCount() {
    const favoritesCount = document.getElementById('favoritesCount');
    const count = userFavorites.length;
    
    if (favoritesCount) {
        favoritesCount.textContent = count;
        if (count > 0) {
            favoritesCount.classList.add('show');
        } else {
            favoritesCount.classList.remove('show');
        }
    }
}

// Update recipe card favorite status
function updateRecipeCardFavoriteStatus(recipeId, isFavorite) {
    const recipeCard = document.querySelector(`[data-recipe-id="${recipeId}"]`);
    if (recipeCard) {
        if (isFavorite) {
            recipeCard.classList.add('is-favorite');
        } else {
            recipeCard.classList.remove('is-favorite');
        }
    }
}

// Update all recipe cards favorite status
function updateAllRecipeCards() {
    const recipeCards = document.querySelectorAll('.recipe-card');
    recipeCards.forEach(card => {
        const recipeId = parseInt(card.getAttribute('data-recipe-id'));
        const isFavorite = isFavoriteRecipe(recipeId);
        updateRecipeCardFavoriteStatus(recipeId, isFavorite);
    });
}

// Get user's favorite recipes
function getFavoriteRecipes() {
    return sampleRecipes.filter(recipe => userFavorites.includes(recipe.id));
}

// Display favorites (empty or recipes)
function displayFavorites() {
    const favoriteRecipes = getFavoriteRecipes();
    
    if (favoriteRecipes.length === 0) {
        recipesGrid.innerHTML = `
            <div class="empty-favorites">
                <div class="empty-favorites-icon">💔</div>
                <h3 class="empty-favorites-title">No Favorites Yet</h3>
                <p class="empty-favorites-description">
                    Start exploring recipes and click the heart icon to save your favorites here!
                </p>
                <button class="btn btn-primary" onclick="showAllRecipes()">
                    Explore Recipes
                </button>
            </div>
        `;
    } else {
        displayRecipes(favoriteRecipes);
    }
}

// Show all recipes (helper function)
function showAllRecipes() {
    displayRecipes(sampleRecipes);
    
    // Update section title
    const sectionTitle = document.querySelector('#recipes .section-title');
    sectionTitle.textContent = 'Featured Recipes';
    
    // Update active filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelector('[data-search-filter="all"]').classList.add('active');
}

// Initialize favorites system on page load
document.addEventListener('DOMContentLoaded', function() {
    // Load favorites from localStorage
    // TODO: Replace localStorage with backend integration
    userFavorites = JSON.parse(localStorage.getItem('userFavorites')) || [];
    
    // Update initial display
    updateFavoritesDisplay();
    
    console.log('Favorites system initialized with', userFavorites.length, 'favorites');
});
