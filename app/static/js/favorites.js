$(document).ready(function() { 

  /*** Firebase Auth and DB ***/
  const auth = firebase.auth();
  const db = firebase.database();

  (function() {
    if (auth.currentUser) {
    console.log("hi");
      $('#myList').empty();

      // Get user database snapshot
      db.ref(`/users/${auth.currentUser.uid}/favoriteRecipes`).once("value", res => {
        const recipes = res.val();

      var displayNum = 0;
      var recipeList = Object.keys(recipes);
      if (recipeList.length < 5)
        displayNum = recipeList.length;
      else
        displayNum = 5;

      for (let i = 0; i < displayNum; i++) {
        var recipeId = recipeList[i];
        var recipeTitle = recipes[recipeId];
        
        $('#myList').append(`<li class="list-group-item" id="${recipeId}">${recipeTitle}</li>`);
        //$('#' + recipeId).click(addRecipeItemCallback(recipeId, , recipeTitle));
      }
      if (displayNum < recipeList.length) {
        $('#myList').append(`<li class="list-group-item" id="load-more">Load More</li>`);
        //$('#load-more').on('click', () => loadMoreFavorites(recipes, type, recipeList, displayNum));
      }
      });
    }
  })();

});