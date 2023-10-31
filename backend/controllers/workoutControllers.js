const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// Get all workouts
const getWorkouts = async(req, res) => {
    // Query database

    // Get all documents
    const workouts = await Workout.find({}).sort({createdAt: -1}) // descending order
    res.status(200).json(workouts)
}
// Get a single workout
const getWorkout = async(req,res) => {
    // grab id property
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json(
            {
                error: "Invalid id"
            }
        )
    }

    const workout = await Workout.findById(id)
    if (!workout){
        return res.status(404).json({
            error: "No such workout"
        });
    }
    res.status(200).json({
        workout
    })
}

// Create a workout

const createWorkout = async (req, res) =>{
    // Body comes from the request because of middleware

    const {title,load,reps} = req.body;
    try{
        // add doc to db
        const workout = await Workout.create({
            title,
            load,
            reps
        })
        res.status(200).json(workout)
    }
    catch(error){
        res.status(400).json({
            error: error.message
        })
    }
}


// Delete a workout
const deleteWorkout = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            error: "Invalid id"
        })
    }

    const workout= await Workout.findOneAndDelete({_id: id})
    if (!workout){
        return res.status(400).json({
            error: "No such workout"
        })
    }
    res.status(200).json(workout)
}

// Update a workout
const updateWorkout = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            error: "Invalid id"
        })
    }
    // Two fields, id, and update information
    const workout= await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!workout){
        return res.status(400).json({
            error: "No such workout"
        })
    }
    
    res.status(200).json(workout)
}


module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}