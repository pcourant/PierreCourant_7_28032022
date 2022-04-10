import { RECIPES_DATA } from "../data/recipes.js";
import {
  RECIPES,
  getAllRecipes,
  displayRecipes,
} from "../factories/RecipeFactory.js";

async function init() {
  // Récupère les recettes du fichier DATA
  await getAllRecipes(RECIPES_DATA);

  // Affiche les recettes
  // displayPhotographers(photographers);
  displayRecipes();

  document
    .getElementById("dropdownIngredientsButton")
    .addEventListener("click", () => {
      document
        .querySelector(".appareils-dropdown")
        .classList.add("margin-left-multicol3");
    });
  document
    .getElementById("dropdownAppareilsButton")
    .addEventListener("click", () => {
      document
        .querySelector(".ustensils-dropdown")
        .classList.add("margin-left-multicol3");
    });

  document
    .querySelector(".dropdown-menu .fa-chevron-up")
    .addEventListener("click", () => {
      document
        .querySelector(".appareils-dropdown")
        .classList.remove("margin-left-multicol3");
    });
  document.querySelector(".dropdown-filters").addEventListener("click", () => {
    document
      .querySelector(".appareils-dropdown")
      .classList.remove("margin-left-multicol3");
  });
}

init();
