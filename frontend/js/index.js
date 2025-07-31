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

// recipe modal is created dynamically when needed

function openModal() {
  signOutModal.classList.add("active");
  document.body.style.overflow = "hidden"; // no scroll when modal open
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

// esc key closes sign out modal
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
    signInLink.textContent = `Hello, ${user.name}!`;
    signInLink.href = "#";
    signInLink.classList.add("user-greeting");
    signInLink.addEventListener("click", openModal);

    // load favorites
    await loadUserFavorites();
    // sync ratings if recipes are already loaded
    if (allRecipes.length > 0) {
      await syncUserRatingsWithServer();
      // refresh display to show updated ratings
      const currentRecipes =
        filteredRecipes.length > 0 ? filteredRecipes : allRecipes;
      displayRecipes(currentRecipes, false);
    }
  } else {
    signInLink.textContent = "Sign In";
    signInLink.href = "signin.html";
    signInLink.classList.remove("user-greeting");
    signInLink.removeEventListener("click", openModal);

    // clear favorites on logout
    localStorage.removeItem("favorites");
    // clear user ratings
    userRatings = {};
    localStorage.removeItem("userRatings");
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
      // Clear all local data
      localStorage.removeItem("user");
      localStorage.removeItem("favorites");
      localStorage.removeItem("userRatings");
      userRatings = {};

      // Update UI
      await updateNavigationForUser();
      displayRecipes(
        filteredRecipes.length > 0 ? filteredRecipes : allRecipes,
        false
      );

      // Show success message
      alert("Successfully logged out!");
    } else {
      const errorData = await response.json();
      alert(`Logout failed: ${errorData.message || "Unknown error"}`);
    }
  } catch (error) {
    // Clear local data even if server fails
    localStorage.removeItem("user");
    localStorage.removeItem("favorites");
    localStorage.removeItem("userRatings");
    userRatings = {};

    await updateNavigationForUser();
    displayRecipes(
      filteredRecipes.length > 0 ? filteredRecipes : allRecipes,
      false
    );

    alert("Logged out locally (server connection failed)");
  }
}
// the base url for all PHP API requests (Make sure your web server is pointing to this!)
const baseUrl = `http://localhost/backend/public/api`;

// pagination settings
const RECIPES_PER_PAGE = 6;

let allRecipes = [];
let currentlyDisplayed = 0;
let filteredRecipes = [];
let userRatings = {}; // stores {recipeId: userRating}

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

  // sync user ratings with server after recipes are loaded
  await syncUserRatingsWithServer();

  displayRecipes(allRecipes, false); // show first page
};

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

