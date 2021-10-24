const request = require('supertest')

const { getData, updateData } = require("../utils");
const server = require('../server')


//home
test('GET / home returns correct response', (done) => {
  request(server)
    .get('/')
    .expect(200)
    .end((err, res) => {
      expect(err).toBeNull()
      expect(res.text).toMatch('Movies')
      done()
    })
})

test('/GET ensures located object matches page id', (done) => {
  getData((err, data) => {
    if (err) {
      console.error(err.message)
    }
    const dataArr = data.movies
    const movieIndex = Math.floor(Math.random() * dataArr.length)
    request(server)
      .get('/movies/' + dataArr[movieIndex].title)
      .expect(200)
      .end((err, res) => {
        expect(err).toBeNull()
        //console.log(res.text)
        expect(res.text).toMatch(dataArr.title)
        done()
      })
  })
})