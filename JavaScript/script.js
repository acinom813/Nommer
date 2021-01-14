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

    $("#search-button").on("click", function() {
        getRandomMeal();
    });
});