import { initRecipes } from "../factories/RecipeFactory.js";
import { initFilters } from "../factories/FilterFactory.js";
import { initMainSearch } from "../components/recipesSearch.js";
import { initFiltersSearch } from "../components/filtersSearch.js";

function init() {
  initRecipes();

  initFilters();

  initMainSearch();

  initFiltersSearch();
}

init();

// ------------------------------------------------------------------------------------
