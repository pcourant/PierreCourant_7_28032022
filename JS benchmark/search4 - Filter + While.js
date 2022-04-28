const recipesDisplayed = RECIPES_DATABASE.filter((recipe) => {
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

  // Return le test pour la méthode filter et la construction du tableau résultat
  return isFound;
});
