// jQuery ready method
$(document).ready(function() {

    function renderMealCard(meal) {
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
});
