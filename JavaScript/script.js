// jQuery ready method
$(document).ready(function() {

    function getRandomMeal() {
        $.ajax({
            url: "https://www.themealdb.com/api/json/v1/1/random.php",
            method: "GET"
        }).then(function(response) {
            console.log(response.meals[0]);
        });
    }

    function getMealByID(id) {

        var parsedURL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id;

        $.ajax({
            url: parsedURL,
            method: "GET"
        }).then(function(response) {
            console.log(response.meals[0]);
        });
    }

    $("#search-button").on("click", function() {

        // var userInput = $("#search-bar").val();

        // userInput.trim();

        // if (userInput === "") {
        //     getRandomMeal();
        // }
        // else {
        //     get
        // }

        getRandomMeal();
    });

    $.ajax({
        url: "https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast",
        method: "GET"
    }).then(function(response) {
        console.log(response.meals);
        console.log(response.meals[0]);
        var mealID = response.meals[0].idMeal;
        getMealByID(mealID);
    });
});