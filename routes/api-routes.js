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

  //Movies Routes
  app.put("/api/movies/:id", (req, res) => {
    db.Movies.update(req.body, {
      watched: req.body.watched,
      where: {
        id: req.params.id
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

  //Boards Routes
  // app.put("/api/boards/:id", (req, res) => {
  //   db.Board.update(req.body, {
  //     played: req.body.played,
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(dbBoards => {
  //     res.json(dbBoards);
  //   });
  // });

  // app.delete("/api/boards/:id", (req, res) => {
  //   db.Board.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(dbBoards => {
  //     res.json(dbBoards);
  //   });
  // });

  // //Cooking Routes
  // app.put("/api/cookings/:id", (req, res) => {
  //   db.Cookings.update(req.body, {
  //     cooked: req.body.played,
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(dbCookings => {
  //     res.json(dbCookings);
  //   });
  // });

  // app.delete("/api/cookings/:id", (req, res) => {
  //   db.Cookings.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(dbCookings => {
  //     res.json(dbCookings);
  //   });
  // });

  //Video Games Routes
  // app.put("/api/videogames/:id", (req, res) => {
  //   db.VideoGames.update(req.body, {
  //     played: req.body.played,
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(dbVideoGames => {
  //     res.json(dbVideoGames);
  //   });
  // });

  // app.delete("/api/videogames/:id", (req, res) => {
  //   db.VideoGames.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(dbVideoGames => {
  //     res.json(dbVideoGames);
  //   });
  // });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  //********************Post Requests******************************/

  //Post route for saving a new boardgame
  // app.post("/api/boards", (req, res) => {
  //   db.Board.create(req.body).then(dbBoard => {
  //     res.json(dbBoard);
  //   });
  // });

  // //Post route for saving a new recipe
  // app.post("/api/cookings", (req, res) => {
  //   db.Cookings.create(req.body).then(dbCookings => {
  //     res.json(dbCookings);
  //   });
  // });

  //Post route for saving a new movie
  app.post("/api/movies", (req, res) => {
    db.Movies.create(req.body).then(dbMovies => {
      res.json(dbMovies);
    });
  });

  //Post route for saving a new video game
  // app.post("/api/videogames", (req, res) => {
  //   db.VideoGames.create(req.body).then(dbVideoGames => {
  //     res.json(dbVideoGames);
  //   });
  // });

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
