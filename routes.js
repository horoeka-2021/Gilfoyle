const express = require("express");

const router = express.Router();

const { getData, updateData } = require("./utils");

module.exports = router;

router.get("/:movies", (req, res) => {
  getData((err, returnData) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    const req_Title = req.params.movies;

    const returnTitle = returnData.movies.find((el) => el.title === req_Title);
    res.render("test", returnTitle);
  });
});

router.get('/:movies/edit', (req, res) =>{
    getData((err, returnData) =>{
        if (err) {
            res.status(500).send(err.message)
            return
        }
        const req_Title = req.params.movies;
        const returnTitle = returnData.movies.find((el) => el.title === req_Title);
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
        const dataArrTest = data.movies
        const returnTitle = dataArrTest.find((el) => el.title === req_Title);

        const emptyArr = []
        const pushContent = emptyArr.push(req.body.review)

        const updateReview = {
            ...returnTitle,
      
            // title: req.body.movies,
            review: req.body.review
        }
        console.log(updateReview);

        

        const filtered = dataArrTest.filter(element => element.title !== req.params.movies ) 
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