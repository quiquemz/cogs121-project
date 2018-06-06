/*
  File: grocery_list.js
  Author: Saul Mendez, Akanksha Kevalramani, Adam Abadilla
  Description: This file is to handle the events that occur on the grocery_list.
  This file should only be invoked by the grocery_list view. It contains the
  necessary code to access the user, the DB, and to retrieve the recipes saved on
  a specific week/day.
*/

$(document).ready(() => {

  /*** Global and Constant Variables ***/
  const WEEK_DESCRIPTION = 'D MMM'; // Formats to display moment
  const LONG_WEEK_DAY = 'dddd, MMMM D';
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

  function getCalendarIngredients() {
    db.ref(`/users/${auth.currentUser.uid}/favoriteRecipes`).once('value',
      function(snapshot) {

        ingredientsMap = {}

        snapshot.forEach(function(child) {

          var key = child.key;
          if (key.endsWith("Ingredients")) {

            var ingredientList = child.val();
            var i;
            for (i = 0; i < ingredientList.length; i++) {

              // Array containing name and quantity from db
              var thisIngredient = ingredientList[i];

              // Ingredient name
              var type = thisIngredient[0];

              // Quantity and Units
              var formattedQuantity = thisIngredient[1] + " " + thisIngredient[2];

              // Append to grocery list
              ingredientsMap[type] = formattedQuantity;

            }
          }
        });

        // Add to webpage
        Object.keys(ingredientsMap).forEach(function(key) {
          $(".grocery-list").append('<li class="list-group-item">' + key + ' (' + ingredientsMap[key] + ')</li>');
        })

      });

  }

  /*** Initializers ***/
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      setWeek();
      getCalendarIngredients();
    }
  });

  /*** Event Handlers ***/
  $('.prev-week-btn').on('click', () => setWeek('prev'));
  $('.next-week-btn').on('click', () => setWeek('next'));

});