const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

const {
  uploadResume,
  getUserResumes,
  analyzeResume,
  getResumeById,
  deleteResume,
} = require("../controllers/resumeController");

router.post("/upload", authMiddleware, upload.single("resume"), uploadResume);

// router.get("/my-resumes", authMiddleware, getUserResumes);

router.post("/analyze", authMiddleware, upload.single("resume"), analyzeResume);

router.get("/history", authMiddleware, getUserResumes);


router.get("/:id",authMiddleware,getResumeById);


router.delete("/:id",authMiddleware,deleteResume)

module.exports = router;
