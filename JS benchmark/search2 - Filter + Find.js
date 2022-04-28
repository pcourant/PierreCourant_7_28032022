const recipesDisplayed = RECIPES_DATABASE.filter((recipe) => {
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
    }
  }

  // Return le test pour la méthode filter et la construction du tableau résultat
  return isFound;
});
