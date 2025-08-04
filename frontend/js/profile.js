const baseUrl = `http://localhost/backend/public/api`;

// dom elements
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const signOutModal = document.getElementById("signOutModal");
const closeModal = document.getElementById("closeModal");
const cancelSignOut = document.getElementById("cancelSignOut");
const confirmSignOut = document.getElementById("confirmSignOut");
const footerSignOutLink = document.getElementById("footerSignOutLink");

// profile elements
const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const favoriteCount = document.getElementById("favoriteCount");
const ratingCount = document.getElementById("ratingCount");
const favoritesGrid = document.getElementById("favoritesGrid");
const emptyFavorites = document.getElementById("emptyFavorites");
const refreshFavoritesBtn = document.getElementById("refreshFavoritesBtn");
const signOutBtn = document.getElementById("signOutBtn");

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

// load user data
async function loadUserProfile() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return;

  // update profile info
  profileName.textContent = user.name || "User";
  profileEmail.textContent = user.email || "No email available";

  // load user favorites
  await loadUserFavorites();

  // load user ratings count
  await loadUserRatingsCount();
}

// load user favorites function to be called in loadUserProfile
async function loadUserFavorites() {
  try {
    const response = await fetch(`${baseUrl}/favourites/getMy/`);
    if (response.ok) {
      const favorites = await response.json();
      const favoriteIds = favorites.map((fav) => fav.recipe_id);

      // update favorite count
      favoriteCount.textContent = favoriteIds.length;

      // load favorite recipes
      if (favoriteIds.length > 0) {
        await loadFavoriteRecipes(favoriteIds);
      } else {
        showEmptyFavorites();
      }
    } else {
      console.error("Failed to load favorites");
      showEmptyFavorites();
    }
  } catch (error) {
    console.error("Error loading favorites:", error);
    showEmptyFavorites();
  }
}

// load favorite recipes being called in loadUserFavorites
async function loadFavoriteRecipes(favoriteIds) {
  try {
    const recipes = [];

    for (const recipeId of favoriteIds) {
      try {
        const response = await fetch(
          `${baseUrl}/recipes/getFull?id=${recipeId}`
        );
        if (response.ok) {
          const recipe = await response.json();
          recipes.push(recipe);
        }
      } catch (error) {
        console.error(`Error loading recipe ${recipeId}:`, error);
      }
    }

    displayFavoriteRecipes(recipes);
  } catch (error) {
    console.error("Error loading favorite recipes:", error);
    showEmptyFavorites();
  }
}

// favorite recipes function
function displayFavoriteRecipes(recipes) {
  if (recipes.length === 0) {
    showEmptyFavorites();
    return;
  }

  const recipesHTML = recipes
    .map((recipe) => createRecipeCard(recipe))
    .join("");
  favoritesGrid.innerHTML = recipesHTML;

  //   document.querySelectorAll(".recipe-card").forEach((card) => {
  //     card.addEventListener("click", () => {
  //       const recipeId = card.getAttribute("data-recipe-id");
  //       showRecipeModal(recipeId);
  //     });
  //   });

  // star event listeners
  recipes.forEach((recipe) => {
    setupStarEventListeners(recipe.recipe_id);
  });

  updateHeartIcons();
}

// show default empty favorites - when a user hasnt favorited anything yet
function showEmptyFavorites() {
  favoritesGrid.innerHTML = "";
  favoriteCount.textContent = "0";
}

// load ratings count
async function loadUserRatingsCount() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return;

  try {
    let ratingCount = 0;
    const userRatings = JSON.parse(localStorage.getItem("userRatings") || "{}");
    ratingCount = Object.keys(userRatings).length;

    document.getElementById("ratingCount").textContent = ratingCount;
  } catch (error) {
    console.error("Error loading ratings count:", error);
    document.getElementById("ratingCount").textContent = "0";
  }
}

