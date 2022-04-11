import { RECIPES_DATA } from "../data/recipes.js";
import {
  RECIPES,
  getAllRecipes,
  displayRecipes,
} from "../factories/RecipeFactory.js";
import {
  getAllIngredientFilters,
  insertIngredientsDropdownDOM,
} from "../factories/FilterFactory.js";

async function init() {
  // Récupère les recettes du fichier DATA
  await getAllRecipes(RECIPES_DATA);
  // Affiche les recettes
  displayRecipes();

  // Construit les filtres "ingrédient"
  await getAllIngredientFilters(RECIPES_DATA);
  // Insère les filtres "ingrédient" dans le menu dropdown
  insertIngredientsDropdownDOM();
}

init();

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
    .classList.add("margin-left-multicol3");
});
myDropdown.addEventListener("hidden.bs.dropdown", function () {
  document
    .querySelector(".ustensils-dropdown")
    .classList.remove("margin-left-multicol3");
});
