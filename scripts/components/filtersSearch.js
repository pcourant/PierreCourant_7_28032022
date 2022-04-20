import {
  FILTERS,
  displayFilters,
  removeFiltersFromDOM,
} from "../factories/FilterFactory.js";

export { initFiltersSearch };

async function updateFilters(e) {
  e.preventDefault();
  const searchText = e.target.value;
  const type = e.target.dataset.type;

  // Supprime tous les filtres du DOM
  await removeFiltersFromDOM(type);

  const updatedFilters = await searchFilters(searchText, type);
  displayFilters(type, updatedFilters);

  console.log(`--------------------------------`);
  console.log(`$$$ updateFilters (${searchText} / ${type}) :`);
  console.log(updatedFilters);
  console.log(`--------------------------------`);
}

async function searchFilters(input, type) {
  // Création de la liste de résultat
  const updatedFilters = [];

  const displayedFilters = FILTERS.find(
    (filters) => filters.type === type
  ).displayed;

  for (let i = 0; i < displayedFilters.length; i++) {
    const filter = displayedFilters[i];
    let isFound = false;

    // Teste si le nom de l'appareil contient l'input
    isFound = filter.name.toLowerCase().includes(input.toLowerCase());

    if (isFound) {
      updatedFilters.push(filter);
    }
  }
  return updatedFilters;
}

// async function resetIngredientFiltersDropDown() {
//   document.getElementById(`ingredients-search`).value = "";
// }

async function resetSearchFiltersInput(e) {
  const type = e.target.dataset.type;
  document.getElementById(`${type}s-search`).value = "";
}

async function initFiltersSearch() {
  FILTERS.forEach((filters) => {
    const dropdownButton = document.getElementById(
      `${filters.type}DropdownButton`
    );
    dropdownButton.addEventListener(
      "hidden.bs.dropdown",
      resetSearchFiltersInput
    );

    const filtersSearchInput = document.getElementById(
      `${filters.type}s-search`
    );
    filtersSearchInput.addEventListener("input", updateFilters);
  });

  // -----------------------------------------------------------------------
}
