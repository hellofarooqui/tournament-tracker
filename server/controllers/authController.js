import bcrypt from "bcrypt";
import User from "../models/user.js";
import { createUsername } from "../utils/createUsername.js";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("All fields are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error logging in", error });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      throw new Error("All fields are required");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        username: createUsername(firstName),
      firstName,
      lastName,
      email,
      password: encryptedPassword,
    });
    await newUser.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Error registering user", error });
  }
};

export const verifyToken = async (req, res) => {
  try {
  } catch (error) {}
};

export const getUserData = async (req,res) => {
    const token = req.token;
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        const user = await User.findById(userId).select('-password');
        if(!user){
            return res.status(400).json({message: "User not found"});
        }
        return res.status(200).json(user);
    }
    catch(error){
        console.error("Error fetching user data:", error);
        return res.status(500).json({message: "Error fetching user data"});
    }
}
