// $(document.ready)(() => {




// })



//Function for when the food is typed out and clicked to search
$("#foodSubmit").on("click", event => {
  event.preventDefault();
  //makes the searched food a variable called foodIngredient
  const foodIngredient = $("#foodSearch").val();
  //URL including the APP ID and APP Key
  const queryURL =
    "https://api.edamam.com/search?q=" +
    foodIngredient +
    "&app_id=3a94af5c&app_key=dcd84ae2c299d0440ebdbbe0b34bfb80";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(response => {
    console.log(response);
    //Loop for 10 recipes to load on page
    for (let i = 0; i < 10; i++) {
      //Saves picture and adds link to it and then appends the page
      const foodPicture = response.hits[i].recipe.image;
      const foodPictureEl = $(
        "<a href = " +
          response.hits[i].recipe.url +
          "><img src =" +
          foodPicture +
          "></a>"
      );
      $("#food-pic" + i).append(foodPictureEl);
      //Saves recipe name from AJAX call and prepends it
      const recipeName = response.hits[i].recipe.label;
      $("#ingredientSection" + i).prepend(recipeName);
    }
  });
});
