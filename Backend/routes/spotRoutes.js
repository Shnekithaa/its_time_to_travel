const express = require("express")
const router = express.Router()
const placesModel = require("../models/Places")

router.get("/places", (req, res) => {
    placesModel.find()
    .then((places) => res.json(places))
    .catch((err) => res.json(err))
})

module.exports = router