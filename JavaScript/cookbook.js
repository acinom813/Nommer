$(document).ready(function() {

    function  renderCookbookList(){
        var recipeIdArray=localStorage.getItem("recipeIdArray");
        var parsedArray = JSON.parse(recipeIdArray);

        for (let index = 0; index < parsedArray.length; index++) {
            console.log(parsedArray[index].name);
            var name = parsedArray[index].name;
            var id = parsedArray[index].id;
            var newItem = $("<li>").addClass("list-group-item");
            newItem.text(name);
            newItem.attr("data-id", id)
            $("#saved-recipes").append(newItem);

            
        };
    }

renderCookbookList();

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




$("#saved-recipes").on("click", "li", function(event) {
console.log(this.text);

});



})
