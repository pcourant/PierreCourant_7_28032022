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
}

init();