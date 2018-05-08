$(document).ready(() => {
  function createRecipeCards(recipes) {
    const imageBaseUrl = 'https://spoonacular.com/recipeImages/'

    // TODO check for empty array
    recipes.forEach((recipe) => {
      const colWidth = $('<div class="col-sm-6 col-md-4"></div>');
      const card = $('<div class="card"></div>');
      const cardImg = $('<img class="card-img-top" src="' + imageBaseUrl + recipe.image + '" alt="Card image cap">');
      const cardBody = $('<div class="card-body"></div>');
      const cardTitle = $('<h5 class="card-title">' + recipe.title + '</h5>');
      const cardBodyText = $('<p class="card-text">Instructions under construction. API is not sending them in response</p>');
      const cardFooter = $('<div class="card-footer"></div>');
      const cardPrepTime = $('<span class="card-text float-left">' + recipe.readyInMinutes + ' mins' + '</span>');
      const cardStar = $('<div class="r-btn close-sidebar-btn float-right"><i class="fa fa-star"></i></div>');

      $('.cards-deck').append(
        colWidth.append(
          card.append(cardImg).append(
            cardBody.append(cardTitle) //.append(cardBodyText)
          ).append(
            cardFooter.append(cardPrepTime).append(cardStar)
          )
        )
      );
    });
  }

  $('.search-recipe-btn').on('click', () => {

    var filter = $('.search-box').val(); // get the value of the input, which we filter on

    if (filter) {
      const cards = $('.card-title');
      cards.each((count, e) => {
        if (e.textContent.toLowerCase().includes(filter)) {
          $(e).parent().parent().show();
        } else {
          $(e).parent().parent().hide();
        }
      });
    } else {
      $('.card').show();
    }
  });

  $.ajax({
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?query=burger',
    type: 'GET',
    headers: {
      "X-Mashape-Key": "fE0JDoXOrQmshCwRo1DwJRH2XhXKp1YnYEAjsnBx1IKReJz2Bv"
    },
    dataType: 'json',
    success: (data) => {
      createRecipeCards(data.results);
    }
  });
});