$(document).ready(() => {
  /*** Constants & global variables ***/
  const LEFT = 0;
  const UP = 1;
  const RIGHT = 2;

  /*** Firebase Auth and DB ***/
  const auth = firebase.auth();
  const db = firebase.database();

  /*** Function definitions ***/

  function getRandomRecipes(user, ammount) {
    if (user) {
      $.ajax({
        url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=false&number=${ammount}`,
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
            <div class="r-btn">
              <i class="fa fa-info-circle"></i>
            </div>
          </div>
          <div class="r-card-secondary-content">
            <span class="r-card-text">${recipe.cuisines.join(', ')}</span>
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
      card.data('recipe', recipe);
      $('.r-cards-container').prepend(card);
    }
  }

  function removeCard(el) {
    $(el.target).remove();
  }

  function slideCard(direction) {
    $('.r-card:last-child').addClass('r-card-out');	

    switch (direction) {
      case 0:
        $('.r-card:last-child').addClass('r-card-out-rl');
        break;
      case 1:
        $('.r-card:last-child').addClass('r-card-out-bu');
        break;
      case 2:
        $('.r-card:last-child').addClass('r-card-out-lr');
        firebase.auth().onAuthStateChanged((user) => {
		  if (user) {
		  	db.ref('users/' + user.uid).child('favoriteRecipes').push({'recipeName': 'link'});
		  }
		});
        break;
      default:
    }
    $('.r-card:last-child').on('transitionend', (el) => removeCard(el));

    getRandomRecipes(auth.currentUser, 1);

  }

  /*** Get initial "random" recipes ***/
  getRandomRecipes(true, 10);

  /*** Event Handlers ***/
  $('.next-btn').on('click', () => slideCard(LEFT));
  $('.calendar-btn').on('click', () => slideCard(UP));
  $('.favorites-btn').on('click', () => slideCard(RIGHT));
});