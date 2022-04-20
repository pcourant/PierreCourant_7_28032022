import { RECIPES_DATABASE } from "../data/recipes.js";
import { RECIPES_DISPLAYED } from "../components/recipesSearch.js";
export {
  RECIPES_ALL,
  initRecipes,
  getAllRecipes,
  displayAllRecipes,
  removeAllRecipes,
};

const RECIPES_ALL = [];

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
    link.classList.add("stretched-link");
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

    // Création de la colonne "Titre"
    const columnTitle = document.createElement("div");
    cardBodyTitleTime.appendChild(columnTitle);
    columnTitle.classList.add("col-8");
    columnTitle.classList.add("p-0");
    // Ajout du titre
    const h2 = document.createElement("h2");
    columnTitle.appendChild(h2);
    h2.classList.add("col");
    h2.classList.add("card-title");
    h2.classList.add("m-0");
    h2.classList.add("p-0");
    h2.classList.add("fw-normal");
    h2.classList.add("d-inline-block");
    h2.classList.add("align-text-bottom");
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
    columnIngredients.classList.add("col");
    columnIngredients.classList.add("m-0");
    columnIngredients.classList.add("p-0");
    // Ajout des ingrédients
    ingredients.forEach((element) => {
      const ingredientParagraph = document.createElement("p");
      columnIngredients.appendChild(ingredientParagraph);
      ingredientParagraph.classList.add("card-text");
      ingredientParagraph.classList.add("small");
      ingredientParagraph.classList.add("fw-bold");
      ingredientParagraph.classList.add("m-0");
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
    // Ajout des instrcutions
    const instructionsParagraph = document.createElement("p");
    columnInstructions.appendChild(instructionsParagraph);
    instructionsParagraph.classList.add("card-text");
    instructionsParagraph.classList.add("small");
    instructionsParagraph.classList.add("lh-sm");
    instructionsParagraph.textContent = description;

    //Sauvegarde the DOM element
    this.recipeCardDOM = divContainer;

    return divContainer;
  }

  function displayRecipeCard() {
    const recipesContainer = document.querySelector(".recipes-section .row");
    if (this.recipeCardDOM !== undefined) {
      recipesContainer.appendChild(this.recipeCardDOM);
    }
  }

  function removeRecipeCard() {
    const recipesContainer = document.querySelector(".recipes-section .row");
    if (this.recipeCardDOM !== undefined) {
      recipesContainer.removeChild(this.recipeCardDOM);
      // console.log("removeRecipeCard : ", this.recipeCardDOM);
    }
  }

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

async function getAllRecipes(recipesDATA) {
  recipesDATA.forEach((recipeDATA) => {
    const recipe = recipeFactory(recipeDATA);
    recipe.constructorRecipeCard();
    RECIPES_ALL.push(recipe);
  });
}

async function displayAllRecipes() {
  RECIPES_ALL.forEach((recipe) => {
    recipe.displayRecipeCard();
    RECIPES_DISPLAYED.push(recipe);
  });
}

async function removeAllRecipes() {
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
}

async function initRecipes() {
  // Récupère les recettes du fichier DATA
  await getAllRecipes(RECIPES_DATABASE);
  // Affiche les recettes
  displayAllRecipes();
}
