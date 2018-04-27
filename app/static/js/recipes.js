$(document).ready(() => {
  var recipeName = location.search.substring(1).split("&")[0];
  $.ajax({
    url: 'api/recipes/',
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      console.log(data);
      console.log(recipeName);
      $("#recipe1Title").html(data[recipeName].name);
      $("#recipe1Img").attr('src', data[recipeName].img);
    }
  });

});