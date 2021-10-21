const express = require('express')
const hbs = require('express-handlebars')

const movieRoutes = require('./routes')

const server = express()

server.use(express.static('public'))
server.use(express.urlencoded({extended: false}))

server.engine('hbs', hbs({extname: 'hbs'}))
server.set('view engine', 'hbs')

module.exports = server

server.use('/movies', movieRoutes)


server.get('/', (req, res)=>{
    // res.render('home')
    res.send('page alive')
    console.log('alive');
})