import { initRecipes } from "../factories/RecipeFactory.js";
import { initFilters } from "../factories/FilterFactory.js";
import { initMainSearch } from "../components/mainSearch.js";
import { initFiltersSearch } from "../components/filtersSearch.js";

function init() {
  initRecipes();

  initFilters();

  initMainSearch();

  initFiltersSearch();
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

// --------------------------------------------------------------------------

// console.log("--------- removeRecipeCard -----------");

// RECIPES_DISPLAYED[2].removeRecipeCard();

// console.log("---------  -----------");

// console.log("--------- displayRecipeCard -----------");

// RECIPES_ALL[2].displayRecipeCard();

// console.log("---------  -----------");
