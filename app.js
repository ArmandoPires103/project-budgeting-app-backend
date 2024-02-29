//Dependencies
const express = require("express")
const cors = require("cors")
// Configuration
const app = express();

const transactionsController = require("./controllers/transactions.controller.js")
// CORS
app.use(cors());

app.use(express.json()); 

//MIDDLEWARE FOR CONTROLLERS
app.use("/transactions", transactionsController)

// Routes
app.get ('/', (req, res) => {
    res.send("Welcome")
})

// 404 PAGE
app.get("*", (req, res) => {
    res.json({ error: "Page not found" });
});

module.exports = app;