$(document).ready(() => {
  /*** Constants ***/
  const LEFT = 0;
  const UP = 1;
  const RIGHT = 2;

  /*** Firebase Auth and DB ***/
  const auth = firebase.auth();
  const db = firebase.database();

  /*** Function definitions ***/
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
        break;
      default:
    }
  }

  function removeCard(el) {
    if ($(el.target).hasClass('r-card-out')) {
      $(el.target).remove();
    }
  }

  /*** Event Handlers ***/
  $('.next-btn').on('click', () => slideCard(LEFT));
  $('.calendar-btn').on('click', () => slideCard(UP));
  $('.favorites-btn').on('click', () => slideCard(RIGHT));
  $('.r-card').on('transitionend', (el) => removeCard(el));
});