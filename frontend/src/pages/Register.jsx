import { useState } from "react";
import api from "../services/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", formData);
     const result = await Swal.fire({
      title:" Success",
      text: "Registration Successfull",
      icon: "success",
      background: "#111827",
      color:"ffffff",
      confirmButtonColor:"#2563eb",
      confirmButtonText:" Go to Login",
     });
     if(result.isConfirmed){
      navigate("/");
     }
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message, "error");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 px-4 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-gray-700 rounded-3xl shadow-2xl p-8"
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-2">create Account</h2>
          <p className="text-gray-400">Join AI Resume Analyzer</p>
        </div>

        <div className="space-y-4">
          <input
            className="w-full bg-gray-900/70 border border-gray-600 text-white placeholder-gray-400 rounded-xl p-3 outline-none focus:border-blue-500 transition"
            placeholder="Name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <input
            className="w-full bg-gray-900/70 border border-gray-600 text-white placeholder-gray-400 rounded-xl p-3 outline-none focus:border-blue-500 transition"
            placeholder="Email"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            type="password"
            className="w-full bg-gray-900/70 border border-gray-600 text-white placeholder-gray-400 rounded-xl p-3 outline-none focus:border-blue-500 transition"
            placeholder="password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-300 shadow-lg">Register</button>
         
         <p className="text-center text-gray-400 mt-6 text-sm">
          Start analyzing resumes with AI
         </p>

      </form>
    </div>
  );
};

export default Register;
