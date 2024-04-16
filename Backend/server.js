const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
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

app.post("/login", async (req, res) => {
    const {email, password} = req.body 
    try{
        const user = await userModel.findOne({email: email})
        if(!user){
            return res.status(404).json("Invalid User")
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json("Incorrect Password")
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '30d'})
        res.json({token: token})
    }catch(err){
        res.json(err)
    }
})

app.post("/signup", async (req, res) => {
    const {name, email, password} = req.body 
    try{
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new userModel({
            name, email, password: hashedPassword
        })
        const user = await newUser.save()
        res.status(201).json(user)
    }catch(err){
        res.json(err)
    }
})

app.listen(process.env.PORT, () => {
    console.log("Server is running at http://localhost:3000")
})