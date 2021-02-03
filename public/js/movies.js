$(document).ready(function() {
const { query } = require("express")

let apiKey = "715a8e5a66ff527f09cba3f681f691f2"
let queryURL = ``
let imgURL = `https://image.tmdb.org/t/p/w500`
$("#moviesBtn").on("click", function (event) {
  queryURL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1` 
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
  let results = response.results
  for (var i = 0; i < results.length; i++){
      imgURL = `https://image.tmdb.org/t/p/w500${results[i].poster_path}`
      $(`#popularImg${i}`).attr("src", `${imgURL}`)
  }
  });
})
});