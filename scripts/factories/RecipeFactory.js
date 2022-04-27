export { RECIPES, recipeFactory, getAllRecipes };

const RECIPES = {
  // Tableau contenant tous les objets "recette" de la database du fichier recipes.js
  ALL: [],
  // Recettes issues du résultat de la barre de recherche
  SEARCHED: [],
  // Recettes issues du résultat  du filtrage par tags
  FILTERED: [],
  // Intersection des deux résultats précédents contenant toutes les recettes affichées dans le DOM
  DISPLAYED: [],
};

// Crée l'objet "recette" à partir du fichier DATA
function recipeFactory(data) {
  let {
    id,
    name,
    servings,
    ingredients,
    time,
    description,
    appliance,
    ustensils,
  } = data;

  let recipeCardDOM = undefined;

  // Consrtuit le html de la carte recette
  function constructorRecipeCard() {
    // Création de la colonne contenant une recette
    const divContainer = document.createElement("div");
    divContainer.classList.add("col-12");
    divContainer.classList.add("col-md-6");
    divContainer.classList.add("col-xl-4");

    // Création de l'article
    const article = document.createElement("article");
    divContainer.appendChild(article);
    article.classList.add("card");
    article.classList.add("border-0");
    article.classList.add("bg-light");

    // Anchor tag + image
    const link = document.createElement("a");
    article.appendChild(link);
    link.setAttribute("href", "#");
    // link.classList.add("stretched-link"); TODO
    const imageCardTop = document.createElement("img");
    link.appendChild(imageCardTop);
    imageCardTop.setAttribute("src", "./assets/images/recipe.jpg");
    imageCardTop.setAttribute("alt", name);
    imageCardTop.classList.add("card-img-top");

    // Création du "card body"
    const cardBody = document.createElement("div");
    article.appendChild(cardBody);
    cardBody.classList.add("container");
    cardBody.classList.add("card-body");
    cardBody.classList.add("flex-grow-0");
    cardBody.classList.add("overflow-hidden");
    cardBody.classList.add("p-0");
    cardBody.classList.add("m-0");

    // Création de la rangée "Titre et Temps" --------------------
    const cardBodyTitleTime = document.createElement("div");
    cardBody.appendChild(cardBodyTitleTime);
    cardBodyTitleTime.classList.add("card-body__title-time");
    cardBodyTitleTime.classList.add("row");
    cardBodyTitleTime.classList.add("w-100");
    cardBodyTitleTime.classList.add("m-0");

    // Ajout du titre
    const h2 = document.createElement("h2");
    cardBodyTitleTime.appendChild(h2);
    h2.classList.add("col-8");
    h2.classList.add("card-title");
    h2.classList.add("m-0");
    h2.classList.add("p-0");
    h2.classList.add("fw-normal");
    h2.classList.add("d-inline-block");
    h2.classList.add("align-text-bottom");
    h2.classList.add("overflow-hidden");
    h2.classList.add("text-truncate");
    h2.textContent = name;

    // Création de la colonne "Temps"
    const columnTime = document.createElement("div");
    cardBodyTitleTime.appendChild(columnTime);
    columnTime.classList.add("card-body__time");
    columnTime.classList.add("col-4");
    columnTime.classList.add("p-0");
    columnTime.classList.add("text-end");
    // Ajout de l'icone "Time"
    const iconTime = document.createElement("img");
    columnTime.appendChild(iconTime);
    iconTime.setAttribute("src", "./assets/icons/time.svg");
    iconTime.setAttribute("width", "20px");
    iconTime.setAttribute("height", "20px");
    iconTime.setAttribute("alt", ""); // alt vide car image décorative
    iconTime.setAttribute("aria-hidden", "true");
    iconTime.classList.add("d-inline-block");
    iconTime.classList.add("align-text-bottom");
    // Ajout du temps de la préparation
    const timeParagraph = document.createElement("p");
    columnTime.appendChild(timeParagraph);
    timeParagraph.classList.add("card-text");
    timeParagraph.classList.add("ms-2");
    timeParagraph.classList.add("fw-bold");
    timeParagraph.classList.add("d-inline-block");
    timeParagraph.classList.add("align-text-bottom");
    timeParagraph.textContent = `${time} min`;
    // FIN de la rangée "Titre et Temps" -------------------------------------

    // Création de la rangée "Ingrédients et Instructions" -------------------
    const cardBodyIngredientsInstructions = document.createElement("div");
    cardBody.appendChild(cardBodyIngredientsInstructions);
    cardBodyIngredientsInstructions.classList.add(
      "card-body__ingredients-instructions"
    );
    cardBodyIngredientsInstructions.classList.add("row");
    cardBodyIngredientsInstructions.classList.add("w-100");
    cardBodyIngredientsInstructions.classList.add("m-0");

    // Création de la colonne "Ingrédients"
    const columnIngredients = document.createElement("div");
    cardBodyIngredientsInstructions.appendChild(columnIngredients);
    columnIngredients.classList.add("card-body__recipe__ingredients");
    columnIngredients.classList.add("col");
    columnIngredients.classList.add("m-0");
    // columnIngredients.classList.add("p-0");

    // Ajout des ingrédients
    ingredients.forEach((element) => {
      const ingredientParagraph = document.createElement("p");
      columnIngredients.appendChild(ingredientParagraph);
      ingredientParagraph.classList.add("card-text");
      ingredientParagraph.classList.add("small");
      ingredientParagraph.classList.add("fw-bold");
      ingredientParagraph.classList.add("m-0");
      ingredientParagraph.classList.add("text-truncate");
      ingredientParagraph.textContent = `${element.ingredient}`;

      if (element.quantity !== undefined) {
        ingredientParagraph.textContent += `: `;
        const quantitySpan = document.createElement("span");
        ingredientParagraph.appendChild(quantitySpan);
        quantitySpan.classList.add("fw-normal");
        quantitySpan.textContent = `${element.quantity}`;

        if (element.unit !== undefined) {
          quantitySpan.textContent += ` ${element.unit}`;
        }
      }
    });

    // Création de la colonne "Instructions"
    const columnInstructions = document.createElement("div");
    cardBodyIngredientsInstructions.appendChild(columnInstructions);
    columnInstructions.classList.add("card-body__recipe__instructions");
    columnInstructions.classList.add("col");
    columnInstructions.classList.add("m-0");
    columnInstructions.classList.add("p-0");
    // Ajout des instructions
    const instructionsParagraph = document.createElement("p");
    columnInstructions.appendChild(instructionsParagraph);
    instructionsParagraph.classList.add("card-text");
    instructionsParagraph.classList.add("small");
    instructionsParagraph.classList.add("lh-sm");
    instructionsParagraph.textContent = description;

    //Sauvegarde the DOM element
    this.recipeCardDOM = divContainer;
  }

  // Affiche la carte dans le DOM
  function displayRecipeCard() {
    const recipesContainer = document.querySelector(".recipes-section .row");
    if (this.recipeCardDOM !== undefined) {
      recipesContainer.appendChild(this.recipeCardDOM);
    }
  }

  // Supprime la carte du DOM
  function removeRecipeCard() {
    const recipesContainer = document.querySelector(".recipes-section .row");
    if (this.recipeCardDOM !== undefined) {
      recipesContainer.removeChild(this.recipeCardDOM);
    }
  }

  // Return l'objet recette
  return {
    id,
    name,
    servings,
    ingredients,
    time,
    description,
    appliance,
    ustensils,
    recipeCardDOM,
    constructorRecipeCard,
    displayRecipeCard,
    removeRecipeCard,
  };
}

// Récupère toutes les recettes du fichier DATA et les construit
async function getAllRecipes(recipesDATA) {
  recipesDATA.forEach((recipeDATA) => {
    // Construit l'objet
    const recipe = recipeFactory(recipeDATA);
    // Construit le carte DOM
    recipe.constructorRecipeCard();
    // Sauvegarde la recette dans les tableaux
    RECIPES.ALL.push(recipe);
    RECIPES.SEARCHED.push(recipe);
    RECIPES.FILTERED.push(recipe);
  });
}
