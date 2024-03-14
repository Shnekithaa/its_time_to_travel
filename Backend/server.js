const express = require("express")
const app = express()

require("dotenv").config()

app.get("/", (req, res) => {
    res.send("Server is running")
})

app.listen(process.env.PORT, () => {
    console.log("Server is running at http://localhost:3000")
})