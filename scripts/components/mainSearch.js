import {
  RECIPES_DATABASE,
  RECIPES_DISPLAYED,
  getAllRecipes,
  displayAllRecipes,
  removeAllRecipes,
} from "../factories/RecipeFactory.js";
export { initMainSearch };

const searchInput = document.getElementById("search-input");

async function searchAndDisplay(input) {
  const recipesDisplayed = RECIPES_DATABASE.filter((recipe) => {
    // // Récupère tous les ingrédients
    // const ingredientsText = recipe.ingredients.reduce(
    //   (previousValue, currentValue) => {
    //     return `${previousValue} ${currentValue.ingredient}`;
    //   },
    //   ""
    // );
    // // Construit un string avec tout le texte de la recette
    // const recipeText = `${recipe.name} ${recipe.description} ${ingredientsText}`;
    // // console.log("searchAndDisplay, recipeText :");
    // // console.log(recipeText);
    // // Vérifie si l'input de l'utilisateur est inclus dans la recette
    // const isFound = recipeText.toLowerCase().includes(input.toLowerCase());

    let isFound = false;

    // Teste si le titre contient l'input
    isFound = recipe.name.toLowerCase().includes(input.toLowerCase());

    // Teste si la description contient l'input
    if (!isFound) {
      isFound = recipe.description.toLowerCase().includes(input.toLowerCase());

      // Teste si un ingrédient contient l'input
      if (!isFound) {
        isFound = recipe.ingredients.find((element) => {
          return element.ingredient.toLowerCase().includes(input.toLowerCase());
        });
        // if (isFound) {
        //   console.log("ingredients: ", recipe);
        // }
      }
    }

    if (isFound) {
      recipe.displayRecipeCard();
    }

    // Return le test pour la méthode filter et la construction du tableau résultat
    return isFound;
  });

  // console.log("searchAndDisplay, recipesDisplayed: ", recipesDisplayed);
}

async function updateRecipes(e) {
  e.preventDefault();
  const searchText = e.target.value;

  // Efface toutes les recettes présentes
  await removeAllRecipes();

  if (searchText.length < 3) {
    displayAllRecipes();
    return;
  }

  searchAndDisplay(searchText);
}

async function initMainSearch() {
  searchInput.addEventListener("input", updateRecipes);
}
