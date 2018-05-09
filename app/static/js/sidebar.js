$(document).ready(function() {
  // Function definitions
  function initializeSidebar(loggedIn) {
    if (loggedIn) {
      $('.sidebar-footer')
        .find('.list-unstyled')
        .append('<li><a href="#">Logout</a></li>');
    } else {
      $('.sidebar-footer')
        .find('.list-unstyled')
        .append('<li><a href="#">Login</a></li><li><a href="#">Sign Up</a></li>')
    }
  }

  // Event Handlers
  $('.open-sidebar-btn').on('click', function() {
    $('#sidebar').addClass('active');
    $('.overlay').fadeIn();
  });

  $('.close-sidebar-btn, .overlay').on('click', function() {
    $('#sidebar').removeClass('active');
    $('.overlay').fadeOut();
  });

  // Plain Function Invokations
  initializeSidebar(false);

});