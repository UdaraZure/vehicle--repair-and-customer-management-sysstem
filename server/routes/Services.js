const express = require('express');
const router = express.Router();
const { service } = require("../models")

// Get all serviceTypes
router.get("/", async (req, res) => {
  try {
    const listOfServices = await Service.findAll();
    res.json(listOfServices);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get("/:JobID/:QuotationID", async (req, res) => {
  try {
    const JobID = req.params.JobID;
    const QuotationID = req.params.QuotationID;
    const listOfServices = await service.findAll({
      where: {JobID: JobID, QuotationID: QuotationID}
    });
    res.json(listOfServices);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// router.get("?JobID & QuotationID" , async (req, res) => {
//   try {
//     const jobID = req.params.JobID;
//     const quotationID = req.params.QuotationID;
//     const listOfServices = await service.findAll({
//       where: {JobID: jobID, QuotationID: quotationID}
//     });
//     res.json(listOfServices);
//   } catch (error) {
//     console.error('Error fetching services:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// Create a new service
router.post("/", async (req, res) => {
  try {
    const serviceData = req.body;
    const createdService = await service.create(serviceData);
    res.json(createdService);
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const serviceId = req.params.id;
    const serviceData = req.body;
    const Service = await service.findOne({
      where: { id: serviceId } // Update the field name to match your database column name
    });
    if (!Service) {
      return res.status(404).json({ error: 'The service could not be found.' });
    }
    await Service.update(serviceData, {
      where: { id: serviceId } // Update the field name to match your database column name
    });
    const updatedService = await service.findOne({
      where: { id: serviceId } // Update the field name to match your database column name
    });
    res.json(updatedService);
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Delete an service
router.delete("/:id", async (req, res) => {
    try {
      const serviceId = req.params.id;
      const rowsDeleted = await Service.destroy({
        where: { ServiceID: serviceId } // Update the field name to match your database column name
      });
      if (rowsDeleted === 0) {
        return res.status(404).json({ error: 'Service not found' });
      }
      res.json({ message: 'Service deleted successfully' });
    } catch (error) {
      console.error('Error deleting service:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

 
  
  
module.exports = router;

