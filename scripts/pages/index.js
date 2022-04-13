import { RECIPES_DATA } from "../data/recipes.js";
import {
  RECIPES_DATABASE,
  getAllRecipes,
  displayAllRecipes,
  removeAllRecipes,
  RECIPES_DISPLAYED,
} from "../factories/RecipeFactory.js";
import {
  getAllIngredientFilters,
  insertIngredientsDropdownDOM,
  getAllAppareilFilters,
  insertAppareilsDropdownDOM,
  getAllUstensilFilters,
  insertUstensilsDropdownDOM,
} from "../factories/FilterFactory.js";
import { initMainSearch } from "../components/mainSearch.js";

async function init() {
  // Récupère les recettes du fichier DATA
  await getAllRecipes(RECIPES_DATA);
  // Affiche les recettes
  displayAllRecipes();

  // Construit les filtres "ingrédient"
  await getAllIngredientFilters(RECIPES_DATA);
  // Insère les filtres "ingrédient" dans le menu dropdown
  insertIngredientsDropdownDOM();
  // Construit les filtres "appareil"
  await getAllAppareilFilters(RECIPES_DATA);
  // Insère les filtres "appareil" dans le menu dropdown
  insertAppareilsDropdownDOM();
  // Construit les filtres "appareil"
  await getAllUstensilFilters(RECIPES_DATA);
  // Insère les filtres "appareil" dans le menu dropdown
  insertUstensilsDropdownDOM();

  // Add main search feature
  initMainSearch();
}

await init();

// ------------------------------------------------------------------------------------

let myDropdown = document.getElementById("dropdownIngredientsButton");
myDropdown.addEventListener("show.bs.dropdown", function () {
  document
    .querySelector(".appareils-dropdown")
    .classList.add("margin-left-multicol3");
});
myDropdown.addEventListener("hidden.bs.dropdown", function () {
  document
    .querySelector(".appareils-dropdown")
    .classList.remove("margin-left-multicol3");
});

myDropdown = document.getElementById("dropdownAppareilsButton");
myDropdown.addEventListener("show.bs.dropdown", function () {
  document
    .querySelector(".ustensils-dropdown")
    .classList.add("margin-left-multicol2");
});
myDropdown.addEventListener("hidden.bs.dropdown", function () {
  document
    .querySelector(".ustensils-dropdown")
    .classList.remove("margin-left-multicol2");
});

// --------------------------------------------------------------------------

// console.log("--------- removeRecipeCard -----------");

// RECIPES_DISPLAYED[2].removeRecipeCard();

// console.log("---------  -----------");

// console.log("--------- displayRecipeCard -----------");

// RECIPES_DATABASE[2].displayRecipeCard();

// console.log("---------  -----------");
