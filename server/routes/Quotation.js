const express = require("express");
const router = express.Router();
const { quotation } = require("../models");

// Create a new quotation
router.post("/", async (req, res) => {
  try {
    const newQuotation = await quotation.create(req.body);
    res.status(201).json(newQuotation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:QuotationID/Feedback1", async (req, res) => {
  try {
    const quotationData = await quotation.findOne({ where: { QuotationID: req.params.QuotationID } });
    if (quotationData) {
      await quotationData.update(req.body);
      res.status(200).json(quotationData);
    } else {
      res.status(404).json({ message: "Quotation not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all quotations
router.get("/", async (req, res) => {
  try {
    const quotations = await quotation.findAll();
    res.status(200).json(quotations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get a quotation by ID
router.get("/?QuotationID", async (req, res) => {
  try {
    const quotation = await quotation.findByPk(req.params.QuotationID);
    if (quotation) {
      res.status(200).json(quotation);
    } else {
      res.status(404).json({ message: "Quotation not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.get("/getQuotations/:JobID", async (req, res) => {
  try {
    const JobID = req.params.JobID;
    const Quotation = await quotation.findAll({
      where: {
        JobID: JobID
      }

    });

    if (Quotation.length > 0) {
      res.status(200).json("true");
    } else {
      res.status(404).json("false");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update a quotation by ID
router.put("/:QuotationID", async (req, res) => {
  try {
    const quotationData = await quotation.findOne({ where: { QuotationID: req.params.QuotationID } });
    if (quotationData) {
      await quotationData.update(req.body);
      res.status(200).json(quotationData);
    } else {
      res.status(404).json({ message: "Quotation not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a quotation by ID
router.delete("/:id", async (req, res) => {
  try {
    const quotation = await quotation.findByPk(req.params.id);
    if (quotation) {
      await quotation.destroy();
      res.status(204).json({ message: "Quotation deleted successfully" });
    } else {
      res.status(404).json({ message: "Quotation not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;