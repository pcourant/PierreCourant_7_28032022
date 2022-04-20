import {
  RECIPES_ALL,
  displayAllRecipes,
  removeAllRecipes,
} from "../factories/RecipeFactory.js";
import { FILTERS, updateFiltersLists } from "../factories/FilterFactory.js";
export {
  RECIPES_DISPLAYED,
  updateRecipesWithAddedFilter,
  updateRecipesWithRemovedFilter,
  initMainSearch,
};

const RECIPES_DISPLAYED = [];

const searchInput = document.getElementById("search-input");

async function searchAndDisplay(input) {
  for (let i = 0; i < RECIPES_ALL.length; i++) {
    const recipe = RECIPES_ALL[i];
    let isFound = false;

    // Teste si le titre contient l'input
    isFound = recipe.name.toLowerCase().includes(input.toLowerCase());

    // Teste si la description contient l'input
    if (!isFound) {
      isFound = recipe.description.toLowerCase().includes(input.toLowerCase());

      // Teste si un ingrédient contient l'input
      if (!isFound) {
        let j = 0;
        while (!isFound && j < recipe.ingredients.length) {
          isFound = recipe.ingredients[j].ingredient
            .toLowerCase()
            .includes(input.toLowerCase());
          j++;
        }
      }
    }

    // Si l'input apparaît quelque part, on affiche la recette
    if (isFound) {
      recipe.displayRecipeCard();
      RECIPES_DISPLAYED.push(recipe);
    }
  }
}

async function updateRecipes(e) {
  e.preventDefault();
  const searchText = e.target.value;

  // Efface toutes les recettes présentes
  await removeAllRecipes();
  RECIPES_DISPLAYED.splice(0, RECIPES_DISPLAYED.length);

  // Affiche les recettes filtrées par l'input de l'utilisateur
  if (searchText.length < 3) {
    displayAllRecipes();
  } else {
    await searchAndDisplay(searchText);
  }

  // Update filters lists
  updateFiltersLists(RECIPES_DISPLAYED);

  console.log(`--------------------------------`);
  console.log(`$$$ UPDATE RECIPES ("${searchText}") :`);
  console.log(`RECIPES :`);
  console.log(RECIPES_DISPLAYED);
  console.log(`--------------------------------`);
}

async function updateRecipesWithAddedFilter(type, filter) {
  const appliedFilters = FILTERS.find(
    (filters) => filters.type === type
  ).applied;

  appliedFilters.push(filter);

  const recipesToFilter = RECIPES_DISPLAYED.splice(0, RECIPES_DISPLAYED.length);
  await filterRecipes(type, filter, recipesToFilter);

  // Update filters lists
  updateFiltersLists(RECIPES_DISPLAYED);

  console.log(`--------------------------------`);
  console.log(`$$$ updateRecipesWithAddedFilter (${type}, ${filter}) :`);
  console.log(`RECIPES :`);
  console.log(RECIPES_DISPLAYED);
  console.log(`--------------------------------`);
}

async function updateRecipesWithRemovedFilter(type, filter) {
  const appliedFilters = FILTERS.find(
    (filters) => filters.type === type
  ).applied;

  console.log(`$$$ updateRecipesWithRemovedFilter ${type}, ${filter} : `);
  console.log(`appliedFilters ${type} :`);
  console.log(appliedFilters);

  appliedFilters.splice(appliedFilters.indexOf(filter), 1);

  console.log(`appliedFilters ${type} :`);
  console.log(appliedFilters);

  // Efface toutes les recettes présentes
  await removeAllRecipes();
  RECIPES_DISPLAYED.splice(0, RECIPES_DISPLAYED.length);

  // Si aucun filtre présent, affiche toutes les recette.
  let filterCount = 0;
  FILTERS.forEach((f) => (filterCount += f.applied.length));
  if (filterCount === 0) {
    displayAllRecipes();
  }
  // Ajoute les recettes filtrés
  else {
    await filterAllRecipesWithAllFilters();
  }

  // Update filters lists
  updateFiltersLists(RECIPES_DISPLAYED);

  console.log(`--------------------------------`);
  console.log(`$$$ updateRecipesWithRemovedFilter (${type}, ${filter}) :`);
  console.log(`RECIPES :`);
  console.log(RECIPES_DISPLAYED);
  console.log(`--------------------------------`);
}

async function filterRecipes(type, filter, recipes) {
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    let isFound = false;
    let j = 0;
    switch (type) {
      case "ingredient":
        // Teste si la recette contient l'ingrédient
        while (!isFound && j < recipe.ingredients.length) {
          isFound = recipe.ingredients[j].ingredient === filter;
          j++;
        }
        break;
      case "appliance":
        // Teste si la recette contient l'appareil
        isFound = recipe.appliance === filter;
        break;
      case "ustensil":
        // Teste si la recette contient l'ustensile
        while (!isFound && j < recipe.ustensils.length) {
          isFound = recipe.ustensils[j] === filter;
          j++;
        }
        break;
    }
    // Si le filtre n'est pas présent, suppression de la carte recette du DOM
    if (!isFound) {
      recipe.removeRecipeCard();
    }
    // Si le filtre est présent, ajout à la liste de recettes affichées
    else {
      RECIPES_DISPLAYED.push(recipe);
    }
  }
}

async function filterAllRecipesWithAllFilters() {
  for (let i = 0; i < RECIPES_ALL.length; i++) {
    const recipe = RECIPES_ALL[i];
    let containsAllFilter = true;

    let x = 0;
    while (containsAllFilter && x < FILTERS.length) {
      const filters = FILTERS[x];
      const type = filters.type;
      let j = 0;
      while (containsAllFilter && j < filters.applied.length) {
        let filter = filters.applied[j];
        let isFound = false;
        let k = 0;
        switch (type) {
          case "ingredient":
            // Teste si la recette contient l'ingrédient
            while (!isFound && k < recipe.ingredients.length) {
              isFound = recipe.ingredients[k].ingredient === filter;
              k++;
            }
            break;
          case "appliance":
            // Teste si la recette contient l'appareil
            isFound = recipe.appliance === filter;
            break;
          case "ustensil":
            // Teste si la recette contient l'ustensile
            while (!isFound && k < recipe.ustensils.length) {
              isFound = recipe.ustensils[k] === filter;
              k++;
            }
            break;
        }
        // Si le filtre n'est présent pas présent
        if (!isFound) {
          containsAllFilter = false;
          // Sortie des deux while loop
        }
        j++;
      }
      x++;
    }

    // Si tous les filtres sont présents, affichage de la recette
    if (containsAllFilter) {
      recipe.displayRecipeCard();
      RECIPES_DISPLAYED.push(recipe);
    }
  }
}

async function initMainSearch() {
  searchInput.addEventListener("input", updateRecipes);
}
