const express = require("express");
const Job = require("../models/Job");
const { auth, allowRoles } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, allowRoles("employer"), async (req, res) => {
  try {
    const { title, description, location, type, salary } = req.body;

    const job = await Job.create({
      title,
      description,
      location,
      type,
      salary,
      employer: req.user.id,
    });

    res.status(201).json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { type, location } = req.query;
    const filter = {};

    if (type) filter.type = type;
    if (location) filter.location = location;

    const jobs = await Job.find(filter).populate("employer", "name email");
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
