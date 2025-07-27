document.addEventListener("DOMContentLoaded", () => {
  const recipeList = document.getElementById("recipe-list");
  const loadingMessage = document.getElementById("loading-message");

  // Function to create a single recipe card HTML string
  function createRecipeCard(recipe) {
    // Using template literals for cleaner HTML string construction
    return `
      <div class="recipe-card">
        <img
          src="${recipe.imageUrl}"
          alt="${recipe.title}"
          class="recipe-card-image"
          onerror="this.onerror=null;this.src='https://placehold.co/600x400/cccccc/333333?text=Image+Not+Found';"
        />
        <div class="recipe-card-content">
          <h3 class="recipe-card-title">${recipe.title}</h3>
          <p class="recipe-card-description">${recipe.description}</p>
          <a href="${recipe.link}" class="recipe-card-button">View Recipe</a>
        </div>
      </div>
    `;
  }

  // Function to fetch and display recipes
  async function fetchAndDisplayRecipes() {
    // loading messages
    loadingMessage.style.display = "block";
    recipeList.innerHTML = '<p id="loading-message">Loading recipes...</p>';

    try {
      // TODO: Call PHP API to get data to populate

      // mock data for demonstration
      // TODO: Remove Mock data before submission
      const mockRecipes = [
        {
          id: 1,
          title: "Creamy Tomato Pasta",
          description:
            "A quick and easy pasta dish with a rich, creamy tomato sauce. Perfect for a weeknight meal.",
          imageUrl:
            "https://placehold.co/600x400/ffa500/000000?text=Delicious+Pasta",
          link: "#recipe-1",
        },
        {
          id: 2,
          title: "Spicy Chicken Curry",
          description:
            "An aromatic chicken curry packed with vibrant spices and tender chicken pieces.",
          imageUrl:
            "https://placehold.co/600x400/ffa500/000000?text=Chicken+Curry",
          link: "#recipe-2",
        },
        {
          id: 3,
          title: "Healthy Vegetable Stir-fry",
          description:
            "A colorful and nutritious stir-fry with a variety of fresh vegetables and a savory sauce.",
          imageUrl:
            "https://placehold.co/600x400/ffa500/000000?text=Vegetable+Stir-fry",
          link: "#recipe-3",
        },
        {
          id: 4,
          title: "Decadent Chocolate Cake",
          description:
            "A rich and moist chocolate cake, perfect for any celebration or sweet craving.",
          imageUrl:
            "https://placehold.co/600x400/ffa500/000000?text=Chocolate+Cake",
          link: "#recipe-4",
        },
        {
          id: 5,
          title: "Classic Margherita Pizza",
          description:
            "Simple yet delicious pizza with fresh mozzarella, basil, and tomato sauce.",
          imageUrl:
            "https://placehold.co/600x400/ffa500/000000?text=Margherita+Pizza",
          link: "#recipe-5",
        },
        {
          id: 6,
          title: "Lemon Herb Roasted Chicken",
          description:
            "Tender and juicy roasted chicken infused with zesty lemon and aromatic herbs.",
          imageUrl:
            "https://placehold.co/600x400/ffa500/000000?text=Roasted+Chicken",
          link: "#recipe-6",
        },
      ];

      // clear loading message
      recipeList.innerHTML = "";

      // iterate over the mock data and create cards
      mockRecipes.forEach((recipe) => {
        recipeList.insertAdjacentHTML("beforeend", createRecipeCard(recipe));
      });
    } catch (error) {
      console.error("Error fetching recipes:", error);
      recipeList.innerHTML =
        '<p style="color: red; text-align: center;">Failed to load recipes. Please try again later.</p>';
    }
  }

  // Call fetch function to fetch and display recipes when on page load
  fetchAndDisplayRecipes();
});
