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
