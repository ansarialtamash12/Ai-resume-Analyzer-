import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const Analysis = () => {
  const { id } = useParams();

  const [resume, setResume] = useState(null);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    const res = await api.get(`/resume/${id}`);

    setResume(res.data);
  };

  if (!resume) return <div className="text-center mt-20">Loading...</div>;

  const analysis = resume.analysis;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white p-6 md:p-10">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold mb-3">Resume Analysis Report</h1>
        <p className="text-gray-400">AI- powered ATS and Resume Evaluation</p>
      </div>

      <div className="flex justify-center mb-10">
        <div className="bg-white/10 backdrop-blur-lg border border-gray-700 rounded-3xl p-10 shadow-2xl text-center w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6">ATS score</h2>
          <div className="w-40 h-40 mx-auto rounded-full border-8 border-green-500 flex items-center justify-center">
            <span className="text-5xl font-bold text-green-400">
              {analysis.score}%
            </span>
          </div>
          <p className="text-gray-400 mt-5">
            Resume Match Score
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">


        <div className="bg-white/10 backdrop-blur-lg border border-green-500/30 rounded-3xl p-6 shadow-lg">
          <h2 className="font-bold text-green-400 mb-4 text-2xl">Strengths</h2>

          <ul className="space-y-3">
            {analysis.strengths.map((item, index) => (
              <li
              className="bg-green-500/10 p-3 rounded-lg"
              key={index}>
                • {item}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-red-500/30 rounded-3xl p-6 shadow-lg">
          <h2 className="font-bold text-2xl text-red-400 mb-4">Missing Skills</h2>

          {analysis.missingSkills.length === 0 ? (
            <p className="text-green-400">
              No missing skills found 🎉
            </p>
          ) : (
            <ul className="space-y-3">
              {analysis.missingSkills.map((item, index) => (
                <li
                  key={index}
                  className="bg-red-500/10 p-3 rounded-lg"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-yellow-500/30 rounded-3xl p-6 shadow-lg">
          <h2 className="font-bold text-2xl text-yellow-400 mb-4">Improvements</h2>

          <ul className="space-y-3">
            {analysis.improvements.map((item, index) => (
              <li
              className="bg-yellow-500/10 p-3 rounded-lg"
              key={index}>• {item}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-blue-500/30 rounded-3xl p-6 shadow-lg">
          <h2 className="font-bold text-2xl text-blue-400 mb-4">Interview Questions</h2>

          <ul className="space-y-3">
            {analysis.interviewQuestions.map((item, index) => (
              <li
              className="bg-blue-500/10 p-3 rounded-lg"
              key={index}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-3xl p-8 shadow-lg">
        <h2 className="font-bold text-2xl text-purple-400 mb-4">
            Professional Summary</h2>

        <p
        className="text-gray-300 leading-relaxed text-lg"
        >{analysis.summary}</p>
      </div>
    </div>
  );
};

export default Analysis;
