import {
  RECIPES,
  displayRecipe,
  removeAllRecipesFromDOM,
} from "../factories/RecipeFactory.js";
import {
  TYPES,
  FILTERS,
  displayDropdownMenuFilters,
  removeDropdownMenuFilters,
  updateDropdownMenus,
} from "../factories/FilterFactory.js";

export {
  updateRecipesWithNewTag,
  updateRecipesWithRemovedTag,
  initFiltersSearch,
};

async function initFiltersSearch() {
  // Pour chaque type de filtres ...
  FILTERS.forEach((filtersLists) => {
    // Ajout de l'event listener de la fermeture du dropdown menu
    const dropdownButton = document.getElementById(
      `${filtersLists.type}DropdownButton`
    );
    dropdownButton.addEventListener(
      "hidden.bs.dropdown",
      resetSearchFiltersInput
    );

    // Ajout de l'event listener de la barre recherche du dropdown menu
    const filtersSearchInput = document.getElementById(
      `${filtersLists.type}s-search`
    );
    filtersSearchInput.addEventListener("input", updateFilters);
  });

  // -----------------------------------------------------------------------
}

async function updateFilters(e) {
  e.preventDefault();
  const input = e.target.value;
  const type = e.target.dataset.type;

  // Supprime tous les filtres du DOM
  await removeDropdownMenuFilters(type);

  // Recherche des filtres à partir de l'input
  const updatedFilterList = await searchFilters(input, type);
  // Affichage des filtres recherchés
  displayDropdownMenuFilters(type, updatedFilterList);

  console.log(`--------------------------------`);
  console.log(`$$$ updateFilters (${input} / ${type}) :`);
  console.log(updatedFilterList);
  console.log(`--------------------------------`);
}

async function searchFilters(input, type) {
  // Création de la liste de résultat
  const updatedFilterList = [];

  const dropdownMenuFilters = FILTERS.find(
    (filtersLists) => filtersLists.type === type
  ).dropdownMenu;

  for (let i = 0; i < dropdownMenuFilters.length; i++) {
    const filter = dropdownMenuFilters[i];
    let isFound = false;

    // Teste si le nom du filtre contient l'input
    isFound = filter.name.toLowerCase().includes(input.toLowerCase());

    if (isFound) {
      updatedFilterList.push(filter);
    }
  }
  return updatedFilterList;
}

// Reset la barre de recherche lorsque le dropdown menu est fermé
async function resetSearchFiltersInput(e) {
  const type = e.target.dataset.type;
  document.getElementById(`${type}s-search`).value = "";
}

// -----------------------------------------------------------------------------------
// Mis à jour des recettes affichées en fonction des tags

async function updateRecipesWithNewTag(tag) {
  // Reset filtered result
  const recipesToFilter = RECIPES.FILTERED.splice(0, RECIPES.FILTERED.length);
  // Efface les recettes affichées
  removeAllRecipesFromDOM();

  await filterAndDisplay(
    tag,
    recipesToFilter,
    RECIPES.SEARCHED,
    RECIPES.FILTERED
  );

  // Update filters dropdown menus
  updateDropdownMenus(RECIPES.DISPLAYED);

  console.log(`--------------------------------`);
  console.log(`$$$ updateRecipesWithNewTag (${tag.type}, ${tag.name}) :`);
  console.log(`RECIPES :`);
  console.log(RECIPES.DISPLAYED);
  console.log(`--------------------------------`);
}

async function updateRecipesWithRemovedTag(tag, tags) {
  console.log(
    `$$$ updateRecipesWithRemovedTag ${tag.type}, ${tag.name} : `,
    tag
  );

  // Retire le tag de la liste des tags
  tags.splice(tags.indexOf(tag), 1);

  // Reset filtered result
  RECIPES.FILTERED = [];
  // Efface toutes les recettes affichées
  await removeAllRecipesFromDOM();

  // Récupère les recettes filtrées
  await filterAllTagsAndDisplay(
    RECIPES.ALL,
    RECIPES.SEARCHED,
    RECIPES.FILTERED
  );

  // Update filters lists
  updateDropdownMenus(RECIPES.DISPLAYED);

  console.log(`RECIPES.DISPLAYED :`);
  console.log(RECIPES.DISPLAYED);
  console.log(`--------------------------------`);
}

