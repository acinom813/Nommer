$(document).ready(function() {

    function  renderCookbookList(){
        var recipeIdArray=localStorage.getItem("recipeIdArray");
        var parsedArray = JSON.parse(recipeIdArray);

        for (let index = 0; index < parsedArray.length; index++) {
            console.log(parsedArray[index]);
            
        };
    }

renderCookbookList();
})