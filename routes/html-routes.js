// Requiring path to so we can use relative routes to our HTML files
//const path = require("path");

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

  app.get("/boardgames", isAuthenticated, (req, res) => {
    res.render("boardgames");
  });

  app.get("/cooking", isAuthenticated, (req, res) => {
    res.render("cooking");
  });

  app.get("/movies", isAuthenticated, (req, res) => {
    db.Movies.findAll({ raw: true }).then(dbWatchlist => {
      console.log(dbWatchlist);
      res.render("movies", { movies: dbWatchlist });
    });
  });

  app.get("/videogames", isAuthenticated, (req, res) => {
    res.render("videogames");
  });

  app.get("/videogames", isAuthenticated, (req, res) => {
    res.render("videogames");
  });

  app.get("/alldecide", isAuthenticated, (req, res) => {
    res.render("alldecide");
  });

  app.get("/bigwheel", isAuthenticated, (req, res) => {
    res.render("bigwheel");
  });
};
