import {
  INGREDIENT_FILTERS_ALL,
  APPLIANCE_FILTERS_ALL,
  USTENSIL_FILTERS_ALL,
  getIngredientFilters,
  getApplianceFilters,
  getUstensilFilters,
  displayIngredientFilters,
  displayApplianceFilters,
  displayUstensilFilters,
  removeIngredientFilters,
  removeApplianceFilters,
  removeUstensilFilters,
} from "../factories/FilterFactory.js";

export {
  INGREDIENT_FILTERS_DISPLAYED,
  APPLIANCE_FILTERS_DISPLAYED,
  USTENSIL_FILTERS_DISPLAYED,
  selectFilter,
  initFiltersSearch,
};

const INGREDIENT_FILTERS_DISPLAYED = [];
const APPLIANCE_FILTERS_DISPLAYED = [];
const USTENSIL_FILTERS_DISPLAYED = [];

const applianceFilterInput = document.getElementById("appliances-search");

async function updateApplianceFilters(e) {
  e.preventDefault();
  const searchText = e.target.value;

  await removeApplianceFilters();
  APPLIANCE_FILTERS_DISPLAYED.splice(0, APPLIANCE_FILTERS_DISPLAYED.length);

  await searchAndDisplayApplianceFilters(searchText);
  displayApplianceFilters(APPLIANCE_FILTERS_DISPLAYED);

  console.log(`--------------------------------`);
  console.log(`$$$ updateApplianceFilters ("${searchText}") :`);
  console.log(APPLIANCE_FILTERS_DISPLAYED);
  console.log(`--------------------------------`);
}

async function searchAndDisplayApplianceFilters(input) {
  for (let i = 0; i < APPLIANCE_FILTERS_ALL.length; i++) {
    const appliance = APPLIANCE_FILTERS_ALL[i];
    let isFound = false;

    // Teste si le nom de l'appareil contient l'input
    isFound = appliance.name.toLowerCase().includes(input.toLowerCase());

    if (isFound) {
      APPLIANCE_FILTERS_DISPLAYED.push(appliance);
    }
  }
}

async function selectFilter(e) {
  const type = e.target.dataset.type;
  const name = e.target.textContent;

  console.log(`--------------------------------`);
  console.log(`$$$ selectFilter => type: ${type} / name: ${name}`);
  console.log(`--------------------------------`);

  console.log(document.getElementById(`${type}s-search`));
  //   document.getElementById(`${type}s-search`).value = "";
}

async function resetIngredientFiltersDropDown(e) {
  document
    .querySelector(".appliances-dropdown")
    .classList.remove("margin-left-multicol3");

  document.getElementById(`ingredients-search`).value = "";
}

async function resetApplianceFiltersDropDown(e) {
  document.getElementById(`appliances-search`).value = "";
}

async function initFiltersSearch() {
  let myDropdown = document.getElementById("dropdownIngredientsButton");
  myDropdown.addEventListener(
    "hidden.bs.dropdown",
    resetIngredientFiltersDropDown
  );

  myDropdown = document.getElementById("dropdownAppliancesButton");
  myDropdown.addEventListener(
    "hidden.bs.dropdown",
    resetApplianceFiltersDropDown
  );

  // -----------------------------------------------------------------------

  applianceFilterInput.addEventListener("input", updateApplianceFilters);
}
