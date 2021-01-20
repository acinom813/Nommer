// jQuery ready method
$(document).ready(function() {

    function renderMealCard(meal) {

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

        var index = 0;

        var ingredientEl = "";
        
        while (ingredientArray[index] != " ") {

            ingredientEl = $("<li>").addClass("list-group-item");

            ingredientEl.text(ingredientArray[index]);

            $("#ingredients-list").append(ingredientEl);

            index++;
        }

        $("#recipe-link-button").attr("href", meal.strSource);

        console.log(meal);
    }

    function getRandomMeal() {
        $.ajax({
                url: "https://www.themealdb.com/api/json/v1/1/random.php",
                method: "GET"
            }).then(function(response) {

                var randomMeal = response.meals[0];

                renderMealCard(randomMeal);
            });
    }

    function getMealByID(id) {

        var parsedURL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id;

        $.ajax({
            url: parsedURL,
            method: "GET"
        }).then(function(response) {
            var foundMeal = response.meals[0];

            renderMealCard(foundMeal);
        });
    }

    function getMealByIngredient(ingredient) {

        var parsedURL = "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + ingredient;

        $.ajax({
            url: parsedURL,
            method: "GET"
        }).then(function(response) {
            var foundMeal = response.meals[0];

            renderMealCard(foundMeal);
        });
    }

    getRandomMeal();
});
