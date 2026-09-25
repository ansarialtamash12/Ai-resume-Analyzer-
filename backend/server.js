require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const resumeRoutes = require("./routes/resumeRoutes");
const path = require("path");


const app = express();

app.use(cors({origin: "http://localhost:5173",credentials:true,}));
app.use(express.json());
app.use("/uploads",express.static(path.join(__dirname,"uploads")))







app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes)











mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MONGOGDB CONNECTED"))
.catch(err=> console.log(err))

app.get("/", ( req, res) => {
    res.send("AI Resume Analyzer API Running")
})
const PORT = process.env.PORT || 6000;
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
})