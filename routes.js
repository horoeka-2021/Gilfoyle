const express = require("express");

const router = express.Router();

const { getData } = require("./utils");

module.exports = router;

router.get("/:movies", (req, res) => {
  const req_Title = req.params.movies;
  getData((err, returnData) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    const moviesData = {
      movies: returnData.movies,
    };
    const returnTitle = returnData.movies.find((el) => el.title === req_Title);
    res.render("test", returnTitle);
  });
});
