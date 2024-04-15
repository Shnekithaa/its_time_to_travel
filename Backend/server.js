const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const userModel = require('./models/User')
const app = express()

app.use(express.json())
app.use(cors())
require("dotenv").config()


const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(process.env.mongoURI, connectionParams)
.then(() => console.log("connected to DB"))
.catch((e) => console.log("Error:", e))

app.get("/", (req, res) => {
    res.send("Server is running")
})

app.post("/login", (req, res) => {
    const {email, password} = req.body 
    userModel.findOne({email: email})
    .then(user => {
        if(user){
            if(user.password === password){
                res.json("Success")
            }else{
                res.json("Incorresct Password")
            }
        }else{
            res.json("Invalid User")
        }
    })
})

app.post("/signup", (req, res) => {
    userModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.listen(process.env.PORT, () => {
    console.log("Server is running at http://localhost:3000")
})