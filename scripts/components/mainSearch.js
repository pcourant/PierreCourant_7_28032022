import {
  RECIPES_DATABASE,
  displayAllRecipes,
  removeAllRecipes,
} from "../factories/RecipeFactory.js";
export { initMainSearch };

const searchInput = document.getElementById("search-input");

async function searchAndDisplay(input) {
  const recipesDisplayed = [];

  for (let i = 0; i < RECIPES_DATABASE.length; i++) {
    const recipe = RECIPES_DATABASE[i];
    let isFound = false;

    // Teste si le titre contient l'input
    isFound = recipe.name.toLowerCase().includes(input.toLowerCase());

    // Teste si la description contient l'input
    if (!isFound) {
      isFound = recipe.description.toLowerCase().includes(input.toLowerCase());

      // Teste si un ingrédient contient l'input
      if (!isFound) {
        let j = 0;
        while (!isFound && j < recipe.ingredients.length) {
          isFound = recipe.ingredients[j].ingredient
            .toLowerCase()
            .includes(input.toLowerCase());
          j++;
        }
      }
    }

    // Si l'input apparaît quelque part, on affiche la recette
    if (isFound) {
      recipe.displayRecipeCard();
      recipesDisplayed.push(recipe);
    }
  }

  return recipesDisplayed;
}

async function updateRecipes(e) {
  e.preventDefault();
  const searchText = e.target.value;

  // Efface toutes les recettes présentes
  await removeAllRecipes();

  if (searchText.length < 3) {
    displayAllRecipes();
    return;
  }

  searchAndDisplay(searchText);
}

async function initMainSearch() {
  searchInput.addEventListener("input", updateRecipes);
}
