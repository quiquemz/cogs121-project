$(document).ready(function() {

  // Function definitions
  function initializeHeader(location) {

    switch (location) {
      case '/':
        $('.right-header-btn').append('<i class="fa fa-plus-circle"></i>');
        break;
      case '/calendar':
        $('.right-header-btn').append('<i class="fa fa-list-alt"></i>');
        break;
      default:
        $('.right-header-btn').append('<i class="fa fa-plus-circle"></i>');
        break;
    }
  }

  // Plain Function Invokations
  initializeHeader(window.location.pathname.replace('.html', ''));
});