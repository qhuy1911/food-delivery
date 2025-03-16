import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import {Request, Response} from "express";
import userModel from "../models/userModel";

//login user
const loginUser = async (req: Request, res: Response) => {
  const {email, password} = req.body;
  try {
    const user = await userModel.findOne({email});
    if (!user) {
      res.json({
        success: false,
        message: "User doesn't exist",
      });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.json({
        success: false,
        message: "Invalid credentials",
      });
      return;
    }

    const token = createToken(user._id);
    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

const createToken = (id: string) =>
  jwt.sign({id}, process.env.JWT_SECRET || "");

// register user
const registerUser = async (req: Request, res: Response) => {
  const {name, password, email} = req.body;
  try {
    // checking is user already exists
    const exists = await userModel.findOne({email});
    if (exists) {
      res.json({
        success: false,
        message: "User already exists",
      });
      return;
    }

    // validating email format
    if (!validator.isEmail(email)) {
      res.json({
        success: false,
        message: "Please enter a valid email",
      });
      return;
    }

    // validating strong password
    if (password.length < 8) {
      res.json({
        success: false,
        message: "Please enter a strong password",
      });
      return;
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "",
    });
  }
};

export {loginUser, registerUser};
