<<<<<<< HEAD
const apiKey = "715a8e5a66ff527f09cba3f681f691f2";
$(document).ready(() => {
  const movieInput = $("#addMovie");
  console.log(movieInput);
=======
// Oscar update 110pm Mon

$(document).ready(() => {
  //const movieInput = $("#addMovie");
  //console.log(movieInput);
  const apiKey = "715a8e5a66ff527f09cba3f681f691f2";
>>>>>>> main
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
      const popTitle = results[i].title;

      $(`#popularImg${i}`).attr("src", `${imgURL}`);
      // ===================
      // Pop Code
      $(`#popAddWatchList${i}`).on("click", handlePopMovieFormSubmit);
      //$(document).on("click", "#searchMovieBtn", handleMovieUpdate);

      function handlePopMovieFormSubmit(event) {
        event.preventDefault();
        const globalPopUserId = $(".member-name").data("id");
        // const globalMovie = $(this).parent().text();
        console.log("------");
        console.log(popTitle);
        console.log(globalPopUserId);
        console.log("------");

        uploadMovie({
          // name: movieInput.val().trim(),
          name: popTitle,
          watched: "false",
          UserId: globalPopUserId
        });
      }
      function uploadMovie(movieData) {
        $.post("/api/movies", movieData);
      }
      // ===================

      console.log(results[i].title);
      // let popTitle = results[i].title;
      // console.log(poptitle);
      // $(`popAddWatchList${i}`).click(handleMovieFormSubmit);
    }
  });
  // $(document).on("click", "#searchMovieBtn", handleMovieFormSubmit);

<<<<<<< HEAD
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
  $("#searchMovieBtn").click(event => {
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
      const data = {
        movies: []
      };
      for (let i = 0; i < results.length; i++) {
        const currentTitle = {
          title: results[i].title,
          // eslint-disable-next-line camelcase
          release_date: results[i].release_date
        };
        data.movies.push(currentTitle);
      }
      console.log(data);

      const template = Handlebars.compile(
        document.getElementById("Template").querySelectorAll()
      );

      const output = template({
        data: data
      });

      console.log(output);

      document.body.innerHTML = output;
=======
  $("#searchMovieBtn").click(event => {
    event.preventDefault();
    const movieInput = $("#addMovie")
      .val()
      .trim();
    let resultsArr = [];
    const queryURL2 = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieInput}&page=1&include_adult=false`;
    console.log(queryURL2);
    console.log(movieInput);
    $.ajax({
      url: queryURL2,
      method: "GET"
    }).then(response => {
      console.log(response);
      $("#resultsContainer").empty();
      resultsArr = response.results;
      console.log(resultsArr);
      for (let i = 0; i < resultsArr.length; i++) {
        const title = resultsArr[i].title;
        const releaseDate = resultsArr[i].release_date;
        const titleEl = $(
          `<li class = 'list-group-item text-dark'><p id='MovieTitle${i}'>${title}</p><span id='MovieYear'>${releaseDate}</span></li>`
        );
        const buttonEl = $(
          `<button><i class = 'fas fa-heart' data-index=${i}></i></button>`
        );
        buttonEl.attr("class", "btn");
        buttonEl.attr("id", `addMovieBtn${i}`);
        buttonEl.attr("data-index", i);
        $("#resultsContainer").append(titleEl);
        $("#resultsContainer").append(buttonEl);
      }

      for (let i = 0; i < resultsArr.length; i++) {
        $(document).on("click", `#addMovieBtn${i}`, handleMovieFormSubmit);
        //$(document).on("click", "#searchMovieBtn", handleMovieUpdate);

        function handleMovieFormSubmit(event) {
          event.preventDefault();
          const globalUserId = $(".member-name").data("id");
          const globalMovie = $(`#MovieTitle${i}`).text();
          // const globalMovie = $(this).parent().text();
          console.log(globalMovie);
          console.log(globalUserId);

          uploadMovie({
            // name: movieInput.val().trim(),
            name: globalMovie,
            watched: "false",
            UserId: globalUserId
          });
        }
        function uploadMovie(movieData) {
          $.post("/api/movies", movieData);
        }

        $(document).on(
          "click",
          `#popAddWatchList${i}`,
          handlePopMovieFormSubmit
        );
        //$(document).on("click", "#searchMovieBtn", handleMovieUpdate);

        function handlePopMovieFormSubmit(event) {
          event.preventDefault();

          const globalUserId = $(".member-name").data("id");
          const globalMovie = $(`#MovieTitle${i}`).text();
          // const globalMovie = $(this).parent().text();
          console.log(globalMovie);
          console.log(globalUserId);

          uploadMovie({
            // name: movieInput.val().trim(),
            name: globalMovie,
            watched: "false",
            UserId: globalUserId
          });
        }
        function uploadMovie(movieData) {
          $.post("/api/movies", movieData);
        }
      }

      return;
>>>>>>> main
    });
  });
});

// function to change watched status
// $(() => {
//   $(".change-watched").on("click", function (event) {
//     const id = $(this).data("id");
//     const newWatched = $(this).data("newwatched");

//     const newWatchedState = {
//       watched: newWatched
//     };

//     $.ajax("/api/movies/" + id, {
//       type: "PUT",
//       data: newWatchedState
//     }).then(() => {
//       console.log("changed watched to", newWatched);
//       location.reload();
//     });
//   });
//   //function to delete
//   $(".delete-movie").on("click", function (event) {
//     const id = $(this).data("id");

//     $.ajax("/api/movies/" + id, {
//       type: "DELETE"
//     }).then(() => {
//       console.log("deleted movie", id);
//       location.reload();
//     });
//   });
// });

// let buttonEl = $("<button class = btn btn-warning text-light'data-index='" + i + "></button>")
// buttonEl.attr('class', 'button favoriteButton');
// buttonEl.attr("data-index", i)

// const results = response.results;
// const data = { movies: [] };
// for (let i = 0; i < results.length; i++) {
//   const currentTitle = {
//     title: results[i].title,
//     releaseDate: results[i].release_date
//   };
//   data.movies.push(currentTitle);
//   $("#movieResults")
