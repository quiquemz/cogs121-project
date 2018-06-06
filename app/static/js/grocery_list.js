$(document).ready(() => {

	/*** Firebase Auth and DB ***/
	const auth = firebase.auth();
	const db = firebase.database();

	function getCalendarIngredients() {


		db.ref(`/users/${auth.currentUser.uid}/favoriteRecipes`).once('value', 
			function(snapshot){

				ingredientsMap = {}

    			snapshot.forEach(function(child){

	        		var key = child.key;
    				if(key.endsWith("Ingredients")) {

    					var ingredientList = child.val();
    					var i;
    					for(i = 0; i < ingredientList.length; i++) {

    						// Array containing name and quantity from db
    						var thisIngredient = ingredientList[i];
    						
    						// Ingredient name
    						var type = thisIngredient[0];

    						// Quantity and Units
    						var formattedQuantity = thisIngredient[1] + " " + thisIngredient[2];
    						
    						// Append to grocery list
							ingredientsMap[type] = formattedQuantity;

    					}
    				}
    			});

				// Add to webpage
				Object.keys(ingredientsMap).forEach(function(key) {
					$("#grocery-list").append('<li class="list-group-item">' + key + ' (' + ingredientsMap[key] + ')</li>');
				})
    			
    		});

	}

  	/*** Initializers ***/
  	firebase.auth().onAuthStateChanged(user => {
  		if (user) {
    		getCalendarIngredients();
  		}
	});

});