// Filtre les recettes déjà filtrées avec le nouveau Tag et les affiche
async function filterAndDisplay(
  tag,
  recipesALL,
  recipesSEARCHED,
  recipesFILTERED
) {
  console.log(`filterAndDisplay tag: `, tag);
  console.log(`recipesALL: `, recipesALL);
  console.log(`recipesSEARCHED: `, recipesSEARCHED);
  console.log(`recipesFILTERED: `, recipesFILTERED);

  // Pour chaque recette de la liste passée en argument
  for (let r = 0; r < recipesALL.length; r++) {
    const recipe = recipesALL[r];
    let tagIsFound = false;
    let i = 0;
    let u = 0;

    // on vérifie que le tag est présent
    switch (tag.type) {
      case FILTERS[TYPES.INGREDIENT].type:
        // Teste si la recette contient l'ingrédient
        while (!tagIsFound && i < recipe.ingredients.length) {
          // console.log();
          tagIsFound = recipe.ingredients[i].ingredient === tag.name;
          i++;
        }
        break;
      case FILTERS[TYPES.APPLIANCE].type:
        // Teste si la recette contient l'appareil
        tagIsFound = recipe.appliance === tag.name;
        break;
      case FILTERS[TYPES.USTENSIL].type:
        // Teste si la recette contient l'ustensile
        while (!tagIsFound && u < recipe.ustensils.length) {
          tagIsFound = recipe.ustensils[u] === tag.name;
          u++;
        }
        break;
    }

    // Si le tag est présent, ajout à la liste de recettes filtrées
    if (tagIsFound) {
      recipesFILTERED.push(recipe);

      // Si la recette est aussi dans le tableau des recettes recherchées
      if (recipesSEARCHED.includes(recipe)) {
        // Affichage de la recette
        displayRecipe(recipe);
      }
    }
  }

  console.log(`recipesFILTERED: `, recipesFILTERED);
  console.log(`RECIPES-DISPLAYED: `, RECIPES.DISPLAYED);
}

// Filtre toutes les recettes avec les Tags et les affiche
async function filterAllTagsAndDisplay(
  recipesALL,
  recipesSEARCHED,
  recipesFILTERED
) {
  // Pour chaque recette ...
  for (let r = 0; r < recipesALL.length; r++) {
    const recipe = recipesALL[r];

    // On suppose que la recette contient tous les tags.
    let containsAllTags = true;

    // Et si un seul tag n'est pas présent on passe à la recette suivante
    let filtersList = 0;
    while (containsAllTags && filtersList < FILTERS.length) {
      const filters = FILTERS[filtersList];
      const type = filters.type;
      let tag = 0;
      while (containsAllTags && tag < filters.tags.length) {
        let filter = filters.tags[tag];
        let tagIsFound = false;
        let i = 0;
        let u = 0;
        switch (type) {
          case FILTERS[TYPES.INGREDIENT].type:
            // Teste si la recette contient l'ingrédient
            while (!tagIsFound && i < recipe.ingredients.length) {
              tagIsFound = recipe.ingredients[i].ingredient === filter.name;
              i++;
            }
            break;
          case FILTERS[TYPES.APPLIANCE].type:
            // Teste si la recette contient l'appareil
            tagIsFound = recipe.appliance === filter.name;
            break;
          case FILTERS[TYPES.USTENSIL].type:
            // Teste si la recette contient l'ustensile
            while (!tagIsFound && u < recipe.ustensils.length) {
              tagIsFound = recipe.ustensils[u] === filter.name;
              u++;
            }
            break;
        }
        // Si le tag n'est pas présent
        if (!tagIsFound) {
          containsAllTags = false;
          // Sortie des deux while loop
        }
        tag++;
      }
      filtersList++;
    }

    // Si tous les filtres sont présents, ajout à la liste de recettes filtrées
    if (containsAllTags) {
      recipesFILTERED.push(recipe);

      // Si la recette est aussi dans le tableau des recettes recherchées
      if (recipesSEARCHED.includes(recipe)) {
        // Affichage de la recette
        displayRecipe(recipe);
      }
    }
  }
}
