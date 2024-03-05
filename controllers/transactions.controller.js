const express = require("express")

const transactions = express.Router()

let transactionsArray = require("../models/transaction.model.js")

//Routes
// GET ALL
transactions.get("/", (req, res) => {
    // THE RESPONSE WITH ALL THE TRANSACTIONS STORED IN TRANSACTIONS ARRAY
    res.status(200).json({ transactions: transactionsArray });
})
// GET ONE
transactions.get("/:id", (req,res) => {
    // WHEN REQUEST IS RECEIVED IT EXTRACTS THE ID PARAMETER FROM URL
    const { id} = req.params
    // IT THEN SEARCHES FOR THE TRANSACTION TO MATCH THE ID
    const transaction = transactionsArray.find((transaction) => transaction.id === +id)
    // ONCE FOUND IT RESPONSE WITH TRANSACTION DETAILS MATCHING THE ID
    res.json ({ transaction })
})

// SERVER RECEIVES A POST REQUEST WITH THE DATA IN REQUEST BODY
transactions.post("/", (req, res) => {
    // THE SERVER GENERATES A NEW ID FOR THE NEW ENTRY.
    const id = transactionsArray[transactionsArray.length - 1].id + 1
    // THE SERVER THEN ADDS NEW ID TO THE REQUEST BODY
    req.body.id = id
    // ONCE THE ID IS IN THE REQUEST BODY THE SERVER ADDS THE ID TO THE DATA ARRAY
    transactionsArray.push(req.body)
    // FINALLY SERVER SENDS BACK A RESPONSE TO THE CLIENT.
    res.status(200).json({ transactions: transactionsArray });
})

// SERVER RECEIVES A UPDATE TRANSACTIONS
transactions.put("/:id", (req, res) => {
    // WHEN REQUEST IS RECEIVED IT EXTRACTS THE ID PARAMETER FROM URL
    const { id } = req.params;
    // FIND THE INDEX OF THE TRANSACTION WITH THE MATCHING ID IN THE transactionsArray
    const transactionIndex = transactionsArray.findIndex((log) => log.id === +id);
    // IF THE TRANSACTION WITH THE SPECIFIED ID EXISTS, UPDATE IT
    if (transactionIndex > -1) transactionsArray[transactionIndex] = req.body;
    // SEND BACK THE UPDATED transactionsArray
    res.json({ transactions: transactionsArray });
  });

// SERVER RECEIVES A DELETE TRANSACTION REQUEST
transactions.delete("/:id", (req, res) => {
    // EXTRACT THE ID PARAMETER FROM THE URL
    const { id } = req.params;
    // FILTER OUT THE TRANSACTION WITH THE MATCHING ID
    transactionsArray = transactionsArray.filter((transaction) => transaction.id !== +id);
    // SEND BACK THE UPDATED transactionsArray AFTER DELETION
    res.json({ transactions: transactionsArray });
});

module.exports = transactions