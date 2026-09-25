
const Navabr = () => {
  return (
    <div>
      <nav className="flex justify-between items-center px-8 py-6 ">
            <h1 className="text-3xl  font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {" "}
              AI Resume Analyzer
            </h1>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/";
              }}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
            >
              Logout
            </button>
          </nav>
    </div>
  )
}

export default Navabr
