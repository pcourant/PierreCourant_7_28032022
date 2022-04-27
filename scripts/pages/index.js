import { initRecipes } from "../components/recipesManaging.js";
import { initFilters } from "../components/filtersManaging.js";
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
