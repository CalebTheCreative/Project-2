// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
var db = require("../models");


module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("signup");
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("login");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    res.render("members");
  });

  // app.get("/boardgames", isAuthenticated, (req, res) => {
  //   db.Board.findAll({ raw: true, where: { UserId: req.user.id } }).then(
  //     dbBoardlist => {
  //       res.render("boardgames", { boards: dbBoardlist });
  //     }
  //   );
  // });

  // app.get("/cooking", isAuthenticated, (req, res) => {
  //   db.Cookings.findAll({ raw: true, where: { UserId: req.user.id } }).then(
  //     dbCookinglist => {
  //       res.render("cooking", { cookings: dbCookinglist });
  //     }
  //   );
  // });

  app.get("/movies", isAuthenticated, (req, res) => {
    db.Movies.findAll({ raw: true, where: { UserId: req.user.id } }).then(
      dbWatchlist => {
        res.render("movies", { movies: dbWatchlist });
      }
    );
  });

  // app.get("/videogames", isAuthenticated, (req, res) => {
  //   db.VideoGames.findAll({ raw: true, where: { UserId: req.user.id } }).then(
  //     dbVideolist => {
  //       res.render("videogames", { videogames: dbVideolist });
  //     }
  //   );
  // });  

  // app.get("/alldecide", isAuthenticated, (req, res) => {
  //   res.render("alldecide");
  // });

  // app.get("/bigwheel", isAuthenticated, (req, res) => {
  //   res.render("bigwheel");
  // });
};

// app.get("/movies", isAuthenticated, (req, res) => {
//   let userName = req.user.id;
//   console.log(userName);
//   db.Movies.findAll({ raw: true }).then(dbWatchlist => {
//    res.render("movies", { movies: dbWatchlist });
//   });
// });

// app.get("/movies", isAuthenticated, (req, res) => {
//   db.Movies.findAll({ raw: true, where: { UserId: req.user.id } }).then(
//     dbWatchlist => {
//       res.render("movies", { movies: dbWatchlist });
//       return;
//     }
//   );
//   db.Movies.findAll({ raw: true, where: { UserId: req.user.id }, order: Sequelize.literal('rand()'), limit: 1 }).then(
//     dbRandomlist =>
//   {
//     console.log(dbRandomlist);
//     res.render("movies", { random: dbRandomlist });
//   }
// );
// });