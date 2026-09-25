import { useState } from "react";
import api from "../services/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const UploadResume = () => {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      return Swal.fire({
        title: "No Resume Selected",
        text: "Plaese upload a PDF resume.",
        icon: "warning",
        background: "#111827",
        color: "#fff",
        confirmButtonColor: "#2563eb",
      });
    }
    setLoading(true);

    const formData = new FormData();

    formData.append("resume", file);
    formData.append("jobDescription", jobDescription);

    try {
      const res = await api.post("/resume/analyze", formData);

      const result = await Swal.fire({
        title: "Analysis Complete",
        text: "Your resume has been analyzed successfully.",
        icon: "success",
        background: "#111827",
        color: "#fff",
        confirmButtonColor: "#2563eb",
        confirmButtonText: "View Report",
      });
      if (result.isConfirmed) {
        navigate(`/analysis/${res.data.resume._id}`);
      }
    } catch (error) {
      Swal.fire({
        title: "Analysis Failed",
        text:
          error.response?.data?.message ||
          "Something went wrong. please try again.",
        icon: "error",
        background: "#111827",
        color: "#fff",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen px-4 bg-gradient-to-br from-gray-950 via-black to-gray-900 flex justify-center items-center  py-10">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl"></div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-3xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 md:p-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mb-5">
            <span className="text-4xl">📄</span>
          </div>
          <h2 className="text-4xl md:text-5xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-bold ">
            AI Resume Analyzer
          </h2>
          <p className="text-gray-400 mt-4 text-lg">
            Upload your resume and paste the job description to get an AI-
            powered ATS analysis.
          </p>
        </div>

        <div className="mb-8">
          <label className="block text-gray-300 font-medium mb-3">
            Resume(PDF)
          </label>
          <div className="border-2 border-dashed border-gray-600 rounded-2xl p-10 text-center bg-gray-900/50 hover:border-blue-500 transition-all duration-300">
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full text-gray-300"
            />
            {file && <p className="text-green-400 mt-3">📄 {file.name}</p>}
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-gray-300 font-medium mb-3">
            Job Description
          </label>
          
          <textarea
            rows="8"
            className="w-full bg-gray-900/70 border border-gray-700 text-white rounded-2xl p-5 outline-none transition-all duration-300 focus:border-blue-500 "
            placeholder="Paste the Job Description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
         
         />
          
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-2xl  duration-300 text-white font-semibold text-lg  shadow-xl transition-all
         ${
           loading
             ? "bg-gray-700 cursor-not-allowed"
             : "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:shadow-blue-500/30"
         }`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-3">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Analyzing Resume...
            </div>
          ) : (
            "🚀Analyze Resume"
          )}
        </button>
      </form>
    </div>
  );
};
export default UploadResume;
