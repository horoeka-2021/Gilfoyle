const request = require('supertest')

const server = require('../routes')


//home
test('GET /movies returns correct response', (done) => {
  request(server)
  .get('/')
  .expect(200)
  .end((err, res) => {
    expect(err).toBeNull()
    console.log(res.text);
    expect(res.text).toMatch('Movies')
    done()
  })
})

// test('GET /movies/:id returns correct response', (done) => {
//   request(server)
//   .get('/movies/2')
//   .expect(200)
//   .end((err, res) => {
//     expect(err).toBeNull()
//     //console.log(res.text)
//     expect(res.text).toMatch('The Conjuring')
//     done()
//   })
// })

// test('POST /movies/:id redirects to movie review form', (done) => {
//   request(server)
//   .post('/movies/:id')
//   .send({'comment' : 'This movie was preeee scary'})
//   .set('Content-Type', 'application/x-www-form-urlencoded')
//   .expect(302)
//   .end((err, res) => {
//     expect(err).toBeNull()
//     expect(res.header.location).toMatch('/movies/3')
//     done() 
//   })