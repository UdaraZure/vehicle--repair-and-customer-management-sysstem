const express = require('express');
const router = express.Router();
const { ServiceType } = require("../models")

// Get all serviceTypes
router.get("/", async (req, res) => {
  try {
    const listOfServiceTypes = await ServiceType.findAll();
    res.json(listOfServiceTypes);
  } catch (error) {
    console.error('Error fetching serviceTypes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new serviceType
router.post("/", async (req, res) => {
  try {
    const serviceTypeData = req.body;
    const createdServiceType = await ServiceType.create(serviceTypeData);
    res.json(createdServiceType);
  } catch (error) {
    console.error('Error creating serviceType:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update an serviceType
router.put("/:id", async (req, res) => {
  try {
    const serviceTypeId = req.params.id;
    const updatedServiceTypeData = req.body;
    const [rowsUpdated] = await ServiceType.update(updatedServiceTypeData, {
      where: { id: serviceTypeId }
    });
    if (rowsUpdated === 0) {
      return res.status(404).json({ error: 'ServiceType not found' });
    }
    res.json({ message: 'ServiceType updated successfully' });
  } catch (error) {
    console.error('Error updating serviceType:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete an serviceType
router.delete("/:id", async (req, res) => {
    try {
      const serviceTypeId = req.params.id;
      const rowsDeleted = await ServiceType.destroy({
        where: { ServiceTypeID: serviceTypeId } // Update the field name to match your database column name
      });
      if (rowsDeleted === 0) {
        return res.status(404).json({ error: 'ServiceType not found' });
      }
      res.json({ message: 'ServiceType deleted successfully' });
    } catch (error) {
      console.error('Error deleting serviceType:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
module.exports = router;
