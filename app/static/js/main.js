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

});