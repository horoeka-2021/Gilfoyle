const express = require("express");
const hbs = require("express-handlebars");

const movieRoutes = require("./routes");

const { getData } = require("./utils");
const server = express();

server.use(express.static("public"));
server.use(express.urlencoded({ extended: false }));

server.engine("hbs", hbs({ extname: "hbs" }));
server.set("view engine", "hbs");

module.exports = server;

server.use("/movies", movieRoutes);

//home page
server.get("/", (req, res) => {
  getData((err, contents) => {
    if (err) {
      res.sendStatus(500);
      return;
    }
    const moviesData = {
      movies: contents.movies,
    };
    res.render("home", moviesData);
  });
});
