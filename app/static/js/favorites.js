$(document).ready(function() { 

/*** Firebase Auth and DB ***/
const auth = firebase.auth();
const db = firebase.database();

function viewRecipe(recipeId) {
  return function() {
    window.location.href = '/recipe/' + recipeId + '?favorites';
  }
}

function initializeFavorites() {
  if (auth.currentUser) {
    $('#myList').empty();

    // Get user database snapshot
    db.ref(`/users/${auth.currentUser.uid}/favoriteRecipes`).once("value", res => {
      const recipes = res.val();

    console.log(recipes);

    var recipeList = Object.keys(recipes);

    for (let i = 0; i < recipeList.length; i++) {
      loadRecipe(recipeId);
      var recipeId = recipeList[i];
      var recipeTitle = recipes[recipeId];
      
      //$('#myList').append(`<li class="list-group-item" id="${recipeId}">${recipeTitle}</li>`);
      //$('#' + recipeId).click(viewRecipe(recipeId));
    }
    });
  }
}


function loadRecipe(recipeId) {
  const URL = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${recipeId}/information`;

  $.ajax({
    url: URL,
    type: 'GET',
    dataType: 'json',
    headers: {
      'X-Mashape-Key': 'fE0JDoXOrQmshCwRo1DwJRH2XhXKp1YnYEAjsnBx1IKReJz2Bv'
    },
    success: (data) => {
      createRecipeListItem(data);
      console.log(data);
    }
  });
}

function createRecipeListItem(recipe) {
  const backgroundCSS = 'center no-repeat, linear-gradient(rgba(255, 255, 255, 0) 40%, #777)';
  const backgroundSizeCSS = 'auto';
  const imageCard = $(
    `<div class="image-card" id="${recipe.id}">
      <div class="image-card-content">
        <div class="image-card-main-content">
          <h6 class="image-card-title">${recipe.title}</h6>
        </div>
      </div>
    </div>`
  );

  imageCard.css('background', `url(${recipe.image}) ${backgroundCSS}`);
  imageCard.css('background-size', backgroundSizeCSS);
  imageCard.data('recipeTitle', recipe.title);
  imageCard.data('recipeSourceUrl', recipe.sourceUrl);
  imageCard.data('recipeId', recipe.id);
  $('#cuisine').css('text-transform', 'capitalize');
  $('.container').prepend(imageCard);
  $('#' + recipe.id).on('click', viewRecipe(recipe.id));
}

  /*** Initializers ***/
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    initializeFavorites();
  }
});

});