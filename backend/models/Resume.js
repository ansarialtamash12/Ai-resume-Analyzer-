const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    resumeUrl: String,

    extractedText: String,

    analysis: {
      score: Number,

      strengths: [String],

      missingSkills: [String],

      improvements: [String],

      summary: String,

      interviewQuestions: [String],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Resume", resumeSchema);
