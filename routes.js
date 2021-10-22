const express = require("express");

const router = express.Router();

const { getData, updateData } = require("./utils");

module.exports = router;

// localhost:3000/movies/____
//selected movie will show
router.get("/:movies", (req, res) => {
  getData((err, data) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    const req_Title = req.params.movies;
    const returnTitle = data.movies.find(element => element.title === req_Title);
    res.render("movie", returnTitle);
  });
});

// localhost:3000/movies/___ (movie title)/edit
//edit.hbs adding comments page
router.get('/:movies/addcomments', (req, res) => {
  getData((err, data) => {
    if (err) {
      res.status(500).send(err.message)
      return
    }
    const req_Title = req.params.movies;
    const returnTitle = data.movies.find((element) => element.title === req_Title);
    res.render("addcomments", returnTitle);
  })

})

//localhost:3000/movies/edit after you click submit
//write data and upload data functions
router.post('/:movies/addcomments', (req, res) => {
  getData((err, data) => {
    if (err) {
      res.status(500).send(err.message)
      return
    }
    const req_Title = req.params.movies;
    const dataArr = data.movies
    const returnTitle = dataArr.find(element => element.title === req_Title);

    //this part pushes comments
    const commentsArr = [...returnTitle.comments]
    //testKey: just key for object can be changed
    const commentObj = { review: req.body.comments }
    commentsArr.push(commentObj)

    //this part updates the object with new comments
    const updateReview = {
      ...returnTitle,
      comments: commentsArr
    }

    //selects which objs not the change
    const filtered = dataArr.filter(element => element.title !== req.params.movies)

    //adds new data to json to be read again
    const newArr = [...filtered, updateReview]
    const newData = { movies: newArr }

    //writes the json file
    updateData(newData, (err) => {
      if (err) {
        res.status(500).send(err.message)
        return
      }
      res.redirect('/movies/' + returnTitle.title)
    })

  })
})
