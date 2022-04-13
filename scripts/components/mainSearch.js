import {
  RECIPES_DATABASE,
  RECIPES_DISPLAYED,
  getAllRecipes,
  displayAllRecipes,
  removeAllRecipes,
} from "../factories/RecipeFactory.js";
export { initMainSearch };

const searchInput = document.getElementById("search-input");

async function searchAndDisplay(input) {}
// async function searchInputInTitle(input) {}
// async function searchInputInDescription(input) {}
// async function searchInputInIngredients(input) {}

async function searchInputInString(input, string) {
  return string.includes(input);
}

async function updateRecipes(e) {
  e.preventDefault();

  const searchText = e.target.value;
  if (searchText.length < 3) {
    console.log("searchText = ", searchText);
    await removeAllRecipes();
    displayAllRecipes();
    return;
  }

  // Efface toutes les recettes présentes
  await removeAllRecipes();
  searchAndDisplay(searchText);
}

async function initMainSearch() {
  searchInput.addEventListener("input", updateRecipes);
}
