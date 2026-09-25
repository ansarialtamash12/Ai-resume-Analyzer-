import { useState } from "react";
import api from "../services/api";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", formData);
      localStorage.setItem("token", res.data.token);
       
      const result = await Swal.fire({
        title:"Success",
        text:"Login Successful",
        icon:"success",
        background:"#111827",
        color:"ffffff",
        confirmButtonColor:"#2563eb",
        confirmButtonText:"Go to Dashboard",
      })
      if(result.isConfirmed){
        navigate("/dashboard")
      }
      
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message, "error");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-linear-to-br from-gray-950 via-black to-gray-900 px-4">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl"></div>

          <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white">
            Welcome Back
          </h1>
          <p className="text-gray-400 mt-2">
            Login to AI Resume Analyzer
          </p>
         
          </div>
   

      <form onSubmit={handleSubmit} className="space-y-6">
        
         <div className="mb-5">
          <label className="block text-gray-300 mb-2">
            Email
          </label>
          <input
          type="email"
          className="w-full px-4 py-3 rounded-xl bg-gray-900/70 border border-gray-700 text-white outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          placeholder="Enter your email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
         </div>
         <div className="mb-5">
          <label className="block text-gray-300 mb-2">
            Password
          </label>
          <input
          type="password"
          className="w-full px-4 py-3 rounded-xl bg-gray-900/70 border border-gray-700 text-white outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          placeholder="Enter your password"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
         </div>
        
        
        <button 
        type="submit"
        className="w-full py-4 rounded-xl text-white font-semibold  shadow-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.02] transition-all duration-300">
            Login
        </button>
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Dont't have an account?{" "}
            <Link 
            to="/register" 
            className="text-blue-400 hover:text-blue-300 font-semibold transition">
              Register
            </Link>
          </p>
        </div>
      </form>
       </div>
    </div>
  );
};

export default Login;
