$(document).ready(function () {

    function renderCookbookList() {
        var recipeIdArray = localStorage.getItem("recipeIdArray");
        var parsedArray = JSON.parse(recipeIdArray);
        console.log(parsedArray);
        for (let index = 0; index < parsedArray.length; index++) {
            console.log(parsedArray[index], "index")
            var name = parsedArray[index].name;
            var id = parsedArray[index].id;
            var newItem = $("<li>").addClass("list-group-item");
            newItem.text(name);
            newItem.attr("data-id", id)

            $("#saved-recipes").append(newItem);


        };

        $(".list-group-item").on("click", function () {
            var recipeIdArray = localStorage.getItem("recipeIdArray");
            var parsedArray = JSON.parse(recipeIdArray);


            var id = $(this).attr("data-id")

            for (let index = 0; index < parsedArray.length; index++) {

                 if(id === parsedArray[index].id){
                    var card = `
                    <div class="card">
                        <div class="card-body ">
        
        
                        <h5 id="recipe-title" class="card-title"> ${parsedArray[index].name} </h5>
                        <img id="meal-image" src="${parsedArray[index].image}" alt="Food" class="image">
                        <p id="recipe-instructions" class="card-text">${parsedArray[index].instruction} </p>
                        
                        <div class="card-header">
                          Ingredients
                        </div>
                        <ul id="ingredients-list" class="list-group list-group-flush">
                        </ul>
                        <a id="recipe-link-button" target="_blank" class="btn btn-primary">Recipe Source</a>-->
                      </div>
                    </div>  
                    `
                    $(".new-recipe").html(card);
                 }
             

            }

        })
    }

    renderCookbookList();

    function renderMealCard(foundMeal) {
        console.log(foundMeal);
        // console.log(parsedArray[index].name);
        // var name = parsedArray[index].name;
        // var id = parsedArray[index].id;
        // var newItem = $("<li>").addClass("list-group-item");
        // newItem.text(name);
        // newItem.attr("data-id", id)
        // $("#saved-recipes").append(newItem);

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
            console.log(response, "response");
            // Runs the renderMealCard() method with the meal
            renderMealCard(foundMeal);
        });
    }
    /*Function will render the selcted saved recipe
    function selectedRecipeCard (meal) {
        
    //Selected recipe will return recipe title, meal-image, and recipe-instructions
    
            $("#recipe-title").text(meal.strMeal);
    
            $("#meal-image").attr("src", meal.strMealThumb);
    
            $("#recipe-instructions").text(meal.strInstructions);
    
    }
    
    $("#saved-recipes").on("click", "li", function(event) {
        console.log(this.text);*/
});



