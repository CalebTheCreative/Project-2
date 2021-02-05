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

  app.get("/api/boards", (req, res) => {
    const query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    db.Board.findAll({
      where: query,
      include: [db.Board]
    }).then(dbBoard => {
      res.json(dbBoard);
    });
  });

  app.get("/api/movies", (req, res) => {
    const query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    db.Movies.findAll({
      where: query,
      include: [db.Movies]
    }).then(dbMovies => {
      res.json(dbMovies);
    });
  });

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

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

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
