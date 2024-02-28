const express = require("express")
const cors = require("cors")

const app = express()

app.get("/", (req,res) => {
    res.send("Welcome home")
})

module.exports = app