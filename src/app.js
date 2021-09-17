const express = require('express')
const passport = require('passport')

require('./db/mongoose')

const User = require('./models/user')

//--------------------------------------Route Imports--------------------------------------\\

const RestaurantRouter = require('./routers/restaurant/restaurant')

//--------------------------------------Route Imports--------------------------------------\\

//--------------------------------------Server Configurations--------------------------------------\\

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())
app.use(passport.initialize())

//passport config

const qurbastatics = require ('qurbastatics')
qurbastatics.passportStrategy(passport,User)

//--------------------------------------Server Configurations--------------------------------------\\

//--------------------------------------Routes--------------------------------------\\

app.use("/api/v1/restaurants/",RestaurantRouter)

//--------------------------------------Routes--------------------------------------\\

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})