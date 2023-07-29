const express = require('express');
const router = express.Router();
const { Offer } = require("../models")
const {validateToken} = require("../middlewares/AuthMiddleware");

// Get all offers
router.get("/", async (req, res) => {
  try {
    const listOfOffers = await Offer.findAll();
    res.json(listOfOffers);
  } catch (error) {
    console.error('Error fetching offers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new offer
router.post("/",validateToken, async (req, res) => {
  try {
    const offerData = req.body;

    const Email = req.user.Email;
    offerData.Email = Email; 

    const createdOffer = await Offer.create(offerData); 
    res.json(createdOffer);
  } catch (error) {
    console.error('Error creating offer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update an offer
router.put("/:id", async (req, res) => {
  try {
    const offerId = req.params.id;
    const updatedOfferData = req.body;
    const [rowsUpdated] = await Offer.update(updatedOfferData, {
      where: { id: offerId }
    });
    if (rowsUpdated === 0) {
      return res.status(404).json({ error: 'Offer not found' });
    }
    res.json({ message: 'Offer updated successfully' });
  } catch (error) {
    console.error('Error updating offer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete an offer
router.delete("/:id", async (req, res) => {
    try {
      const offerId = req.params.id;
      const rowsDeleted = await Offer.destroy({
        where: { OfferID: offerId } // Update the field name to match your database column name
      });
      if (rowsDeleted === 0) {
        return res.status(404).json({ error: 'Offer not found' });
      }
      res.json({ message: 'Offer deleted successfully' });
    } catch (error) {
      console.error('Error deleting offer:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
module.exports = router;
