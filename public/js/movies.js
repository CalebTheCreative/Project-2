$(document).ready(() => {
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
      const popTitle = results[i].title;
      $(`#popularImg${i}`).attr("src", `${imgURL}`);

      // Popular Movie slide button function
      $(`#popAddWatchList${i}`).on("click", handlePopMovieFormSubmit);
      function handlePopMovieFormSubmit(event) {
        event.preventDefault();
        const globalPopUserId = $(".member-name").data("id");

        uploadMovie({
          name: popTitle,
          watched: "false",
          UserId: globalPopUserId
        });
      }
      function uploadMovie(movieData) {
        $.post("/api/movies", movieData);
        location.reload();
      }
    }
  });

  // Search Movie Button Function
  $("#searchMovieBtn").click(event => {
    event.preventDefault();
    const movieInput = $("#addMovie")
      .val()
      .trim();
    let resultsArr = [];
    const queryURL2 = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieInput}&page=1&include_adult=false`;
    $.ajax({
      url: queryURL2,
      method: "GET"
    }).then(response => {
      $("#resultsContainer").empty();
      resultsArr = response.results;
      for (let i = 0; i < resultsArr.length; i++) {
        const title = resultsArr[i].title;
        // eslint-disable-next-line prettier/prettier
        const releaseDate = (resultsArr[i].release_date).slice(0, 4);
        const titleEl = $(
          `<li class = 'list-group-item text-dark'><p id='MovieTitle${i}'>${title}</p><span id='MovieYear'>${releaseDate}</span></li>`
        );
        const buttonEl = $(
          `<button><i class = 'fas fa-heart' data-index=${i}></i> Add to watchlist</button>`
        );
        buttonEl.attr("class", "btn resAddWatch");
        buttonEl.attr("id", `addMovieBtn${i}`);
        buttonEl.attr("data-index", i);
        $("#resultsContainer").append(titleEl);
        $("#resultsContainer").append(buttonEl);
      }
      for (let i = 0; i < resultsArr.length; i++) {
        $(document).on("click", `#addMovieBtn${i}`, handleMovieFormSubmit);
        function handleMovieFormSubmit(event) {
          event.preventDefault();
          const globalUserId = $(".member-name").data("id");
          const globalMovie = $(`#MovieTitle${i}`).text();

          uploadMovie({
            name: globalMovie,
            watched: "false",
            UserId: globalUserId
          });
          location.reload();
        }
        function uploadMovie(movieData) {
          $.post("/api/movies", movieData);
        }
        $(document).on(
          "click",
          `#popAddWatchList${i}`,
          handlePopMovieFormSubmit
        );
        function handlePopMovieFormSubmit(event) {
          event.preventDefault();
          const globalUserId = $(".member-name").data("id");
          const globalMovie = $(`#MovieTitle${i}`).text();

          uploadMovie({
            name: globalMovie,
            watched: "false",
            UserId: globalUserId
          });
        }
        function uploadMovie(movieData) {
          $.post("/api/movies", movieData);
          location.reload();
        }
      }
      return;
    });
  });
});

//function to change watched status
$(() => {
  // eslint-disable-next-line no-unused-vars
  $(".change-watched").on("click", function(event) {
    const id = $(this).data("id");
    const newWatched = $(this).data("newwatched");
    console.log(newWatched);

    // eslint-disable-next-line eqeqeq
    if (newWatched == false) {
      const newWatchedState = {
        watched: true
      };
      $.ajax("/api/movies/" + id, {
        type: "PUT",
        data: newWatchedState
      }).then(() => {
        console.log("changed watched to", newWatched);
        location.reload();
      });
    } else {
      const newWatchedState = {
        watched: false
      };
      console.log(newWatchedState);
      $.ajax("/api/movies/" + id, {
        type: "PUT",
        data: newWatchedState
      }).then(() => {
        console.log("changed watched to", newWatched);
        location.reload();
      });
    }
  });

  //function to delete
  // eslint-disable-next-line no-unused-vars
  $(".delete-movie").on("click", function(event) {
    const id = $(this).data("id");
    $.ajax("/api/movies/" + id, {
      type: "DELETE"
    }).then(() => {
      console.log("deleted movie", id);
      location.reload();
    });
  });
});
