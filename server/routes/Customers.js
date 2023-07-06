const express = require('express');
const router = express.Router();
const { Customer } = require("../models")
const bcrypt = require("bcrypt");

router.get("/", async (req,res) =>{
    const listOfCustomers = await Customer.findAll();
    res.json(listOfCustomers);
});

// router.post("/", async (req, res) =>{
//     const customer = req.body;
//     await Customer.create(customer); 
//     res.json(customer); 
// });

router.post("/", async (req, res) =>{
    const { mobileNumber, Password } = req.body;
    bcrypt.hash(Password, 10).then((hash) => {
            Customer.create({
                mobileNumber: mobileNumber,
                Password: hash,
            }); 
                res.json("Customer created!");    
        })
    });

module.exports = router;