const express = require('express');
const router = express.Router();
const { Offer } = require("../models")

router.get("/", async (req,res) =>{
    const listOfOffers = await Offer.findAll();
    console.log(listOfOffers);
    res.json(listOfOffers);
});  

router.post("/", async (req, res) =>{
    const OfferData = req.body;
    const createOffer = await Offer.create(OfferData); 
    res.json(createOffer); 
});

 
module.exports = router;