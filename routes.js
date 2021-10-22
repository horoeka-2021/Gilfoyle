const express = require("express");

const router = express.Router();

const { getData, updateData } = require("./utils");

module.exports = router;

router.get("/:movies", (req, res) => {
  getData((err, data) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    const req_Title = req.params.movies;

    const returnTitle = data.movies.find(element => element.title === req_Title);
    // console.log(data);
    res.render("movie", returnTitle);
  });
});

router.get('/:movies/edit', (req, res) =>{
    getData((err, data) =>{
        if (err) {
            res.status(500).send(err.message)
            return
        }
        const req_Title = req.params.movies;
        const returnTitle = data.movies.find(element => element.title === req_Title);
        res.render("edit", returnTitle);
      })
      
    })
    
    router.post('/:movies/edit', (req, res) => {
      getData((err,data) =>{
        if(err){
          res.status(500).send(err.message)
          return
        }
        const req_Title = req.params.movies;
        const dataArr = data.movies
        const returnTitle = dataArr.find(element => element.title === req_Title);


  
        
        console.log(returnTitle.comments);
        const commentsArr = [...returnTitle.comments]
        // console.log(emptyArr);
        const commentObj = {testKey: req.body.comments}
        commentsArr.push(commentObj)
        

        console.log('this is ca: ', commentsArr);

        const updateReview = {
            ...returnTitle,
      
            // title: req.body.movies,
            comments: commentsArr
        }
        // console.log(updateReview);

        

        const filtered = dataArr.filter(element => element.title !== req.params.movies ) 
        const newArr = [...filtered, updateReview]
        const newData = {movies: newArr}
        
        updateData(newData, (err) => {
          if (err) {
            res.status(500).send(err.message)
            return
          }
          // console.log(updateReview);
          res.redirect('/movies/' + returnTitle.title)
        })

    })
})

//