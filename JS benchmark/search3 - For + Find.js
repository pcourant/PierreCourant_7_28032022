const recipesDisplayed = [];

for (let i = 0; i < RECIPES_DATABASE.length; i++) {
  const recipe = RECIPES_DATABASE[i];
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

  // Si l'input apparaît quelque part, on affiche la recette
  if (isFound) {
    recipesDisplayed.push(recipe);
  }
}
