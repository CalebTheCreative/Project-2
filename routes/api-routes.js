// Requiring our models and passport as configured
const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });
  // Route for signing up a user.
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });
<<<<<<< HEAD

  app.get("/api/movies", (req, res) => {
    const query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    console.log(query);
    db.Movies.findAll({
      where: query
    }).then(dbMovies => {
      console.log(dbMovies);
      const hbsObject = {
        movies: dbMovies
      };
      console.log(hbsObject);
      res.render("movies", hbsObject);
    });
  });
=======
//problem area below
  // app.get("/api/movies", (req, res) => {
  //   const query = {};
  //   if (req.query.user_id) {
  //     query.UserId = req.query.user_id;
  //   }
  //   console.log(query);
  //   db.Movies.findAll({
  //     where: query
  //   }).then(dbMovies => {
  //     console.log(dbMovies);
  //     let hbsObject = {
  //       movies: dbMovies
  //     };
  //     console.log(hbsObject);
  //     res.render("movies", hbsObject);
  //   });
  // });
>>>>>>> main

  // app.get("/api/movies/", (req, res) => {
  //   db.Movies.findAll({

  //     var hbsObject = {
  //       name: data.name,
  //       watched: data.watched
  //     };
  //     console.log(hbsObject);
  //     res.render("movies", hbsObject);
  //   });
  // });

  app.put("/api/movies", (req, res) => {
    db.Movies.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(dbMovies => {
      res.json(dbMovies);
    });
  });

  app.delete("/api/movies/:id", (req, res) => {
    db.Movies.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbMovies => {
      res.json(dbMovies);
    });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  //********************Post Requests******************************/

  //Post route for saving a new boardgame
  app.post("/api/boards", (req, res) => {
    db.Board.create(req.body).then(dbBoard => {
      res.json(dbBoard);
    });
  });

  //Post route for saving a new recipe
  app.post("/api/cookings", (req, res) => {
    db.Cooking.create(req.body).then(dbCooking => {
      res.json(dbCooking);
    });
  });

  //Post route for saving a new movie
  app.post("/api/movies", (req, res) => {
    db.Movies.create(req.body).then(dbMovies => {
      res.json(dbMovies);
    });
  });

  //Post route for saving a new video game
  app.post("/api/videogames", (req, res) => {
    db.VideoGames.create(req.body).then(dbVideoGames => {
      res.json(dbVideoGames);
    });
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};

// app.get("/api/boards", (req, res) => {
//   const query = {};
//   if (req.query.user_id) {
//     query.UserId = req.query.user_id;
//   }
//   db.Board.findAll({
//     where: query,
//     include: [db.Board]
//   }).then(dbBoard => {
//     res.json(dbBoard);
//   });
// });

// app.put("/api/movies", (req, res) => {
//   db.Movies.update(
//     req.body,
//     {
//       where: {
//         watched: req.body.id
//       }
//     }).then(function(dbMov)
// })

// app.get("/api/boards/:id", (req, res) => {
//   db.Board.findOne({
//     where: {
//       id: req.params.id
//     },
//     include: [db.User]
//   }).then(dbBoard => {
//     res.json(dbBoard);
//   });
// });

//Post route for saving a new movie
// app.post("/api/movies", (req, res) => {
//   db.Movies.create(req.body).then(dbMovies => {
//     res.json(dbMovies);
//   });
// });

// app.get("/api/movies", (req, res) => {
//   const query = {};
//   if (req.query.user_id) {
//     query.UserId = req.query.user_id;
//   }
//   db.Movies.findAll({
//     where: query
//   }).then(dbMovies => {
//     let hbsObject = {
//       name: dbMovies.name,
//       watched: dbMovies.watched
//     };
//     res.render("movies", hbsObject);
//   });
// });

// app.get("/api/movies", (req, res) => {
//   const query = {};
//   if (req.query.user_id) {
//     query.UserId = req.query.user_id;
//   }
//   console.log(query);
//   db.Movies.findAll({
//     where: query
//   }).then(dbMovies => {
//     console.log(dbMovies);
//     for (i = 0; i < dbMovies.length; i++){
//       let hbsObject =
//     }
//     let hbsObject = {
//       name: dbMovies.name,
//       watched: dbMovies.watched
//     };
//     console.log(hbsObject);
//     res.render("movies", hbsObject);
//   });
// });
