import { createUser, findUser, comparePassword } from "../service/user_service.js"; // Adjust the import path as needed
import jwt from "jsonwebtoken";

// Registering a new user
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // check if user already exists
    const existingUser = await findUser(username, email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create the new user
    const newUser = await createUser(username, email, password);
    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    return res.status(500).json({ message: "Server Error: " + error.message });
  }
};

//  for user login
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await findUser(username);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "Login successful",
      token, // Return the token
      user: { username: user.username },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error: " + error.message });
  }
};


//Guest login
export const guestLogin = async(req , res) => { 
  try {
    const token = jwt.sign({ role: "guest" }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({
      message: "Guest login Success",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
}