const express = require("express")
const Joi = require('joi')
const router = express.Router()
const placesModel = require("../models/Places")
const PlacesModel = require("../models/Places")

router.get("/places", (req, res) => {
    placesModel.find()
    .then((places) => res.status(200).json(places))
    .catch((err) => res.json(err))
})

const addPlaceSchema = Joi.object({
    spot: Joi.string().required(),
    location: Joi.string().required()
})

router.post("/addPlace", (req, res) => {
    const {error} = addPlaceSchema.validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    placesModel.create(req.body)
    .then(eachPlace => res.status(201).json(eachPlace))
    .catch(err => res.json(err))
})

router.post("/getPlace", (req, res) => {
    const {spotId} = req.body

    PlacesModel.findById({_id: spotId})
    .then(spot => res.json(spot))
    .catch(err => res.json(err))
})

const updatePlaceSchema = Joi.object({
    spot: Joi.string().required(),
    location: Joi.string().required()
})

router.put("/updatePlace", (req, res) => {
    const {spotId, spot, location} = req.body
    const {error} = updatePlaceSchema.validate({spot, location})
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    placesModel.findByIdAndUpdate({_id: req.body.spotId}, {spot: req.body.spot, location: req.body.location}, { new: true })
    .then(res => res.json(res))
    .catch(err => res.json(err))
})

module.exports = router