$(document).ready(function () {

    // Gets the recipeIdArray from local storage as a global variable
    var recipeIdArray = localStorage.getItem("recipeIdArray");
    var parsedArray = JSON.parse(recipeIdArray);

    // Function to dynamically create the list of recipes
    function renderCookbookList() {

        for (let index = 0; index < parsedArray.length; index++) {

            var name = parsedArray[index].name;

            var newItem = $("<button>").addClass("list-group-item");

            newItem.text(name);

            newItem.attr("data-index", index);

            $("#saved-recipes").append(newItem);
        };
    }

    renderCookbookList();

    // A function to dynamically update the recipe card which takes a TheMealDB API object as a parameter
    function renderMealCard(meal) {

        // Sets mealID and mealName to for the current meal's info
        mealID = meal.idMeal;
        mealName= meal.strMeal;

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

        // Instances an array which will be used later
        var ingredientEl = [];
        
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

    // Function that performs an ajax call to get a meal based on an ID
    function getMealByID(id) {

        // Creates a url using the id parameter
        var parsedURL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id;

        // Ajax call to TheMealDB API for the meal with the given id
        $.ajax({
            url: parsedURL,
            method: "GET"
        }).then(function (response) {

            // Gets the meal out of the returned array
            var foundMeal = response.meals[0];
            
            // Runs the renderMealCard() method with the meal
            renderMealCard(foundMeal);
        });
    }

    $("#saved-recipes").on("click", ".list-group-item", function() {

        var recipeIndex = $(this).attr("data-index");

        var recipe = parsedArray[recipeIndex];

        getMealByID(recipe.id);
    });

    getMealByID(parsedArray[0].id);
});
