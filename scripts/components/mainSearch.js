import {
  RECIPES_DATABASE,
  RECIPES_DISPLAYED,
  getAllRecipes,
  displayAllRecipes,
  removeAllRecipes,
} from "../factories/RecipeFactory.js";
export { initMainSearch };

const searchInput = document.getElementById("search-input");

async function searchAndDisplay(input) {
  // RECIPES_DISPLAYED.forEach((recipe) => {
  //   let isFound = false;
  //   isFound = recipe.name.includes(input);
  //   if (!isFound) {
  //     isFound = recipe.description.includes(input);
  //   }
  //   if (!isFound) {
  //     let i = 0;
  //     while (!isFound && i < recipe.ingredients.length) {
  //       isFound = recipe.ingredients[0].ingredient.includes(input);
  //       i++;
  //     }
  //   }
  //   if (!isFound) {
  //     recipe.removeRecipeCard();
  //   }
  // });
}
// async function searchInputInTitle(input) {}
// async function searchInputInDescription(input) {}
// async function searchInputInIngredients(input) {}

async function searchInputInString(input, string) {
  return string.includes(input);
}

async function updateRecipes(e) {
  e.preventDefault();
  const searchText = e.target.value;

  // Efface toutes les recettes présentes
  await removeAllRecipes();

  if (searchText.length < 3) {
    // console.log("searchText = ", searchText);
    displayAllRecipes();
    return;
  }

  searchAndDisplay(searchText);
}

async function initMainSearch() {
  searchInput.addEventListener("input", updateRecipes);
}
