import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

const History = () => {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    const res = await api.get("/resume/history");
    setResumes(res.data);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Resume History</h1>

      <div className="grid gap-6">
        {resumes.map((resume) => (
          <div
            key={resume._id}
            className="bg-gray-900 border border-gray-700 rounded-2xl p-6"
          >
            <h2 className="text-xl font-semibold">
              ATS Score:
              <span className="text-green-400 ml-2">
                {resume.analysis?.score || 0}%
              </span>
            </h2>
            <p className="text-gray-400 mt-2">
              Uploaded: {new Date(resume.createdAt).toLocaleDateString()}
            </p>
            <Link
              to={`/analysis/${resume._id}`}
              className="inline-block mt-4 bg-blue-600 px-4 py-2 rounded-lg"
            >
              View Analysis
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
