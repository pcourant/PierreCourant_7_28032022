import { RECIPES } from "../factories/RecipeFactory.js";
import {
  displayRecipes,
  displayRecipe,
  removeAllRecipesFromDOM,
} from "../components/recipesManaging.js";
import { updateDropdownMenus } from "../components/filtersManaging.js";
export { initMainSearch };

// Initialise l'event listener de la barre de recherche
async function initMainSearch() {
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", updateRecipes);
}

async function updateRecipes(e) {
  e.preventDefault();
  const input = e.target.value;

  // Reset searched result
  RECIPES.SEARCHED = [];
  // Efface les recettes affichées
  await removeAllRecipesFromDOM();

  // Si l'input est inférieur à 3 caractères, pas de recherche
  if (input.length < 3) {
    RECIPES.SEARCHED = RECIPES.ALL.slice(0, RECIPES.ALL.length);
    // Affiche les recettes filtrées par l'input de l'utilisateur
    await displayRecipes(RECIPES.FILTERED);
    document.getElementById("norecipe-text").classList.add("hidden");
  } else {
    await searchAndDisplay(
      input,
      RECIPES.ALL,
      RECIPES.FILTERED,
      RECIPES.SEARCHED
    );
  }

  // Update filters lists
  updateDropdownMenus(RECIPES.DISPLAYED);

  console.log(`--------------------------------`);
  console.log(`$$$ UPDATE RECIPES ("${input}") :`);
  console.log(`RECIPES :`);
  console.log(RECIPES.DISPLAYED);
  console.log(`--------------------------------`);
}

async function searchAndDisplay(
  input,
  recipesALL,
  recipesFILTERED,
  recipesSEARCHED
) {
  for (let i = 0; i < recipesALL.length; i++) {
    const recipe = recipesALL[i];
    let inputIsFound = false;

    // Teste si le titre contient l'input
    inputIsFound = recipe.name.toLowerCase().includes(input.toLowerCase());

    // Teste si la description contient l'input
    if (!inputIsFound) {
      inputIsFound = recipe.description
        .toLowerCase()
        .includes(input.toLowerCase());

      // Teste si un ingrédient contient l'input
      if (!inputIsFound) {
        let j = 0;
        while (!inputIsFound && j < recipe.ingredients.length) {
          inputIsFound = recipe.ingredients[j].ingredient
            .toLowerCase()
            .includes(input.toLowerCase());
          j++;
        }
      }
    }

    // Si l'input apparaît quelque part, insère dans le tableau résultat
    if (inputIsFound) {
      recipesSEARCHED.push(recipe);

      // Si la recette est aussi dans le tableau des recettes filtrées
      if (recipesFILTERED.includes(recipe)) {
        // Affichage de la recette
        displayRecipe(recipe);
      }
    }
  }

  if (RECIPES.DISPLAYED.length === 0) {
    document.getElementById("norecipe-text").classList.remove("hidden");
  } else {
    document.getElementById("norecipe-text").classList.add("hidden");
  }
}
