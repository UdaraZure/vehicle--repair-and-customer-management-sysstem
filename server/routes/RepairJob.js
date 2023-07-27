const express = require('express');
const router = express.Router();
const { Job } = require("../models")
const {validateToken} = require("../middlewares/AuthMiddleware");

// Get all jobs
router.get("/", async (req, res) => {
  try {
    const listOfJobs = await Job.findAll();
    res.json(listOfJobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new job
router.post("/", async (req, res) => {
    const jobData = req.body;
    const createdJob = await Job.create(jobData); 
    res.json(createdJob);

});
 
module.exports = router;