// close mobile menu on nav link click
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const scrollTarget = document.querySelector(this.getAttribute("href"));
    if (scrollTarget) {
      const offsetTop = scrollTarget.offsetTop - 70; // fixed navbar offset
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// explore button scrolls to recipes
exploreBtn.addEventListener("click", () => {
  const recipesSection = document.getElementById("recipes");
  const offsetTop = recipesSection.offsetTop - 70;
  window.scrollTo({
    top: offsetTop,
    behavior: "smooth",
  });
});

// search recipes
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

    displayRecipes(filtered, false); // reset pagination for new search
    sectionTitle.textContent = `Search Results for "${searchTerm}" (${filtered.length} found)`;
  } else {
    displayRecipes(allRecipes, false);
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

    displayRecipes(filtered, false); // reset pagination for new filter

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
  const userRating = getUserRating(recipe.recipe_id);

  // Parse the average rating from the recipe data
  let averageRating = 0;
  if (
    recipe.rating &&
    recipe.rating !== "No rating" &&
    recipe.rating !== "Not rated"
  ) {
    averageRating = parseFloat(recipe.rating);
    if (isNaN(averageRating)) {
      averageRating = 0;
    }
  }

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
                    <div class="recipe-rating-container" onclick="event.stopPropagation();">
                        ${createStarRating(
                          recipe.recipe_id,
                          averageRating,
                          userRating,
                          true,
                          false
                        )}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// recipe modal creation
function createRecipeModal(recipe) {
  const ingredientsHTML =
    recipe.ingredients?.length > 0
      ? recipe.ingredients
          .map(
            (ingredient) =>
              `<li>${ingredient.quantity || ""} ${ingredient.unit || ""} ${
                ingredient.name
              }`.trim() + "</li>"
          )
          .join("")
      : "<li>No ingredients listed.</li>";

  const instructionsHTML =
    recipe.steps?.length > 0
      ? recipe.steps
          .map((step, index) => {
            let instructionText = "";
            if (typeof step === "string") {
              instructionText = step;
            } else if (step && typeof step === "object") {
              instructionText = step.instructions || JSON.stringify(step);
            } else {
              instructionText = `Step ${index + 1}`;
            }

            return `<li>${instructionText}</li>`;
          })
          .filter((item, index, array) => array.indexOf(item) === index) // remove duplicates
          .join("")
      : "<li>No instructions available.</li>";

  const userRating = getUserRating(recipe.recipe_id);

  // Parse the average rating from the recipe data
  let averageRating = 0;
  if (
    recipe.rating &&
    recipe.rating !== "No rating" &&
    recipe.rating !== "Not rated"
  ) {
    averageRating = parseFloat(recipe.rating);
    if (isNaN(averageRating)) {
      averageRating = 0;
    }
  }

  return `
    <div class="modal-overlay" id="recipeModal">
      <div class="modal-content recipe-modal">
        <div class="modal-header">
          <div class="modal-title">${recipe.title}</div>
          <button class="modal-close" id="closeRecipeModal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="recipe-modal-content">
            <div class="recipe-header">
              <div class="recipe-icon">${recipe.icon || "🍽️"}</div>
              <div class="recipe-basic-info">
                <h3 class="recipe-modal-title">${recipe.title}</h3>
                <div class="recipe-modal-meta">
                  <span class="recipe-modal-category">${
                    recipe.categories?.[0]?.name || "Recipe"
                  }</span>
                  <span class="recipe-modal-time">⏱️ ${
                    recipe.total_time
                  } minutes</span>
                </div>
              </div>
            </div>
            
            <div class="recipe-rating-section">
              <h4 class="section-heading">Rating</h4>
              <div class="modal-rating-container">
                ${createStarRating(
                  recipe.recipe_id,
                  averageRating,
                  userRating,
                  true,
                  false
                )}
              </div>
            </div>

            <div class="recipe-description-section">
              <p class="recipe-modal-description">${
                recipe.description || "No description available."
              }</p>
            </div>

            <div class="recipe-details-grid">
              <div class="ingredients-section">
                <h4 class="section-heading">Ingredients</h4>
                <ul class="ingredients-list">
                  ${ingredientsHTML}
                </ul>
              </div>

              <div class="instructions-section">
                <h4 class="section-heading">Instructions</h4>
                <ol class="instructions-list">
                  ${instructionsHTML}
                </ol>
              </div>
            </div>

            <div class="recipe-additional-info">
              <div class="nutrition-info">
                <!-- Future nutrition info can go here -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// check if recipe is favorited
function checkIfFavorited(recipeId) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return false;

  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  return favorites.includes(recipeId);
}

// toggle recipe favorite
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
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "Failed to remove from favorites"}`);
      }
    } else {
      // add to favorites
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

// add to local favorites
function addToLocalFavorites(recipeId) {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  if (!favorites.includes(recipeId)) {
    favorites.push(recipeId);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
}

// remove from local favorites
function removeFromLocalFavorites(recipeId) {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  const updatedFavorites = favorites.filter((id) => id !== recipeId);
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
}

// load favorites from server
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

// load ratings from localStorage
function loadStoredRatings() {
  if (Object.keys(userRatings).length > 0) return;

  const storedRatings = localStorage.getItem("userRatings");
  if (storedRatings) {
    try {
      userRatings = JSON.parse(storedRatings);
    } catch (error) {
      console.error("Error parsing stored ratings:", error);
      userRatings = {};
    }
  } else {
    userRatings = {};
  }
}

// load user ratings from server
async function syncUserRatingsWithServer() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !allRecipes.length) return;

  try {
    const updatedRatings = {};

    for (const recipe of allRecipes) {
      const ratingData = await fetchRecipeRating(recipe.recipe_id);
      if (ratingData && ratingData.ratings) {
        const userRating = ratingData.ratings.find(
          (rating) =>
            rating.user_id == user.user_id ||
            rating.user_id == String(user.user_id)
        );

        if (userRating) {
          updatedRatings[recipe.recipe_id] = parseInt(userRating.rating);
        }
      }
    }

    if (Object.keys(updatedRatings).length > 0) {
      userRatings = { ...userRatings, ...updatedRatings };
      localStorage.setItem("userRatings", JSON.stringify(userRatings));
    }
  } catch (error) {
    console.error("Error syncing user ratings:", error);
  }
}

// fetch recipe rating from API
async function fetchRecipeRating(recipeId) {
  try {
    const url = `${baseUrl}/ratings/getByRecipe/?recipe_id=${recipeId}`;
    const response = await fetch(url);

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error(`Error fetching rating for recipe ${recipeId}:`, error);
  }
  return null;
}

