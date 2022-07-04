const path = require('path')
const express = require('express');
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const paritalsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(paritalsPath)

//Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Madhav'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Madhav'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        text: 'This is Some Help Text',
        title: 'Help',
        name: 'Madhav' 
    })
})

app.get('/weather', (req,res) => {
   if (!req.query.address) {
    return res.send({
        error: 'No address Please Enter address'
    })
   }
    
   geocode(req.query.address, (error,{lat, long, location} = {}) => {
    if (error) {
        return res.send({ error })
    }
    forecast(lat, long, (error, forecastData) => {
        if (error) {
            return res.send({ error })
        }
        res.send({
            forecast: forecastData,
            location,
            address: req.query.address
        })
      })
   })
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    // console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Madhav',
        errorMsg: 'Help article Not found'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Madhav',
        errorMsg: 'Page not Found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+ port);
})