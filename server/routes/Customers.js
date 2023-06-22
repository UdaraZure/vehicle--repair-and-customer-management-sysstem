const express = require('express');
const router = express.Router();
const { Customer } = require("../models")

router.get("/", async (req,res) =>{
    const listOfCustomers = await Customer.findAll();
    res.json(listOfCustomers);
});

router.post("/", async (req, res) =>{
    const customer = req.body;
    await Customer.create(customer); 
    res.json(customer); 
});


module.exports = router