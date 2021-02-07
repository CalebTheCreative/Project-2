$(document).ready(() => {
  const apiKey = "715a8e5a66ff527f09cba3f681f691f2";
  let queryURL = "";
  let imgURL = "https://image.tmdb.org/t/p/w500";
  queryURL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
  //gets popular movies and fills the carousel
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(response => {
    const results = response.results;
    for (let i = 0; i < results.length; i++) {
      imgURL = `https://image.tmdb.org/t/p/w500${results[i].poster_path}`;
      $(`#popularImg${i}`).attr("src", `${imgURL}`);
    }
  });

  // getWatchlist(user) {
  //   $.get("/api/movies/:id" + UserId) function(data) {

  // }
  // }

  $("#searchMovieBtn").on("click", event => {
    event.preventDefault();
    const movieSearch = $("#addMovie").val();
    console.log(movieSearch);
    queryURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieSearch}&page=1&include_adult=false`;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(response => {
      console.log(response);
      const results = response.results;
      const movieTitle = results[i].title;
      const moviePoster = results[i].poster_path;
      const movieReleaseDate = results[i].poster_path;
      const MovieResults = {
        MovieTitle: movieTitle,
        MovieYear: movieReleaseDate
      };
      res.render("movies",{movies:movies});
      //   for (let i = 0; i < results.length; i++) {

      // });
    });
    });
  });
});
$(document).on("click", "#addMovieBtn", handleMovieFormSubmit);
function handleMovieFormSubmit(event) {
  event.preventDefault();
  console.log(movieInput);
  if (
    !movieInput
      .val()
      .trim()
      .trim()
  ) {
    return;
  }
  uploadMovie({
    name: movieInput.val().trim(),
    watched: "false"
  });
}
// function uploadMovie(movieData){
//   $.post("/api/movies", movieData){}
// }
