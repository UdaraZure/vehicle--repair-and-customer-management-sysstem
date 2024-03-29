const express = require('express');
const router = express.Router();
const { Employee } = require("../models")
const bcrypt = require('bcrypt');

const {sign} = require('jsonwebtoken')

const { validateToken } = require ('../middlewares/AuthMiddleware')

// Get all Employees
router.get("/", async (req, res) => {
  try {
    const listOfEmployees = await Employee.findAll();
    res.json(listOfEmployees);
  } catch (error) { 
    console.error('Error fetching Employees:', error);
    res.status(500).json({ error: 'Internal server error' });
  } 
});

router.get("/profile/:id", async (req, res) => {
  const {id} = req.params;
  try {
    const listOfEmployees = await Employee.findOne(
      {where: {EmployeeID: id}}
    );
    res.json(listOfEmployees);
  } catch (error) { 
    console.error('Error fetching Employees:', error);
    res.status(500).json({ error: 'Internal server error' });
  } 
});

        

// Create a new Employee
router.post("/", async (req, res) => {
  try {
    const EmployeeData = req.body;
    const hash = await bcrypt.hash(EmployeeData.Password, 10);
    const createdEmployee = await Employee.create({
      Role: EmployeeData.Role,
      EmpName: EmployeeData.EmpName,
      Address: EmployeeData.Address,
      TelNo: EmployeeData.TelNo,
      Email: EmployeeData.Email,
      NIC: EmployeeData.NIC,
      Gender: EmployeeData.Gender,
      BirthDay: EmployeeData.BirthDay,
      StartDate: EmployeeData.StartDate,
      EndDate: EmployeeData.EndDate,
      Password: hash,
      Status: EmployeeData.Status,
    });

    const EmployeeID = createdEmployee.EmployeeID; 
    res.json({ EmployeeID });
  } catch (error) {
    console.error('Error creating Employee:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update an Employee
router.put("/:EmployeeID", async (req, res) => {
  try {
    const EmployeeId = req.params.EmployeeID;
    const updatedEmployeeData = req.body;
    const [rowsUpdated] = await Employee.update(updatedEmployeeData, {
      where: { EmployeeID: EmployeeId } // Update the field name to match your database column name
    });
    if (rowsUpdated === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json({ message: 'Employee updated successfully' });
  } catch (error) {
    console.error('Error updating Employee:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Delete an Employee
router.delete("/:id", async (req, res) => {
    try {
      const EmployeeId = req.params.id;
      const rowsDeleted = await Employee.destroy({
        where: { EmployeeID: EmployeeId } // Update the field name to match your database column name
      });
      if (rowsDeleted === 0) {
        return res.status(404).json({ error: 'Employee not found' });
      }
      res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
      console.error('Error deleting Employee:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;
 