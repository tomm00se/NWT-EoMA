const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const exploreBtn = document.getElementById("exploreBtn");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const recipesGrid = document.getElementById("recipesGrid");
const filterBtns = document.querySelectorAll(".filter-btn");

// modal stuff
const signOutModal = document.getElementById("signOutModal");
const closeModal = document.getElementById("closeModal");
const cancelSignOut = document.getElementById("cancelSignOut");
const confirmSignOut = document.getElementById("confirmSignOut");

function openModal() {
  signOutModal.classList.add("active");
  document.body.style.overflow = "hidden"; // Prevent background scrolling
}

function closeModalFunc() {
  signOutModal.classList.remove("active");
  document.body.style.overflow = "";
}

closeModal.addEventListener("click", closeModalFunc);
cancelSignOut.addEventListener("click", closeModalFunc);

signOutModal.addEventListener("click", (e) => {
  if (e.target === signOutModal) {
    closeModalFunc();
  }
});

// esc key to close
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && signOutModal.classList.contains("active")) {
    closeModalFunc();
  }
});

confirmSignOut.addEventListener("click", async () => {
  closeModalFunc();
  await handleLogout();
});

async function updateNavigationForUser() {
  const user = JSON.parse(localStorage.getItem("user"));
  const signInLink = document.querySelector(".signin-link");

  if (user && user.name) {
    signInLink.textContent = `Hello, ${user.name}`;
    signInLink.href = "#";
    signInLink.classList.add("user-greeting");
    signInLink.addEventListener("click", openModal);

    // Load user's favorites
    await loadUserFavorites();
  } else {
    signInLink.textContent = "Sign In";
    signInLink.href = "signin.html";
    signInLink.classList.remove("user-greeting");
    signInLink.removeEventListener("click", openModal);

    // Clear favorites when user logs out
    localStorage.removeItem("favorites");
  }
}

async function handleLogout() {
  try {
    const response = await fetch(`${baseUrl}/users/logout/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      localStorage.removeItem("user");
      localStorage.removeItem("favorites");
      await updateNavigationForUser();

      // refresh recipe display to update heart icons
      displayRecipes(allRecipes);
    } else {
      console.error("Logout failed");
    }
  } catch (error) {
    console.error("Logout error:", error);
    // clear anyway if server fails
    localStorage.removeItem("user");
    localStorage.removeItem("favorites");
    await updateNavigationForUser();
    displayRecipes(allRecipes);
  }
}

// the base url for all PHP API requests (Make sure your web server is pointing to this!)
const baseUrl = `http://localhost/backend/public/api`;
let allRecipes = [];

const fetchRecipe = async (id) => {
  const path = `${baseUrl}/recipes/getFull?id=${id}`;
  const resp = await fetch(path);
  const data = await resp.json();

  return data;
};

const fetchAllRecipes = async () => {
  const path = `${baseUrl}/recipes/getAll`;

  const resp = await fetch(path);
  const data = await resp.json();

  allRecipes = await Promise.all(
    data.map((recipe) => fetchRecipe(recipe.recipe_id))
  );

  displayRecipes(allRecipes);

  console.log(allRecipes);
};

// navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// mobile navigation toggle
navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// close mobile menu when clicking on nav links
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const scrollTarget = document.querySelector(this.getAttribute("href"));
    if (scrollTarget) {
      const offsetTop = scrollTarget.offsetTop - 70; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// explore button functionality
exploreBtn.addEventListener("click", () => {
  const recipesSection = document.getElementById("recipes");
  const offsetTop = recipesSection.offsetTop - 70;
  window.scrollTo({
    top: offsetTop,
    behavior: "smooth",
  });
});

// search functionality
function handleSearch() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const sectionTitle = document.querySelector("#recipes .section-title");

  if (searchTerm) {
    const filtered = allRecipes.filter(
      (recipe) =>
        recipe.title?.toLowerCase().includes(searchTerm) ||
        recipe.description?.toLowerCase().includes(searchTerm) ||
        (recipe.categories &&
          recipe.categories.some((category) =>
            category.name?.toLowerCase().includes(searchTerm)
          )) ||
        (recipe.ingredients &&
          recipe.ingredients.some((ingredient) =>
            ingredient.name?.toLowerCase().includes(searchTerm)
          ))
    );

    displayRecipes(filtered);
    sectionTitle.textContent = `Search Results for "${searchTerm}" (${filtered.length} found)`;
  } else {
    displayRecipes(allRecipes);
    sectionTitle.textContent = "Featured Recipes";
    filterBtns.forEach((b) => b.classList.remove("active"));
    document.querySelector('[data-filter="all"]').classList.add("active");
  }

  const recipesSection = document.getElementById("recipes");
  const offsetTop = recipesSection.offsetTop - 70;
  window.scrollTo({
    top: offsetTop,
    behavior: "smooth",
  });
}

searchBtn.addEventListener("click", handleSearch);

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleSearch();
  }
});

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filterValue = btn.getAttribute("data-filter");
    let filtered;

    if (filterValue === "all") {
      filtered = allRecipes;
    } else {
      filtered = allRecipes.filter((recipe) => {
        if (!recipe.categories || !Array.isArray(recipe.categories)) {
          return false;
        }

        return recipe.categories.some((category) => {
          const categoryName = category.name?.toLowerCase();
          if (!categoryName) return false;

          switch (filterValue) {
            case "vegetarian":
              return categoryName === "vegetarian";
            case "vegan":
              return categoryName === "vegan";
            case "main":
              return categoryName === "main";
            case "dessert":
              return categoryName === "dessert";
            case "breakfast":
              return categoryName === "breakfast";
            default:
              return false;
          }
        });
      });
    }

    displayRecipes(filtered);

    const sectionTitle = document.querySelector("#recipes .section-title");
    if (filterValue === "all") {
      sectionTitle.textContent = "Featured Recipes";
    } else {
      sectionTitle.textContent = `${btn.textContent} Recipes`;
    }
  });
});

