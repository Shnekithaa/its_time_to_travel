const mongoose = require("mongoose")

const PlacesSchema = new mongoose.Schema({
    spot: String,
    location: String
})

const PlacesModel = mongoose.model("touristspots", PlacesSchema)
module.exports = PlacesModel