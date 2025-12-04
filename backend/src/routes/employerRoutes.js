const express = require("express");
const { auth, allowRoles } = require("../middleware/authMiddleware");
const Job = require("../models/Job");
const Application = require("../models/Application");

const router = express.Router();

router.post("/jobs/:id/apply", auth, allowRoles("applicant"), async (req, res) => {
  try {
    const jobId = req.params.id;
    const { resumeLink, comment } = req.body;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const existing = await Application.findOne({
      job: jobId,
      applicant: req.user.id,
    });

    if (existing) {
      return res
        .status(400)
        .json({ message: "You already applied to this job" });
    }

    const application = await Application.create({
      job: jobId,
      applicant: req.user.id,
      resumeLink,
      comment,
    });

    res.status(201).json(application);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get(
  "/employer/applications",
  auth,
  allowRoles("employer"),
  async (req, res) => {
    try {
      const applications = await Application.find()
        .populate({
          path: "job",
          match: { employer: req.user.id },
        })
        .populate("applicant", "name email");

      
      const filtered = applications.filter((app) => app.job !== null);

      res.json(filtered);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);


router.get(
  "/applicant/applications",
  auth,
  allowRoles("applicant"),
  async (req, res) => {
    try {
      const applications = await Application.find({
        applicant: req.user.id,
      }).populate("job");

      res.json(applications);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// UPDATE application status (Employer only)
router.patch(
  "/applications/:id/status",
  auth,
  allowRoles("employer"),
  async (req, res) => {
    try {
      const { status } = req.body;

      const application = await Application.findById(req.params.id)
        .populate("job");

      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }

      // Ensure employer owns the job
      if (application.job.employer.toString() !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      application.status = status;
      await application.save();

      res.json(application);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);


module.exports = router;
