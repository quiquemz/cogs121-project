$(document).ready(function() {

  /* EVENTS */
  // when opening the sidebar
  $('.open-sidebar-btn').on('click', function() {
    // open sidebar
    $('#sidebar').addClass('active');
    // fade in the overlay
    $('.overlay').fadeIn();
  });

  // if dismiss or overlay was clicked
  $('.close-sidebar-btn, .overlay').on('click', function() {
    // hide the sidebar
    $('#sidebar').removeClass('active');
    // fade out the overlay
    $('.overlay').fadeOut();
  });

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

});