$(document).ready(function() {
  $('.open-sidebar-btn').on('click', function() {
    $('#sidebar').addClass('active');
    $('.overlay').fadeIn();
  });

  $('.close-sidebar-btn, .overlay').on('click', function() {
    $('#sidebar').removeClass('active');
    $('.overlay').fadeOut();
  });
});