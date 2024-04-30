const express = require("express")
const Joi = require('joi')
const router = express.Router()
const placesModel = require("../models/Places")

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

module.exports = router