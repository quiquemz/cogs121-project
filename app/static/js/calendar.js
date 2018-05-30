$(document).ready(function() {
  /*** Global and Constant Variables ***/
  const WEEK_DESCRIPTION = 'D MMM'; // Formats to display moment
  const LONG_WEEK_DAY = 'dddd';
  const DB_DATE = 'MM-DD-YYYY';

  const currentMoment = moment(); // To track current date

  /*** Firebase Auth and DB ***/
  const auth = firebase.auth();
  const db = firebase.database();

  /*** Function definitions ***/
  function setWeek(week) {
    if (week === 'prev') {
      currentMoment.subtract(1, 'week');
    } else if (week === 'next') {
      currentMoment.add(1, 'week');
    }
    setWeekName();
    setWeekStartDay();
    setWeekEndDay();
    setCurrentWeekDay();
  }

  function setWeekName() {
    const m = moment();
    if (currentMoment.isSame(m, 'isoWeek')) {
      $('.week-name').html('<h5>This Week</h5>');
    } else if (currentMoment.isBefore(m, 'isoWeek')) {
      $('.week-name').html(`<h5>${m.diff(currentMoment, 'weeks')} Weeks Ago</h5>`);
    } else {
      // HACK: added 1 mannualy... double check
      $('.week-name').html(`<h5>${currentMoment.diff(m, 'weeks') + 1} Weeks After</h5>`);
    }
  }

  function setWeekStartDay() {
    const cmCopy = currentMoment.clone(); // moment() is mutable
    $('.week-start-day').html(cmCopy.isoWeekday(1).format(WEEK_DESCRIPTION));
  }

  function setWeekEndDay() {
    const cmCopy = currentMoment.clone(); // moment() is mutable
    $('.week-end-day').html(cmCopy.isoWeekday(7).format(WEEK_DESCRIPTION));
  }

  function setCurrentWeekDay(evnt) {
    // set the current moment from evnt
    if (evnt) {
      currentMoment.isoWeekday($(evnt.target).attr('id'));
    }

    // Change the active week day row (e.g. M, T, W, etc.)
    $('.week-days').find('.active').removeClass('active');
    $(`#${currentMoment.format(LONG_WEEK_DAY)}`).addClass('active');

    // Set the active day text (e.g. Monday, Tuesday, etc.)
    $('.active-day').html(currentMoment.format(LONG_WEEK_DAY));
    getCalendarFromDB();
  }

  function addRecipeItem(meal, name) {
    const listItem =
      `<li class="list-group-item ${meal}-recipe">
        <div class="name">${name}</div>
        <div class="r-btn food-options-btn action"><i class="fa fa-ellipsis-h"></i></div>
      </li>`

    $(`.list-${meal}`).append(listItem);
    $('#myModal').modal('toggle');
  }

  function getCalendarFromDB() {
    if (auth.currentUser) {
      clearMealsRecipes();

      db.ref(`/users/${auth.currentUser.uid}/calendar/${currentMoment.format(DB_DATE)}`).once('value', res => {
        const meals = res.val();
        if (meals) {
          Object.keys(meals).forEach(meal => {
            const recipes = meals[meal];
            Object.keys(recipes).forEach(id => {
              const name = recipes[id];
              addRecipeItem(meal, name);
            })
          })
        }
      });
    }
  }

  function addRecipeItemToDB(id, recipeObj, mealType) {
    var date = $(currentMoment.format(DB_DATE)).selector;
    db.ref('users/' + auth.currentUser.uid)
                .child('calendar')
                .child(date)
                .child(mealType)
                .update({
                  [id]: recipeObj[id]
                });
    $('#myModal').modal('toggle');
  }

  function getFavoriteRecipesFromDB(mealType) {
    if (auth.currentUser) {
      $('#myModalList').empty();

      // Get user database snapshot
      db.ref(`/users/${auth.currentUser.uid}/favoriteRecipes`).once("value", res => {
        const recipes = res.val();
        if (recipes) {
          // Iterate through favorite recipes and add to array
          Object.keys(recipes).forEach(id => {
              $('#myModalList').append(`<li class="list-group-item" id="${id}">${recipes[id]}</li>`);
              $('#' + id).on('click', () => addRecipeItemToDB(id, recipes, mealType));
            });
        }
        else {
          $('.input-group').hide();
          $('#myModalList').append(`You have no favorite recipes`);
        }
      });
      $('#myModal').modal('toggle');
    }
  }

  function clearMealsRecipes() {
    $('.breakfast-recipe').remove();
    $('.lunch-recipe').remove();
    $('.dinner-recipe').remove();
  }

  function toggleModal(type) {
    // Get user's favorite recipes
    getFavoriteRecipesFromDB(type);
  }

  /*** Initializers ***/
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      setWeek();
    }
  });

  /*** Event Handlers ***/
  $('.add-breakfast-btn').on('click', () => toggleModal('breakfast'));
  $('.add-lunch-btn').on('click', () => toggleModal('lunch'));
  $('.add-dinner-btn').on('click', () => toggleModal('dinner'));

  $('.prev-week-btn').on('click', () => setWeek('prev'));
  $('.next-week-btn').on('click', () => setWeek('next'));

  $('.day-btn').on('click', (evnt) => setCurrentWeekDay(evnt));

  $('#calendar-discover-more').on('click', () => { window.location.href = 'index.html' });
});