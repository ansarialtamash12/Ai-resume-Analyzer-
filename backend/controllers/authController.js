const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//REGISTER
exports.register = async (req, res) => {
    try{
        const{ name, email, password } = req.body;
           

        const existingUser = await User.findOne({ email });
   

        if( existingUser){
            return res.status(400).json({
                message: "User already exists",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        res.status(201).json({
            message: " User Registerd Succesfully",
            user,
        });
    }catch(error){
        res.status(500).json({
            message: error.message,
        })
    }
};

//LOGIN 
exports.login = async (req, res ) => {
  try{
    const { email, password } = req.body;
    console.log("Email entered:", email);

    const user = await User.findOne({ email });
  
    if(!user){
        return res.status(400).json({
            message: "INVALID PASSWORD",
        })
    }
      console.log("User found:", user);

    const isMatch = await bcrypt.compare(
        password,
        user.password
    );
    console.log("Password entered:", password);
console.log("Stored hash:", user.password);
console.log("Match result:", isMatch);

    if(!isMatch){
        return res.status(400).json({
            message: "INAVLID PASSWORD",
        });
    }

    const token = jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
    res.status(200).json({
        message: "Login Successfull",
        token,
        user,
    });
  } catch (error){
    res.status(500).json({
        message: error.message,
    });
  }
};