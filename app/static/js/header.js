$(document).ready(function() {

  // Function definitions
  function getCleanCurrentPage() {
    return window.location.pathname.replace('.html', '')
  }

  function initializeHeader(location) {
    switch (location) {
      case '/':
        $('#header').css('background', '#FDFDFD').css('color', '#363046');
        $('.left-header-btn');
        $('.right-header-btn').append('<i class="fa fa-undo-alt"></i>');
        break;
      case '/calendar':
        $('#header').css('background', '#363046').css('color', '#FFF');
        $('.left-header-btn').css('color', '#FFF');
        $('.right-header-btn').css('color', '#FFF').append('<i class="fa fa-list-alt"></i>');
        break;
      default:
        $('#header').css('background', '#363046').css('color', '#FFF');
        ('.left-header-btn').css('color', '#FFF');
        $('.right-header-btn').css('color', '#FFF');
        break;
    }
  }

  // Plain Function Invokations
  initializeHeader(getCleanCurrentPage());
});