async function submitRating(recipeId, rating, comment = null) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    alert("Please sign in to rate recipes!");
    return false;
  }

  try {
    const response = await fetch(`${baseUrl}/ratings/rate/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipe_id: recipeId,
        rating: rating,
        comment: comment,
      }),
    });

    if (response.ok) {
      userRatings[recipeId] = rating;
      localStorage.setItem("userRatings", JSON.stringify(userRatings));
      return true;
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.error || "Failed to submit rating"}`);
      return false;
    }
  } catch (error) {
    alert("An error occurred while submitting rating. Please try again.");
    return false;
  }
}

function getUserRating(recipeId) {
  return userRatings[recipeId] || 0;
}

// create star rating component
function createStarRating(
  recipeId,
  averageRating = 0,
  userRating = 0,
  interactive = false,
  showText = true
) {
  const stars = [];
  const starCount = 5;

  // show user rating if they've rated, otherwise fall back to average
  const visualRating = userRating > 0 ? userRating : averageRating;
  const numericRating = userRating > 0 ? userRating : averageRating;

  for (let i = 1; i <= starCount; i++) {
    const isFilled = i <= visualRating;
    const isUserRated = i <= userRating;
    const starClass = interactive ? "star-interactive" : "star-display";
    const fillClass = isFilled ? "filled" : "";
    const userClass = isUserRated ? "user-rated" : "";

    if (interactive) {
      stars.push(`
        <span class="${starClass} ${fillClass} ${userClass}" 
              data-rating="${i}" 
              data-recipe-id="${recipeId}">
          ★
        </span>
      `);
    } else {
      stars.push(`
        <span class="${starClass} ${fillClass}">★</span>
      `);
    }
  }

  const ratingText = showText
    ? `<span class="rating-text">${
        numericRating > 0 ? numericRating.toFixed(1) : "No rating"
      }</span>`
    : "";
  const userRatingText =
    interactive && userRating > 0
      ? `<span class="user-rating-text">Your rating: ${userRating}</span>`
      : "";

  return `
    <div class="star-rating" data-recipe-id="${recipeId}">
      <div class="stars">${stars.join("")}</div>
      ${ratingText}
      ${userRatingText}
    </div>
  `;
}

function highlightStars(recipeId, rating) {
  const container = document.querySelector(
    `.star-rating[data-recipe-id="${recipeId}"]`
  );
  if (!container) return;

  container.querySelectorAll(".star-interactive").forEach((star, index) => {
    const starRating = index + 1;
    star.classList.toggle("highlight", starRating <= rating);
  });
}

function resetStars(recipeId) {
  const container = document.querySelector(
    `.star-rating[data-recipe-id="${recipeId}"]`
  );
  if (!container) return;

  container.querySelectorAll(".star-interactive").forEach((star) => {
    star.classList.remove("highlight");
  });
}

function setupStarEventListeners(recipeId, forceRefresh = false) {
  const stars = document.querySelectorAll(
    `.star-interactive[data-recipe-id="${recipeId}"]`
  );

  stars.forEach((star) => {
    if (!forceRefresh && star.dataset.hasListeners === "true") {
      return;
    }

    const rating = parseInt(star.getAttribute("data-rating"));
    if (isNaN(rating) || rating < 1 || rating > 5) return;

    star.addEventListener("click", (e) => {
      e.stopPropagation();
      rateRecipe(recipeId, rating);
    });

    star.addEventListener("mouseover", (e) => {
      e.stopPropagation();
      highlightStars(recipeId, rating);
    });

    star.addEventListener("mouseout", (e) => {
      e.stopPropagation();
      resetStars(recipeId);
    });

    star.dataset.hasListeners = "true";
  });
}

async function rateRecipe(recipeId, rating) {
  const success = await submitRating(recipeId, rating);
  if (success) {
    updateRecipeRatingDisplay(recipeId);
  }
}

async function updateRecipeRatingDisplay(recipeId) {
  // fetch updated rating data and refresh displays
  const ratingData = await fetchRecipeRating(recipeId);
  if (ratingData) {
    // update recipe in allRecipes array
    const recipe = allRecipes.find((r) => r.recipe_id == recipeId);
    if (recipe) {
      recipe.rating = ratingData.rating.average_rating
        ? parseFloat(ratingData.rating.average_rating).toFixed(1)
        : "No rating";
    }

    // refresh recipe displays without resetting pagination
    const currentRecipes =
      filteredRecipes.length > 0 ? filteredRecipes : allRecipes;
    displayRecipes(currentRecipes, false);

    // if modal is open for this recipe, update it in-place
    const openModal = document.getElementById("recipeModal");
    if (openModal && openModal.classList.contains("active")) {
      const modalRecipeId = openModal
        .querySelector(".star-rating")
        ?.getAttribute("data-recipe-id");
      if (modalRecipeId == recipeId) {
        updateModalRatingDisplay(recipeId, ratingData);
      }
    }
  }
}

