// jQuery ready method
// jQuery ready method
$(document).ready(function() {

    apiKeyZomato = "b0e4dfc37166620144ab154a1dd7d9c9";

    // Creates the recipeIdArray in local storage if it does not currently exist
    if (!localStorage.getItem("recipeIdArray")) {
        localStorage.setItem("recipeIdArray", JSON.stringify([]));
    }

    // Instances a variable to contain the current meal id
    var mealID = "";

    // A function to dynamically update the recipe card which takes a TheMealDB API object as a parameter
    function renderMealCard(meal) {

        // Sets the meal id into the mealID variable
        mealID = meal.idMeal;

        // Sets the recipe title, image, and instructions to their proper elements
        $("#recipe-title").text(meal.strMeal);

        $("#meal-image").attr("src", meal.strMealThumb);

        $("#recipe-instructions").text(meal.strInstructions);

        //==============================================================================
        // This creates an array containing all of the ingredients with the respective measurements
        var ingredientArray = [];

        var ingredient = meal.strMeasure1.trim() + " " + meal.strIngredient1.trim();

        ingredientArray.push(ingredient);

        ingredient = meal.strMeasure2.trim() + " " + meal.strIngredient2.trim();

        ingredientArray.push(ingredient);

        ingredient = meal.strMeasure3.trim() + " " + meal.strIngredient3.trim();

        ingredientArray.push(ingredient);

        ingredient = meal.strMeasure4.trim() + " " + meal.strIngredient4.trim();

        ingredientArray.push(ingredient);

        ingredient = meal.strMeasure5.trim() + " " + meal.strIngredient5.trim();

        ingredientArray.push(ingredient);

        ingredient = meal.strMeasure6.trim() + " " + meal.strIngredient6.trim();

        ingredientArray.push(ingredient);

        ingredient = meal.strMeasure7.trim() + " " + meal.strIngredient7.trim();

        ingredientArray.push(ingredient);

        ingredient = meal.strMeasure8.trim() + " " + meal.strIngredient8.trim();

        ingredientArray.push(ingredient);

        ingredient = meal.strMeasure9.trim() + " " + meal.strIngredient9.trim();

        ingredientArray.push(ingredient);

        ingredient = meal.strMeasure10.trim() + " " + meal.strIngredient10.trim();

        ingredientArray.push(ingredient);

        ingredient = meal.strMeasure11.trim() + " " + meal.strIngredient11.trim();

        ingredientArray.push(ingredient);
        
        ingredient = meal.strMeasure12.trim() + " " + meal.strIngredient12.trim();

        ingredientArray.push(ingredient);
                
        ingredient = meal.strMeasure13.trim() + " " + meal.strIngredient13.trim();

        ingredientArray.push(ingredient);
                
        ingredient = meal.strMeasure14.trim() + " " + meal.strIngredient14.trim();

        ingredientArray.push(ingredient);
                
        ingredient = meal.strMeasure15.trim() + " " + meal.strIngredient15.trim();

        ingredientArray.push(ingredient);
                
        ingredient = meal.strMeasure16.trim() + " " + meal.strIngredient16.trim();

        ingredientArray.push(ingredient);
                
        ingredient = meal.strMeasure17.trim() + " " + meal.strIngredient17.trim();

        ingredientArray.push(ingredient);
                
        ingredient = meal.strMeasure18.trim() + " " + meal.strIngredient18.trim();

        ingredientArray.push(ingredient);
                
        ingredient = meal.strMeasure19.trim() + " " + meal.strIngredient19.trim();

        ingredientArray.push(ingredient);
                
        ingredient = meal.strMeasure20.trim() + " " + meal.strIngredient20.trim();

        ingredientArray.push(ingredient);
        //==============================================================================

        // Empties the ingredient list
        $("#ingredients-list").empty();

        // Sets an index to be used for the ingredientArray
        var index = 0;

        // Instances a variable which will be used later
        var ingredientEl = "";
        
        // A while-loop that checks whether there is an ingredient at index 
        while (ingredientArray[index] != " ") {

            // Sets the instanced variable from earlier to a new jQuery object
            ingredientEl = $("<li>").addClass("list-group-item");

            // Sets the text of the jQuery object to the ingredient at index
            ingredientEl.text(ingredientArray[index]);

            // Appends the jQuery object to the ingredient list
            $("#ingredients-list").append(ingredientEl);

            // Increases index by 1
            index++;
        }

        // Sets the link into the source button
        $("#recipe-link-button").attr("href", meal.strSource);
    }

    // Function that performs an ajax call to get a random meal
    function getRandomMeal() {

        // Ajax call to TheMealDB API for a random meal
        $.ajax({
                url: "https://www.themealdb.com/api/json/v1/1/random.php",
                method: "GET"
            }).then(function(response) {

                // Gets the random meal out of the returned array
                var randomMeal = response.meals[0];

                // Runs the renderMealCard() method with the random meal
                renderMealCard(randomMeal);
            });
    }

    // Function that performs an ajax call to get a meal based on an ingredient
    function getMealByIngredient(ingredient) {

        // Creates a url using the ingredient parameter
        var parsedURL = "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + ingredient;

        // Ajax call to TheMealDB API for a random meal that is filtered by an ingredient
        $.ajax({
            url: parsedURL,
            method: "GET"
        }).then(function(response) {

            // Gets the filtered meal out of the returned array
            var foundMeal = response.meals[0];

            // Gets the id from the filtered meal
            var id = foundMeal.idMeal;

            // Runs the renderMealCard() method with the meal
            getMealByID(id);
        });
    }

    // Function that performs an ajax call to get a meal based on an ID
    function getMealByID(id) {

        // Creates a url using the id parameter
        var parsedURL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id;

        // Ajax call to TheMealDB API for the meal with the given id
        $.ajax({
            url: parsedURL,
            method: "GET"
        }).then(function(response) {

            // Gets the meal out of the returned array
            var foundMeal = response.meals[0];

            // Runs the renderMealCard() method with the meal
            renderMealCard(foundMeal);
        });
    }

    function getRestaurant(cityID, cityLat, cityLon, offset) {
        var parsedURL = "https://developers.zomato.com/api/v2.1/search?entity_id="+ cityID + "&start=" + offset + "&count=1&lat=" + cityLat + "&lon=" + cityLon;

        $.ajax({
            method: "GET",
            crossDomain: true,
            url: parsedURL,
            dataType: "json",
            async: true,
            headers: {
                "user-key": apiKeyZomato
            }
        }).then(function(response) {

            console.log(response);

            var restaurant = response.restaurants[0].restaurant;

            var name = restaurant.name;
            var address = restaurant.location.address;
            var priceRange = restaurant.price_range;
            var cuisineType = restaurant.cuisines;
            var rating = restaurant.user_rating.aggregate_rating;

            console.log(name);
            console.log(address);
            console.log(priceRange);
            console.log(cuisineType);
            console.log(rating);
        });
    }

    function getMaxOffset(cityID, cityLat, cityLon) {
        
        var parsedURL = "https://developers.zomato.com/api/v2.1/search?entity_id="+ cityID + "&count=0&lat=" + cityLat + "&lon=" + cityLon;

        $.ajax({
            method: "GET",
            crossDomain: true,
            url: parsedURL,
            dataType: "json",
            async: true,
            headers: {
                "user-key": apiKeyZomato
            }
        }).then(function(response) {

            var foundResults = response.results_found;

            var maxOffset = 0;

            if (foundResults > 99) {
                maxOffset = 100;
            }
            else {
                maxOffset = foundResults;
            }

            var actualOffset = Math.floor(Math.random() * maxOffset);

            getRestaurant(cityID, cityLat, cityLon, actualOffset);

            console.log(response);
        });
    }

    function getRandomRestaurant(city) {

        var parsedURL = "https://developers.zomato.com/api/v2.1/locations?query=" + city;

        $.ajax({
            method: "GET",
            crossDomain: true,
            url: parsedURL,
            dataType: "json",
            async: true,
            headers: {
                "user-key": apiKeyZomato
            }
        }).then(function(response) {

            var locationID = response.location_suggestions[0].city_id;

            var locationLat = response.location_suggestions[0].latitude;

            var locationLon = response.location_suggestions[0].longitude;

            console.log(response);

            getMaxOffset(locationID, locationLat, locationLon);
        });
    }

    var btnClicked = false;

    // Click listener for the submit button
    $("#submit-button").on("click", function(event) {

        // Prevents reloading of webpage
        event.preventDefault();

        if (!btnClicked) {

            btnClicked = true;

            // Gets the value of the ingredient input box
            var input = $("#ingredient-input").val();

            // If-else-statement to check if the user gave any input
            if (input.trim() === ""){

                // Gets a random meal if there is no input
                getRandomMeal();
            }
            else {

                // Gets a meal by ingredient if there is input
                getMealByIngredient(input);
            }
        }

        btnClicked = false;
    });

    // Click listener for the save recipe button
    $("#save-recipe").on("click", function() {

        // Gets the recipe id array from local storage
        var recipeIdArray = JSON.parse(localStorage.getItem("recipeIdArray"));

        // Checks whether the id array already has the current meal id
        // Runs if false
        if (!recipeIdArray.includes(mealID)) {

            // Pushes the current id into the array
            recipeIdArray.push(mealID);

            // Sets the altered array back into local storage
            localStorage.setItem("recipeIdArray", JSON.stringify(recipeIdArray));
        }
    });

    // Gets a random meal when the page first loads
    getRandomMeal();

    getRandomRestaurant("Atlanta");
});
