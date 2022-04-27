import { RECIPES_DATABASE } from "../data/recipes.js";
import { RECIPES, getAllRecipes } from "../factories/RecipeFactory.js";
export { initRecipes, displayRecipes, displayRecipe, removeAllRecipesFromDOM };

// Construit toutes les recettes et les affiche dans le DOM
async function initRecipes() {
  // Récupère les recettes du fichier DATA
  await getAllRecipes(RECIPES_DATABASE);
  // Affiche les recettes
  displayRecipes(RECIPES.ALL);
}

// Affiche toutes les cartes recettes dans le DOM
async function displayRecipes(recipes) {
  recipes.forEach((recipe) => {
    displayRecipe(recipe);
  });
}

// Affiche la carte recette dans le DOM
async function displayRecipe(recipe) {
  recipe.displayRecipeCard();
  // Sauvegarde la recette affichée dans un tableau
  RECIPES.DISPLAYED.push(recipe);
}

// Supprime toutes les cartes recettes dans le DOM
async function removeAllRecipesFromDOM() {
  const recipesSection = document.querySelector("section.recipes-section");
  const recipesContainer = document.querySelector(".recipes-section .row");

  recipesSection.removeChild(recipesContainer);

  const newRecipesContainer = document.createElement("div");
  newRecipesContainer.classList.add("row");
  newRecipesContainer.classList.add("g-4");
  newRecipesContainer.classList.add("g-md-4");
  newRecipesContainer.classList.add("g-lg-5");
  newRecipesContainer.classList.add("g-xl-4");
  newRecipesContainer.classList.add("g-xxl-5");

  recipesSection.appendChild(newRecipesContainer);

  // Vide le tableau des recettes affichées
  RECIPES.DISPLAYED = [];
}
