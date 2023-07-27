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

router.get('/profile', validateToken, async (req, res) => {
  try {
    const userId = req.user.userId; // Assuming 'userId' is the key containing the user ID in the JWT payload
    const employee = await Employee.findByPk(userId); // Assuming 'Employee' model has 'findByPk' method

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // You can exclude sensitive fields like 'Password' from the response if needed
    const { Password, ...employeeData } = employee.toJSON();

    res.json(employeeData);
  } catch (error) {
    console.error('Error fetching Employee details:', error);
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
router.put("/:id", async (req, res) => {
  try {
    const EmployeeId = req.params.id;
    const updatedEmployeeData = req.body;
    const [rowsUpdated] = await Employee.update(updatedEmployeeData, {
      where: { id: EmployeeId }
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
 