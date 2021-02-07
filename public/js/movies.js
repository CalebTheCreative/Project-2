const apiKey = "715a8e5a66ff527f09cba3f681f691f2";
$(document).ready(() => {
  const movieInput = $("#addMovie");
  console.log(movieInput);
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
  // $(document).on("click", "#searchMovieBtn", handleMovieFormSubmit);

  // function handleMovieFormSubmit(event) {
  //   event.preventDefault();
  //   const globalUserId = $(".member-name").data("id");
  //   console.log(globalUserId);
  //   const movieInput = $("#addMovie");
  //   console.log(movieInput);
  //   if (
  //     !movieInput
  //       .val()
  //       .trim()
  //       .trim()
  //   ) {
  //     return;
  //   }
  //   uploadMovie({
  //     name: movieInput.val().trim(),
  //     watched: "false",
  //     UserId: globalUserId
  //   });
  // }

  // function uploadMovie(movieData) {
  //   $.post("/api/movies", movieData);
  // }
  $("#searchMovieBtn").click((event) => 
  event.preventDefault(){
    const movieSource = $("#movie-template").html();
    const movieList = Handlebars.compile(movieSource);
    const movieSearch = $("#addMovie").val();
    console.log(movieSearch);
    queryURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieSearch}&page=1&include_adult=false`;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(response => {
      console.log(response);
      const results = response.results;
      const data = { movies: [] };
      for (let i = 0; i < results.length; i++) {
        const currentTitle = {
          title: results[i].title,
          // eslint-disable-next-line camelcase
          release_date: results[i].release_date
        };
        data.movies.push(currentTitle);
        $("#placeholder").html(
          movieList({
            data: data
          })
        );
      }
      console.log(data);
    });
  });
});
