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
});

getWatchlist() {
  $.get("/api/user_data" + authorId, function(data) {
    console.log("Posts", data);
    posts = data;
    if (!posts || !posts.length) {
      displayEmpty(author);
    }
    else {
      initializeRows();
    }
  });
}
}
