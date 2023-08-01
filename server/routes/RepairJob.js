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

router.get("/getJobByEmployeeID/:EmployeeID", async (req, res) => {
  try {
    const employeeID = req.params.EmployeeID; // Retrieve the EmployeeID from the URL parameter
    const job = await Job.findAll({
      where: {
        EmployeeID: employeeID
      }
    });
    
    res.json(job);
    
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get("/:JobID", async (req, res) => {
  try {
    const jobID = req.params.JobID; // Retrieve the JobID from the URL parameter
    const job = await Job.findAll({
      where: {
        JobID: jobID
      }
    });
    
    res.json(job);
    
  } catch (error) {
    console.error('Error fetching job:', error);
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

router.put("/:JobID", async (req, res) => {
  try {
    const jobData = await Job.findOne({ where: { JobID: req.params.JobID } });
    if (jobData) {
      await jobData.update(req.body);
      res.status(200).json(jobData);
    } else {
      res.status(404).json({ message: "Job not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/updateJobStatus/:QuotationID", async (req, res) => {
  try {
    const jobData = await Job.findOne({ where: { QuotationID: req.params.QuotationID } });
    if (jobData) {
      await jobData.update(req.body);
      res.status(200).json(jobData);
    } else {
      res.status(404).json({ message: "Job not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

