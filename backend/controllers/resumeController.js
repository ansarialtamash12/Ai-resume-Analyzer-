const Resume = require("../models/Resume");
const pdfParse = require("pdf-parse");
const model = require("../utils/gemini");
const fs = require("fs");

//Resume Uploading Controller
exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: " no file uploaded",
      });
    }

    const pdfBuffer = fs.readFileSync(req.file.path);

    const pdfData = await pdfParse(pdfBuffer);

    const resume = await Resume.create({
      userId: req.user.id,
      resumeUrl: req.file.path,
      extractedText: pdfData.text,
    });

    res.status(201).json({
      message: "Resume Uploaded Successfully",
      resume,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//Getting User Resume
exports.getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({
      userId: req.user.id,
    });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.analyzeResume = async (req, res) => {
  try {
    const { jobDescription } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "Resume file required",
      });
    }

    const pdfBuffer = fs.readFileSync(req.file.path);

    const pdfData = await pdfParse(pdfBuffer);

    const resumeText = pdfData.text;

    

    const prompt = `
You are an expert ATS Resume Analyzer.

Resume Text:
${resumeText}

Job Description:
${jobDescription}

Analyze the resume against the job description and return ONLY valid JSON.

{
  "score": 85,
  "strengths": [],
  "missingSkills": [],
  "improvements": [],
  "summary": "",
  "interviewQuestions": []
}

Do not return markdown.
Do not return explanations.
Return JSON only.
`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    

    const cleanedResponse = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();


    const analysis = JSON.parse(cleanedResponse);

   
    const resume = await Resume.create({
      userId: req.user.id,
      resumeUrl: req.file.path,
      extractedText: resumeText,
      analysis,
    });
    res.status(200).json({
      message: "Resume Analyzed Successfully",
      resume,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }
    res.json(resume);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteResume = async(req, res) => {
  try{
    const resume = await Resume.findById(req.params.id);

    if(!resume){
      return res.status(404).json({
        message:"Resume not found",
      })
    }
    await Resume.findByIdAndDelete(req.params.id);

    res.json({
      message:"Resume deleted successfully",
    })
  }catch(error){
    res.status(500).json({
      message:error.message,
    })
  }
}