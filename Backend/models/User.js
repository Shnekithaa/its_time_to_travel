const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    gender: {type: String, enum: ["male", "female", "notsay"], default: 'notsay'},
    bio: {type: String, default: ''},
})

const userModel = mongoose.model("users", UserSchema)
module.exports = userModel