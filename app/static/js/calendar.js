$(document).ready(function() {
  /*** Firebase Auth and DB ***/
  const auth = firebase.auth();
  const db = firebase.database();

  /*** Function definitions ***/
  function addFoodItem(meal) {
    const listItem =
      `<li class="list-group-item">
        <div class="name">Fried Eggs</div>
        <div class="r-btn food-options-btn action"><i class="fa fa-ellipsis-h"></i></div>
      </li>`

    $(`.list-${meal}`).append(listItem);
  }

  /*** Event Handlers ***/
  $('.add-breakfast-btn').on('click', () => addFoodItem('breakfast'));
  $('.add-lunch-btn').on('click', () => addFoodItem('lunch'));
  $('.add-dinner-btn').on('click', () => addFoodItem('dinner'));

});