const express = require('express');
const router = express.Router();
const { Offer } = require("../models")

// router.get("/", async (req,res) =>{
//     const listOfOffers = await Offers.findAll();
//     res.json(listOfOffers);
// });

router.post("/", async (req, res) =>{
    const Offer = req.body;
    const createOffer = await Offer.create(Offer); 
    res.json(createOffer); 
});


module.exports = router