// recipe card creation
function createRecipeCard(recipe) {
  const isFavorited = checkIfFavorited(recipe.recipe_id);
  const heartClass = isFavorited ? "heart-icon favorited" : "heart-icon";

  return `
        <div class="recipe-card" data-recipe-id="${recipe.recipe_id}">
            <div class="recipe-image">
                ${recipe.icon}
                <div class="${heartClass}" data-recipe-id="${
    recipe.recipe_id
  }" onclick="event.stopPropagation(); toggleFavorite(${recipe.recipe_id})">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                </div>
            </div>
            <div class="recipe-info">
            ${
              recipe.categories.length > 0
                ? `<div class="recipe-category">${recipe.categories[0]?.name}</div>`
                : ""
            }
                <h3 class="recipe-title">${recipe.title}</h3>
                <p class="recipe-description">${recipe.description}</p>
                <div class="recipe-meta">
                    <span class="recipe-time">⏱️ ${
                      recipe.total_time
                    } minutes</span>
                    <span class="recipe-rating">★ ${recipe.rating}</span>
                </div>
            </div>
        </div>
    `;
}

// Check if a recipe is favorited by the current user
function checkIfFavorited(recipeId) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return false;

  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  return favorites.includes(recipeId);
}

// Toggle favorite status for a recipe
async function toggleFavorite(recipeId) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    alert("Please sign in to favorite recipes!");
    return;
  }

  const heartIcon = document.querySelector(
    `.heart-icon[data-recipe-id="${recipeId}"]`
  );
  const isFavorited = heartIcon.classList.contains("favorited");

  try {
    if (isFavorited) {
      const response = await fetch(`${baseUrl}/favourites/remove/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipe_id: recipeId }),
      });

      if (response.ok) {
        heartIcon.classList.remove("favorited");
        removeFromLocalFavorites(recipeId);
        console.log("Recipe removed from favorites");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "Failed to remove from favorites"}`);
      }
    } else {
      // Add to favorites
      const response = await fetch(`${baseUrl}/favourites/add/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipe_id: recipeId }),
      });

      if (response.ok) {
        heartIcon.classList.add("favorited");
        addToLocalFavorites(recipeId);
        console.log("Recipe added to favorites");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "Failed to add to favorites"}`);
      }
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
    alert("An error occurred while updating favorites. Please try again.");
  }
}

// Add recipe to local favorites storage
function addToLocalFavorites(recipeId) {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  if (!favorites.includes(recipeId)) {
    favorites.push(recipeId);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
}

// Remove recipe from local favorites storage
function removeFromLocalFavorites(recipeId) {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  const updatedFavorites = favorites.filter((id) => id !== recipeId);
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
}

// Load user's favorites from server
async function loadUserFavorites() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return;

  try {
    const response = await fetch(`${baseUrl}/favourites/getMy/`);
    if (response.ok) {
      const favorites = await response.json();
      const favoriteIds = favorites.map((fav) => fav.recipe_id);
      localStorage.setItem("favorites", JSON.stringify(favoriteIds));
    }
  } catch (error) {
    console.error("Error loading favorites:", error);
  }
}

// Display recipes in grid
function displayRecipes(recipes) {
  recipesGrid.innerHTML = recipes
    .map((recipe) => createRecipeCard(recipe))
    .join("");

  document.querySelectorAll(".recipe-card").forEach((card) => {
    card.addEventListener("click", () => {
      const recipeId = card.getAttribute("data-recipe-id");
      showRecipeModal(recipeId);
    });
  });

  updateHeartIcons();
}

function updateHeartIcons() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return;

  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

  document.querySelectorAll(".heart-icon").forEach((heartIcon) => {
    const recipeId = parseInt(heartIcon.getAttribute("data-recipe-id"));
    if (favorites.includes(recipeId)) {
      heartIcon.classList.add("favorited");
    } else {
      heartIcon.classList.remove("favorited");
    }
  });
}

function showRecipeModal(recipeId) {
  const recipe = allRecipes.find((r) => r.recipe_id == recipeId);
  if (recipe) {
    // TODO: replace with proper modal
    alert(
      `Recipe Details:\n\nTitle: ${recipe.title}\nCategory: ${
        recipe.categories[0]?.name || "N/A"
      }\nTime: ${recipe.total_time}\nRating: ${
        recipe.rating || "N/A"
      }\n\nDescription: ${
        recipe.description
      }\n\nNote: Full recipe details will be available after signing in!`
    );
  }
}

loadMoreBtn.addEventListener("click", () => {
  // TODO: implement proper pagination
  alert(
    "More recipes would be loaded here! Please sign in to access the full recipe collection."
  );
});

// animation on scroll for recipe cards
function animateOnScroll() {
  const cards = document.querySelectorAll(".recipe-card, .feature-card");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });
}

// initialize the page
document.addEventListener("DOMContentLoaded", async () => {
  updateNavigationForUser();
  await loadUserFavorites();
  fetchAllRecipes();
  animateOnScroll();

  // animate hero
  setTimeout(() => {
    document.querySelector(".hero-content").style.opacity = "1";
    document.querySelector(".hero-content").style.transform = "translateY(0)";
  }, 100);

  setTimeout(() => {
    document.querySelector(".hero-image").style.opacity = "1";
    document.querySelector(".hero-image").style.transform = "translateY(0)";
  }, 400);
});

// close mobile menu on resize
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
  }
});