// update modal rating without closing
function updateModalRatingDisplay(recipeId, ratingData) {
  const modal = document.getElementById("recipeModal");
  if (!modal) return;

  const ratingContainer = modal.querySelector(".modal-rating-container");
  if (!ratingContainer) return;

  // get updated rating values
  const averageRating = ratingData?.rating?.average_rating
    ? parseFloat(ratingData.rating.average_rating)
    : 0;
  const userRating = getUserRating(recipeId);

  // create new star rating HTML
  const newStarHTML = createStarRating(
    recipeId,
    averageRating,
    userRating,
    true,
    false
  );
  ratingContainer.innerHTML = newStarHTML;

  // setup event listeners for new stars
  setupStarEventListeners(recipeId, true);
}

// display recipe grid with pagination
function displayRecipes(recipes, append = false) {
  filteredRecipes = recipes;

  if (!append) {
    currentlyDisplayed = 0;
    recipesGrid.innerHTML = "";
  }

  const startIndex = currentlyDisplayed;
  const endIndex = Math.min(startIndex + RECIPES_PER_PAGE, recipes.length);
  const recipesToShow = recipes.slice(startIndex, endIndex);

  const newCardsHTML = recipesToShow
    .map((recipe) => createRecipeCard(recipe))
    .join("");

  if (append) {
    recipesGrid.insertAdjacentHTML("beforeend", newCardsHTML);
  } else {
    recipesGrid.innerHTML = newCardsHTML;
  }

  currentlyDisplayed = endIndex;

  // add click handlers to new cards
  document.querySelectorAll(".recipe-card").forEach((card) => {
    card.addEventListener("click", () => {
      const recipeId = card.getAttribute("data-recipe-id");
      showRecipeModal(recipeId);
    });
  });

  // setup star event listeners for recipe cards
  recipesToShow.forEach((recipe) => {
    setupStarEventListeners(recipe.recipe_id);
  });

  updateHeartIcons();
  updateLoadMoreButton();
}

// update load more button visibility and text
function updateLoadMoreButton() {
  const hasMore = currentlyDisplayed < filteredRecipes.length;
  const remaining = filteredRecipes.length - currentlyDisplayed;

  if (hasMore) {
    loadMoreBtn.style.display = "inline-block";
    loadMoreBtn.textContent = `Load More (${remaining} remaining)`;
  } else {
    loadMoreBtn.style.display = "none";
  }
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
  if (!recipe) return;

  // remove existing modal first
  const existingModal = document.getElementById("recipeModal");
  if (existingModal) {
    existingModal.remove();
  }

  // create and insert modal
  const modalHTML = createRecipeModal(recipe);
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // get modal elements
  const modal = document.getElementById("recipeModal");
  const closeButton = document.getElementById("closeRecipeModal");

  // setup star rating event listeners
  setupStarEventListeners(recipeId);

  // close handler
  const closeModal = () => {
    modal.classList.remove("active");
    document.body.style.overflow = "";
    // cleanup DOM after transition
    setTimeout(() => {
      if (modal && modal.parentNode) {
        modal.remove();
      }
    }, 300); // match CSS transition
  };

  // setup event listeners
  closeButton.addEventListener("click", closeModal);

  // escape key handler for this modal
  const handleEscape = (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
      document.removeEventListener("keydown", handleEscape);
    }
  };
  document.addEventListener("keydown", handleEscape);

  // show modal
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

loadMoreBtn.addEventListener("click", () => {
  // load more recipes with animation
  loadMoreBtn.textContent = "Loading...";
  loadMoreBtn.disabled = true;

  setTimeout(() => {
    displayRecipes(filteredRecipes, true);
    loadMoreBtn.disabled = false;
  }, 300); // small delay for UX reasons (better than instantly served)
});

// scroll animations
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
  // load stored ratings first for immediate display
  loadStoredRatings();
  await updateNavigationForUser();
  await loadUserFavorites();
  await fetchAllRecipes();
  animateOnScroll();

  // hero animations
  setTimeout(() => {
    document.querySelector(".hero-content").style.opacity = "1";
    document.querySelector(".hero-content").style.transform = "translateY(0)";
  }, 100);

  setTimeout(() => {
    document.querySelector(".hero-image").style.opacity = "1";
    document.querySelector(".hero-image").style.transform = "translateY(0)";
  }, 400);
});

// cleanup mobile menu on resize
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
  }
});
