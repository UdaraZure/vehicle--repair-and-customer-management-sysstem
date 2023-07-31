const express = require('express');
const router = express.Router();
const { Customer } = require("../models")

// Get all Customers
router.get("/", async (req, res) => {
  try {
    const listOfCustomers = await Customer.findAll();
    res.json(listOfCustomers);
  } catch (error) {
    console.error('Error fetching Customers:', error);
    res.status(500).json(error.message);
  } 
});

router.get("/CustomerDetails/:CustomerID", async (req, res) => {
  try {
    const CustomerID = req.params.CustomerID;
    const customer = await Customer.findAll({
      where: { CustomerID: CustomerID } // Update the field name to match your database column name
    });
    if (!customer) {
      return res.status(404).json({ error: 'The Customer could not be found.' });
    }
    else{
      res.json(customer);
    }
  } catch (error) {
    console.error('Error fetching Customer:', error);
    res.status(500).json(error.message);
  }
});

// Create a new Customer
router.post("/", async (req, res) => {
  try {
    const CustomerData = req.body;
    const createdCustomer = await Customer.create(CustomerData);
    const CustomerID = createdCustomer.CustomerID; // Assuming "CustomerID" is the property in the model

    res.json({ CustomerID });
  } catch (error) {
    console.error('Error creating Customer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Update an Customer
router.put("/CustomerDetails/:CustomerID", async (req, res) => {
  try {
    const CustomerId = req.params.CustomerID;
    const updatedCustomerData = req.body;
    const [rowsUpdated] = await Customer.update(updatedCustomerData, {
      where: { CustomerID: CustomerId }
    });
    if (rowsUpdated === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json({ message: 'Customer updated successfully' });
  } catch (error) {
    console.error('Error updating Customer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete an Customer
router.delete("/:id", async (req, res) => {
    try {
      const CustomerId = req.params.id;
      const rowsDeleted = await Customer.destroy({
        where: { CustomerID: CustomerId } // Update the field name to match your database column name
      });
      if (rowsDeleted === 0) {
        return res.status(404).json({ error: 'Customer not found' });
      }
      res.json({ message: 'Customer deleted successfully' });
    } catch (error) {
      console.error('Error deleting Customer:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
module.exports = router;
