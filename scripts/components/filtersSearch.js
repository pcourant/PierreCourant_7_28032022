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

  const updatedFilters = await searchAndDisplayApplianceFilters(searchText);
  displayApplianceFilters(updatedFilters);

  console.log(`--------------------------------`);
  console.log(`$$$ updateApplianceFilters ("${searchText}") :`);
  console.log("APPLIANCE_FILTERS_DISPLAYED");
  console.log(APPLIANCE_FILTERS_DISPLAYED);
  console.log("updatedFilters");
  console.log(updatedFilters);
  console.log(`--------------------------------`);
}

async function searchAndDisplayApplianceFilters(input) {
  const updatedFilters = [];
  for (let i = 0; i < APPLIANCE_FILTERS_DISPLAYED.length; i++) {
    const appliance = APPLIANCE_FILTERS_DISPLAYED[i];
    let isFound = false;

    // Teste si le nom de l'appareil contient l'input
    isFound = appliance.name.toLowerCase().includes(input.toLowerCase());

    if (isFound) {
      updatedFilters.push(appliance);
    }
  }
  return updatedFilters;
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
  document.getElementById(`ingredients-search`).value = "";
}

async function resetApplianceFiltersDropDown(e) {
  document.getElementById(`appliances-search`).value = "";
}

async function initFiltersSearch() {
  let myDropdownButton = document.getElementById("dropdownIngredientsButton");
  myDropdownButton.addEventListener(
    "hidden.bs.dropdown",
    resetIngredientFiltersDropDown
  );

  myDropdownButton = document.getElementById("dropdownAppliancesButton");
  myDropdownButton.addEventListener(
    "hidden.bs.dropdown",
    resetApplianceFiltersDropDown
  );

  myDropdownButton = document.getElementById("dropdownUstensilsButton");
  myDropdownButton.addEventListener(
    "hidden.bs.dropdown",
    resetApplianceFiltersDropDown
  );

  // -----------------------------------------------------------------------

  applianceFilterInput.addEventListener("input", updateApplianceFilters);
}
