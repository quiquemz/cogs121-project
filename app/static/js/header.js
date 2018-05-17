$(document).ready(function() {

  // Function definitions
  function getCurrentPage() {
    return window.location.pathname.replace('.html', '')
  }

  function initializeHeader(location) {
    switch (location) {
      case '/':
        $('#header').css('background', '#FDFDFD').css('color', '#363046');
        $('.left-header-btn');
        $('.right-header-btn').append('<i class="fa fa-undo-alt"></i>');
        break;
      case '/login':
      case '/signup':
        $('#header').css('background', '#FDFDFD');
        $('h5').css('color', '#363046').css('font-weight', '100');
        $('.left-header-btn').append('<i class="fa fa-chevron-left"></i>').css('color', '#363046');
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
  initializeHeader(getCurrentPage());
});