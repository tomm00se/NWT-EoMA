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

// Sample recipe data matching the assignment requirements
// TODO: Implement actual PHP API
const sampleRecipes = [
    {
        id: 1,
        title: "Spaghetti Bolognese",
        category: "Main Course",
        description: "Classic Italian pasta dish with rich meat sauce and fresh herbs.",
        time: "45 min",
        rating: "4.8",
        icon: "🍝",
        tags: ["main", "italian", "meat"]
    },
    {
        id: 2,
        title: "Vegan Pancakes",
        category: "Breakfast",
        description: "Fluffy American-style pancakes made entirely plant-based.",
        time: "20 min",
        rating: "4.6",
        icon: "🥞",
        tags: ["breakfast", "vegan", "vegetarian", "quick"]
    },
    {
        id: 3,
        title: "Healthy Pizza",
        category: "Main Course",
        description: "Nutritious pizza with whole wheat base and fresh vegetables.",
        time: "35 min",
        rating: "4.7",
        icon: "🍕",
        tags: ["main", "healthy", "vegetarian"]
    },
    {
        id: 4,
        title: "Easy Lamb Biryani",
        category: "Main Course",
        description: "Aromatic Indian rice dish with tender lamb and exotic spices.",
        time: "60 min",
        rating: "4.9",
        icon: "🍛",
        tags: ["main", "indian", "meat"]
    },
    {
        id: 5,
        title: "Couscous Salad",
        category: "Salad",
        description: "Fresh Mediterranean salad with dried fruits and nuts.",
        time: "15 min",
        rating: "4.5",
        icon: "🥗",
        tags: ["salad", "healthy", "vegetarian", "quick"]
    },
    {
        id: 6,
        title: "Plum Clafoutis",
        category: "Dessert",
        description: "Traditional French baked dessert with sweet juicy plums.",
        time: "50 min",
        rating: "4.4",
        icon: "🍰",
        tags: ["dessert", "french", "vegetarian"]
    }
];

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
        const filterValue = btn.getAttribute('data-filter');
        let filteredRecipes;
        
        if (filterValue === 'all') {
            filteredRecipes = sampleRecipes;
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
    return `
        <div class="recipe-card" data-recipe-id="${recipe.id}">
            <div class="recipe-image">${recipe.icon}</div>
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
            showRecipeModal(recipeId);
        });
    });
}

// Recipe modal functionality (placeholder for future development)
function showRecipeModal(recipeId) {
    const recipe = sampleRecipes.find(r => r.id == recipeId);
    if (recipe) {
        // For now, show an alert. In the full application, this would open a detailed recipe modal
        alert(`Recipe Details:\n\nTitle: ${recipe.title}\nCategory: ${recipe.category}\nTime: ${recipe.time}\nRating: ${recipe.rating}\n\nDescription: ${recipe.description}\n\nNote: Full recipe details will be available after signing in!`);
    }
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
