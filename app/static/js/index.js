$(document).ready(() => {
  $.ajax({
    url: 'api/recipes/',
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      $("#recipe1Title").html(data['Recipe1'].name);
      $("#recipe1Img").attr('src', data['Recipe1'].img);
      $("#recipe2Title").html(data['Recipe2'].name);
      $("#recipe2Img").attr('src', data['Recipe2'].img);
    }
  });

  $("#searchBtn").click(() => {
    const val = $("#nameBox").val();
    const requestURL = 'recipes/' + val;
    $.ajax({
      url: requestURL,
      type: 'GET',
      dataType: 'json',
      success: (data) => {
        if (val != "") {
          $("#recipe1Title").html(data.name);
          $("#recipe1Img").css("background-image", 'url(' + data.img + ')');
          $("#recipe2").hide();
        } else {
          $("#recipe1Title").html(data['Recipe1'].name);
          $("#recipe1Img").attr('src', data['Recipe1'].img);
          $("#recipe2").show();
          $("#recipe2Title").html(data['Recipe2'].name);
          $("#recipe2Img").attr('src', data['Recipe2'].img);
        }
      }
    });
  });
});