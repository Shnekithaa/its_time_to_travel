const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const userRoutes = require('./routes/userRoutes')
const app = express()

app.use(express.json())
app.use('/Images', express.static('Public/Images'))
app.use(cors())
app.use('/', userRoutes)
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

app.listen(process.env.PORT, () => {
    console.log("Server is running at http://localhost:3000")
})