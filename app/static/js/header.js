$(document).ready(function() {

  // Function definitions
  function getCurrentPage() {
    return window.location.pathname.replace('.html', '');
  }

  function initializeHeader(location) {
    switch (location) {
      case '/':
      case '/home':
      case '/discover':
        $('#header').css('background', '#FDFDFD').css('color', '#363046');
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
        $('#header').css('background', '#FDFDFD');
        $('h5').css('color', '#363046').css('font-weight', '100');
        $('.left-header-btn').append('<i class="fa fa-chevron-left"></i>').css('color', '#363046');
        break;
    }
  }

  function goBack() {
    var currentPage = getCurrentPage();
    if (currentPage == '/login' || currentPage == '/signup') {
      window.location.href = '/home';
    }
    else if (currentPage.match('recipe') == 'recipe') {
    console.log(currentPage);
      window.location.href = '/discover';
    }
  }

  // Plain Function Invokations
  initializeHeader(getCurrentPage());

  $('.left-header-btn').on('click', () => goBack());
});