$(document).ready(() => {
  /*** Constants & global variables ***/
  const LEFT = 0;
  const TOP = 1;
  const RIGHT = 2;

  /*** Firebase Auth and DB ***/
  const auth = firebase.auth();
  const db = firebase.database();


  $('#datetimepicker12').datetimepicker({
      inline: true, 
      sideBySide: true,
      format: 'DD/MM/YYYY'
  });

  /*** Function definitions ***/
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
            createCard(recipe);
          });
        }
      });
    }
  }

  function createCard(recipe) {
    const backgroundCSS = 'center no-repeat, linear-gradient(rgba(255, 255, 255, 0) 65%, #888)';
    const backgroundSizeCSS = 'auto 100%';
    const card =
      $(`<div class="r-card">
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
      card.on('click', () => window.location.replace(`${window.location.origin}/recipe/${recipe.id}`));

      $('.r-cards-container').prepend(card);
    }
  }

  function removeCard(el) {
    $(el.target).remove();
  }

  function addToFavorites() {
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
        break;
      case TOP:
        $('.r-card:last-child').addClass('r-card-out-top');
        setTimeout(toggleModal("open"), 100);
        break;
      case RIGHT:
        $('.r-card:last-child').addClass('r-card-out-right');
        addToFavorites();
        break;
      default:
    }

    // NOTE: Wait till transition ends to delete it
    $('.r-card:last-child').on('transitionend', (el) => removeCard(el));
    getRandomRecipes(auth.currentUser, 1);
  }

  function toggleModal(action) {
  	if (action == "close") {
  		var dateObj = $('#datetimepicker12').data("DateTimePicker").date();
  		var date = dateObj['_d'].getDate();
  		var month = dateObj['_d'].getMonth()+1;
  		var year = dateObj['_d'].getYear()-100+2000;

  		if (month < 10)
  			month = '0' + month;
  		if (date < 10)
  			date = '0' + date;

  		var meal = $("#meals-tab .active").text().replace(/\s/g,'').toLowerCase();
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

  /*** Get initial "random" recipes ***/
  getRandomRecipes(true, 10);

  /*** Event Handlers ***/
  $('.next-btn').on('click', () => slideCard(LEFT));
  $('.calendar-btn').on('click', () => slideCard(TOP));
  $('.favorites-btn').on('click', () => slideCard(RIGHT));
  $('#save-calendar').on('click', () => toggleModal("close"));
});