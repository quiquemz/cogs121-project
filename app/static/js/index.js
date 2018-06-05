$(document).ready(() => {
  /*** Constants & global variables ***/
  const LEFT = 0;
  const TOP = 1;
  const RIGHT = 2;
  const IN = 3;
  const OUT = 4;

  /*** Firebase Auth and DB ***/
  const auth = firebase.auth();
  const db = firebase.database();

  /*** Function definitions ***/
  function initializeIndexView() {
    try {
      const recipe = JSON.parse(localStorage.getItem('currentRecipe'));

      $('.r-cards-container').append(createCard(recipe, IN));
      getRandomRecipes(true, 9);

      localStorage.setItem("currentRecipe", "");
      localStorage.setItem("removedRecipes", "[]");
    } catch (error) {
      getRandomRecipes(true, 10);
    }
  }

  function getRandomRecipes(user, ammount) {
    const URL = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=false&number=${ammount}`;

    if (user) {
      $.ajax({
        url: URL,
        type: 'GET',
        dataType: 'json',
        headers: {
          'X-Mashape-Key': 'fE0JDoXOrQmshCwRo1DwJRH2XhXKp1YnYEAjsnBx1IKReJz2Bv'
        },
        success: (data) => {
          data.recipes.forEach(recipe => {
            const card = createCard(recipe, IN);

            if (card) {
              $('.r-cards-container').prepend(card);
            }
          });
        }
      });
    }
  }

  function createCard(recipe, initialPosition) {
    const backgroundCSS = 'center no-repeat, linear-gradient(rgba(255, 255, 255, 0) 65%, #888)';
    const backgroundSizeCSS = 'auto 100%';
    const rCardPositionCSS = (initialPosition === IN) ? 'r-card-in' : 'r-card-out-left';
    const card =
      $(`<div class="r-card ${rCardPositionCSS}">
        <div class="r-card-content">
          <div class="r-card-main-content">
            <h5 class="r-card-title">${recipe.title}</h5>
            <div class="r-btn detail-btn">
              <i class="fa fa-info-circle"></i>
            </div>
          </div>
          <div class="r-card-secondary-content">
            <span class="r-card-text">${recipe.cuisines.concat(recipe.diets).join(', ')}</span>
            <div class="r-card-time">
              <div class="clock-icon">
                <i class="far fa-clock"></i>
              </div>
              <span class="r-card-text">${recipe.readyInMinutes} mins</span>
            </div>
          </div>
        </div>
      </div>`);

    if (recipe.image) {
      card.css('background', `url(${recipe.image}) ${backgroundCSS}`);
      card.css('background-size', backgroundSizeCSS);

      card.data('recipeTitle', recipe.title);
      card.data('recipeSourceUrl', recipe.sourceUrl);
      card.data('recipeId', recipe.id);
      card.data('recipeImage', recipe.image);
      card.data('recipeCuisines', recipe.cuisines);
      card.data('recipeDiets', recipe.diets);
      card.data('recipeReadyInMinutes', recipe.readyInMinutes);

      card.on('click', () => {
        window.location.replace(`${window.location.origin}/recipe/${recipe.id}`);
        localStorage.setItem("currentRecipe", JSON.stringify({
          title: recipe.title,
          sourceUrl: recipe.sourceUrl,
          id: recipe.id,
          image: recipe.image,
          cuisines: recipe.cuisines,
          diets: recipe.diets,
          readyInMinutes: recipe.readyInMinutes
        }));
      });

      return card;
    }
  }

  function removeFirstCard() {
    const removedRecipes = JSON.parse(localStorage.getItem("removedRecipes"));
    const card = $('.r-card:last-child');

    removedRecipes.push({
      title: card.data('recipeTitle'),
      sourceUrl: card.data('recipeSourceUrl'),
      id: card.data('recipeId'),
      image: card.data('recipeImage'),
      cuisines: card.data('recipeCuisines'),
      diets: card.data('recipeDiets'),
      readyInMinutes: card.data('recipeReadyInMinutes')
    });

    localStorage.setItem('removedRecipes', JSON.stringify(removedRecipes)); // removing from local storage
    $('.r-card:last-child').remove(); // removing from DOM
  }

  function restoreRemovedCard() {
    const removedRecipes = JSON.parse(localStorage.getItem("removedRecipes"));

    if (removedRecipes.length > 0) {
      const recipe = removedRecipes.pop();
      const card = createCard(recipe, OUT);

      if (card) {
        $('.r-cards-container').append(card);

        // HACK: Needed so that it waits for append to finish and the animation applies.
        setTimeout(() => {
          card.removeClass('r-card-out-left');
          card.addClass('r-card-in');
        }, 1);

        localStorage.setItem('removedRecipes', JSON.stringify(removedRecipes));
      } else {
        alert('Server error.');
      }

    } else {
      alert('Nothing to restore.');
    }
  }

  function addToFavoritesDB() {
    if (auth.currentUser) {
      const recipeTitle = $('.r-card:last-child').data('recipeTitle');
      const recipeId = $('.r-card:last-child').data('recipeId');

      db.ref('users/' + auth.currentUser.uid)
        .child('favoriteRecipes')
        .update({
          [recipeId]: recipeTitle
        });
    }
  }

  function slideCard(direction) {
    const user = auth.currentUser;
    $('.r-card:last-child').addClass('r-card-out');

    switch (direction) {
      case LEFT:
        $('.r-card:last-child').addClass('r-card-out-left');
        // NOTE: Wait till transition ends to delete it
        $('.r-card:last-child').on('transitionend', () => removeFirstCard());
        break;
      case TOP:
        $('.r-card:last-child').addClass('r-card-out-top');
        // NOTE: Wait till transition ends to open modal it
        $('.r-card:last-child').on('transitionend', () => toggleModal("open"));
        break;
      case RIGHT:
        $('.r-card:last-child').addClass('r-card-out-right');
        // NOTE: Wait till transition ends to delete it
        $('.r-card:last-child').on('transitionend', () => removeFirstCard());
        addToFavoritesDB();
        break;
      default:
    }

    getRandomRecipes(auth.currentUser, 1);
  }

  function toggleModal(action) {
    if (action == "close") {
      var dateObj = $('#datetimepicker12').data("DateTimePicker").date();
      var date = dateObj['_d'].getDate();
      var month = dateObj['_d'].getMonth() + 1;
      var year = dateObj['_d'].getYear() - 100 + 2000;

      if (month < 10)
        month = '0' + month;
      if (date < 10)
        date = '0' + date;

      var meal = $("#meals-tab .active").text().replace(/\s/g, '').toLowerCase();
      var firebaseDateObj = "" + month + "-" + date + "-" + year;

      const recipeTitle = $('.r-card:last-child').data('recipeTitle');
      const recipeId = $('.r-card:last-child').data('recipeId');

      if (auth.currentUser) {
        db.ref('users/' + auth.currentUser.uid)
          .child('calendar')
          .child(firebaseDateObj)
          .child(meal)
          .update({
            [recipeId]: recipeTitle
          })
      };
    }
    $('#myModal').modal('toggle');
  }

  /*** Initializer ***/
  initializeIndexView();

  /*** Event Handlers ***/
  $('#datetimepicker12').datetimepicker({
    inline: true,
    sideBySide: true,
    format: 'DD/MM/YYYY'
  });
  $('.next-btn').on('click', () => slideCard(LEFT));
  $('.calendar-btn').on('click', () => slideCard(TOP));
  $('.favorites-btn').on('click', () => slideCard(RIGHT));
  $('.restore-recipe-btn').on('click', () => restoreRemovedCard());
  $('#save-to-calendar-btn').on('click', () => {
    toggleModal("close");
    removeFirstCard();
  });

});