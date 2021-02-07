$(document).ready(() => {
  const movieInput = $("#addMovie");
  console.log(movieInput);
  const apiKey = "715a8e5a66ff527f09cba3f681f691f2";
  let queryURL = "";
  let imgURL = "https://image.tmdb.org/t/p/w500";
  queryURL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
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

  $(document).on("click", "#searchMovieBtn", handleMovieFormSubmit);

  function handleMovieFormSubmit(event) {
    event.preventDefault();
    const globalUserId = $(".member-name").data("id");
    console.log(globalUserId);

    console.log(movieInput);
    if (!movieInput.val().trim().trim()) {
      return;
    }
    uploadMovie({
      name: movieInput.val().trim(),
      watched: "false",
      UserId: globalUserId
    });
  }

  function uploadMovie(movieData) {
    $.post("/api/movies", movieData);
  }
});