// create recipe card function reusable from index.js
// If i was able to use React.JS here, we could have reused this function meaning no code duplication
function createRecipeCard(recipe) {
  const isFavorited = checkIfFavorited(recipe.recipe_id);
  const heartClass = isFavorited ? "heart-icon favorited" : "heart-icon";
  const userRating = getUserRating(recipe.recipe_id);

  return `
    <div class="recipe-card" data-recipe-id="${recipe.recipe_id}">
      <div class="recipe-image">
        <img src="${recipe.image_path}" alt="${
    recipe.title
  }" class="recipe-image">
        
        <div class="${heartClass}" data-recipe-id="${
    recipe.recipe_id
  }" onclick="event.stopPropagation(); toggleFavorite(${recipe.recipe_id})">
          <img src="assets/icons/heart.png" alt="Favorite" class="heart-img" />
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
          <span class="recipe-time">⏱️ ${recipe.total_time} minutes</span>
          <div class="recipe-rating-container" onclick="event.stopPropagation();">
            ${createStarRating(recipe.recipe_id, userRating, true, false)}
          </div>
        </div>
      </div>
    </div>
  `;
}

// check recipe is favorited
function checkIfFavorited(recipeId) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return false;

  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  return favorites.includes(recipeId);
}

// get rating
function getUserRating(recipeId) {
  const userRatings = JSON.parse(localStorage.getItem("userRatings") || "{}");
  return userRatings[recipeId] || 0;
}

// create star rating
function createStarRating(
  recipeId,
  userRating = 0,
  interactive = false,
  showText = true
) {
  const stars = [];
  const starCount = 5;

  const visualRating = userRating;
  const numericRating = userRating;

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

// setup star event listeners
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

// highlight stars on hover
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

// reset stars
function resetStars(recipeId) {
  const container = document.querySelector(
    `.star-rating[data-recipe-id="${recipeId}"]`
  );
  if (!container) return;

  container.querySelectorAll(".star-interactive").forEach((star) => {
    star.classList.remove("highlight");
  });
}

// rate recipe
async function rateRecipe(recipeId, rating) {
  const success = await submitRating(recipeId, rating);
  if (success) {
    // refresh the page to show updated ratings
    await loadUserProfile();
  }
}

// persist rating to database
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
      const userRatings = JSON.parse(
        localStorage.getItem("userRatings") || "{}"
      );
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

// toggle favorite
async function toggleFavorite(recipeId) {
  // early return on user is signed out
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
        // refresh favorites
        await loadUserFavorites();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "Failed to remove from favorites"}`);
      }
    } else {
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
        await loadUserFavorites();
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

// add to favorites - used in toggleFavorite
function addToLocalFavorites(recipeId) {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  if (!favorites.includes(recipeId)) {
    favorites.push(recipeId);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
}

// remove from favorites to be used in toggleFavorite
function removeFromLocalFavorites(recipeId) {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  const updatedFavorites = favorites.filter((id) => id !== recipeId);
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
}

// update heart icons
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

// show recipe modal
function showRecipeModal(recipeId) {
  // redirect to index.html with the recipe modal
  window.location.href = `index.html?recipe=${recipeId}`;
}

function openModal() {
  signOutModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModalFunc() {
  signOutModal.classList.remove("active");
  document.body.style.overflow = "";
}

// handle logout
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
      localStorage.removeItem("userRatings");
      window.location.href = "index.html";
    } else {
      const errorData = await response.json();
      alert(`Logout failed: ${errorData.message || "Unknown error"}`);
    }
  } catch (error) {
    localStorage.removeItem("user");
    localStorage.removeItem("favorites");
    localStorage.removeItem("userRatings");
    window.location.href = "index.html";
  }
}

closeModal.addEventListener("click", closeModalFunc);
cancelSignOut.addEventListener("click", closeModalFunc);

signOutModal.addEventListener("click", (e) => {
  if (e.target === signOutModal) {
    closeModalFunc();
  }
});

confirmSignOut.addEventListener("click", async () => {
  closeModalFunc();
  await handleLogout();
});

footerSignOutLink.addEventListener("click", (e) => {
  e.preventDefault();
  openModal();
});

signOutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  openModal();
});

refreshFavoritesBtn.addEventListener("click", async () => {
  refreshFavoritesBtn.textContent = "Loading...";
  refreshFavoritesBtn.disabled = true;

  await loadUserFavorites();

  refreshFavoritesBtn.textContent = "Refresh";
  refreshFavoritesBtn.disabled = false;
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && signOutModal.classList.contains("active")) {
    closeModalFunc();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  if (!checkAuthentication()) {
    return;
  }

  await loadUserProfile();
});
