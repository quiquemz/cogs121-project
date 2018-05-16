$(document).ready(function() {

  /*** Firebase Auth and DB ***/
  const auth = firebase.auth();
  const db = firebase.database();

  /*** Function definitions ***/
  function addFoodItem(meal, food) {

    console.log(food);

    const listItem =
      `<li class="list-group-item">
        <div class="name">` + food + `</div>
        <div class="r-btn food-options-btn action"><i class="fa fa-ellipsis-h"></i></div>
      </li>`

    $(`.list-${meal}`).append(listItem);
    $('#myModal').modal('toggle');
  }

  function getFavoriteRecipes(type) {

    var user = firebase.auth().currentUser;
    
    if(user) {

      // Get user database snapshot
      var userref = firebase.database().ref().child('users/' + user.uid);
      userref.once("value", function(snapshot) {

        var recipeSnapshot = snapshot.child("favoriteRecipes");
        var recipes = recipeSnapshot.val();

        // Iterate through favorite recipes and add to array
        $('#myModalList').empty();
        for(recipe in recipes) {
          $('#myModalList').append('<li class="list-group-item" id="' + recipe + '">' + recipes[recipe] + '</li>');
          const food = recipes[recipe];
          $('#' + recipe).on('click', () => addFoodItem(type, food));
        }

      });

    }

    $('#myModal').modal('toggle');

  }

  function toggleModal(type) {

    // Get user's favorite recipes
    getFavoriteRecipes(type);

    /*
    console.log("1");
    console.log(favoriteRecipes);
    console.log("2");

    // Show the modal
    $('#myModal').modal('toggle');

    if(type == "breakfast") {


    } else if(type == "lunch") {


    } else if(type == "dinner") {


    }
    */

  }



  /*** Event Handlers ***/

  /*
  $('.add-breakfast-btn').on('click', () => addFoodItem('breakfast'));
  $('.add-lunch-btn').on('click', () => addFoodItem('lunch'));
  $('.add-dinner-btn').on('click', () => addFoodItem('dinner'));
  */
  $('.add-breakfast-btn').on('click', () => toggleModal('breakfast'));
  $('.add-lunch-btn').on('click', () => toggleModal('lunch'));
  $('.add-dinner-btn').on('click', () => toggleModal('dinner'));

  $('.day-btn').on('click', (e) => {
    $('.week-days').find('.active').removeClass('active');
    $(e.target).addClass('active');
  })
});