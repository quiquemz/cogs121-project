$(document).ready(() => {
  /*** Constants & global variables ***/

  /*** Firebase Auth and DB ***/
  const auth = firebase.auth();
  const db = firebase.database();

  /*** Function definitions ***/
  function loadRecipe() {
    const recipeId = window.location.pathname.replace('/recipe/', '');
    const URL = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${recipeId}/information`;

    $.ajax({
      url: URL,
      type: 'GET',
      dataType: 'json',
      headers: {
        'X-Mashape-Key': 'fE0JDoXOrQmshCwRo1DwJRH2XhXKp1YnYEAjsnBx1IKReJz2Bv'
      },
      success: (data) => {
        createRecipeImageCard(data);
        createRecipeIngredients(data);
        createRecipeInstructions(data);
        console.log(data);
      }
    });
  }

  function createRecipeImageCard(recipe) {
    const backgroundCSS = 'center no-repeat, linear-gradient(rgba(255, 255, 255, 0) 40%, #777)';
    const backgroundSizeCSS = 'auto';
    const imageCard = $(
      `<div class="image-card">
        <div class="image-card-content">
          <div class="image-card-main-content">
            <h5 class="image-card-title">${recipe.title}</h5>
          </div>
          <div class="image-card-secondary-content">
            <span class="image-card-text">${recipe.cuisines.concat(recipe.diets).join(', ')}</span>
            <div class="image-card-time">
              <div class="clock-icon">
                <i class="far fa-clock"></i>
              </div>
              <span class="image-card-text">${recipe.readyInMinutes} mins</span>
            </div>
          </div>
        </div>
      </div>`
    );

    imageCard.css('background', `url(${recipe.image}) ${backgroundCSS}`);
    imageCard.css('background-size', backgroundSizeCSS);
    imageCard.data('recipeTitle', recipe.title);
    imageCard.data('recipeSourceUrl', recipe.sourceUrl);
    imageCard.data('recipeId', recipe.id);

    $('#content').prepend(imageCard);
  }

  function createRecipeIngredients(recipe) {
    const ul = $('<ul></ul>');
    recipe.extendedIngredients.forEach(ingredient => {
      ul.append(`<li>${ingredient.originalString}</li>`);
    });
    $('.ingredients').append(ul)
  }

  function createRecipeInstructions(recipe) {
    const ol = $('<ol></ol>');
    recipe.analyzedInstructions.forEach(instruction => {
      instruction.steps.forEach(stepInfo => {
        ol.append(`<li>${stepInfo.step}</li>`);
      });
    });
    $('.instructions').append(ol)
  }

  /*** Initializer ***/
  loadRecipe();

  /*** Event Handlers ***/

});