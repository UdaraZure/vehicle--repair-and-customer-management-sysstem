const express = require('express');
const router = express.Router();
const { ServiceType } = require("../models");

// Get all ServiceTypes
router.get("/", async (req, res) => {
  try {
    const listOfServiceTypes = await ServiceType.findAll();
    res.json(listOfServiceTypes);
  } catch (error) {
    console.error('Error fetching Service Types:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new ServiceType
router.post("/", async (req, res) => {
  try {
    const ServiceTypeData = req.body;
    const createdServiceType = await ServiceType.create(ServiceTypeData);
    res.json(createdServiceType);
  } catch (error) {
    console.error('Error creating ServiceType:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update an ServiceType
router.put("/:id", async (req, res) => {
  try {
    const ServiceTypeId = req.params.id;
    const updatedServiceTypeData = req.body;
    const [rowsUpdated] = await ServiceType.update(updatedServiceTypeData, {
      where: { id: ServiceTypeId } // Update the field name to match your database column name
    });
    if (rowsUpdated === 0) {
      return res.status(404).json({ error: 'ServiceType not found' });
    }
    res.json({ message: 'ServiceType updated successfully' });
  } catch (error) {
    console.error('Error updating ServiceType:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete an ServiceType
router.delete("/:id", async (req, res) => {
  try {
    const ServiceTypeId = req.params.id;
    const rowsDeleted = await ServiceType.destroy({
      where: { id: ServiceTypeId } // Update the field name to match your database column name
    });
    if (rowsDeleted === 0) {
      return res.status(404).json({ error: 'ServiceType not found' });
    }
    res.json({ message: 'ServiceType deleted successfully' });
  } catch (error) {
    console.error('Error deleting Service Type:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;


