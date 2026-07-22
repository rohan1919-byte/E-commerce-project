import userModel from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "something is missing",
      });
    }

    //check if user already exist
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        message: "user already exist",
      });
    }

    //Hash Password
    const hashPassword = await bcrypt.hash(password, 10);

    //create user
    const user = await userModel.create({
      name,
      email,
      password: hashPassword,
    });
    if (!user) {
      return res.status(400).json({
        message: "User registration failed",
      });
    }
    res.json({
      success:true,
      message: "user created succussfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

//Login page
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "user not found",
      });
    }

    //compare password
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(400).json({
        message: "invalid credentials",
      });
    }

    //generate jwt token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email:user.email
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "server error",
      success: false,
      error,
    });
  }
};
