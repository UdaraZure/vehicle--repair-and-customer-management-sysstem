const express = require('express');
const router = express.Router();
const { Offer } = require("../models")
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req,res) =>{
    const listOfOffers = await Offer.findAll();
    console.log(listOfOffers);
    res.json(listOfOffers);
});  

router.post("/",validateToken, async (req, res) =>{
    const OfferData = req.body;
    const username = req.user.username;
    OfferData.username = username;
    const createOffer = await Offer.create(OfferData); 
    res.json(createOffer); 
});

 
module.exports = router;