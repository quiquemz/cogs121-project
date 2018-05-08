$(document).ready(function() {
  function addFoodItem(meal) {
    const listItem = $(`<li class="list-group-item"></li>`);
    const divName = $(`<div class="name">Fried Eggs</div>`);
    const divAction = $(`<div class="r-btn food-options-btn action"><i class="fa fa-ellipsis-h"></i></div>`);

    $(`.list-${meal}`).append(
      listItem.append(divName).append(divAction)
    );
  }

  $('.add-breakfast-btn').on('click', function() {
    addFoodItem('breakfast');
  });

  $('.add-lunch-btn').on('click', function() {
    addFoodItem('lunch');
  });

  $('.add-dinner-btn').on('click', function() {
    addFoodItem('dinner');
  });

});