import { RECIPES_DATA } from "../data/recipes.js";
import {
  getAllRecipes,
  displayAllRecipes,
} from "../factories/RecipeFactory.js";
import {
  getAllIngredientFilters,
  insertIngredientsDropdownDOM,
  getAllAppareilFilters,
  insertAppliancesDropdownDOM,
  getAllUstensilFilters,
  insertUstensilsDropdownDOM,
} from "../factories/FilterFactory.js";
import { initMainSearch } from "../components/mainSearch.js";

function init() {
  // Récupère les recettes du fichier DATA
  getAllRecipes(RECIPES_DATA);
  // Affiche les recettes
  displayAllRecipes();

  // Construit les filtres "ingrédient"
  getAllIngredientFilters(RECIPES_DATA);
  // Insère les filtres "ingrédient" dans le menu dropdown
  insertIngredientsDropdownDOM();
  // Construit les filtres "appareil"
  getAllAppareilFilters(RECIPES_DATA);
  // Insère les filtres "appareil" dans le menu dropdown
  insertAppliancesDropdownDOM();
  // Construit les filtres "appareil"
  getAllUstensilFilters(RECIPES_DATA);
  // Insère les filtres "appareil" dans le menu dropdown
  insertUstensilsDropdownDOM();

  // Add main search feature
  initMainSearch();
}

init();

// ------------------------------------------------------------------------------------

let myDropdown = document.getElementById("dropdownIngredientsButton");
myDropdown.addEventListener("show.bs.dropdown", function () {
  document
    .querySelector(".appliances-dropdown")
    .classList.add("margin-left-multicol3");
});
myDropdown.addEventListener("hidden.bs.dropdown", function () {
  document
    .querySelector(".appliances-dropdown")
    .classList.remove("margin-left-multicol3");
});

myDropdown = document.getElementById("dropdownAppliancesButton");
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
