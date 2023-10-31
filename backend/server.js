require('dotenv').config()

const express = require('express')
const workoutRoutes = require('./routes/workouts')
const mongoose = require('mongoose')

// express app
const app = express()

// Middleware
app.use(express.json()) // Adds json to the request


app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/workouts/', workoutRoutes)

// Connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() =>{
        // Only listen when we're connected to the database

        // Listen for requests
        app.listen(process.env.PORT, ()=>{
            console.log('Connected to DB and listening on port',  process.env.PORT)
        })
    })
    .catch((error) =>{
        console.log(error)
    })

