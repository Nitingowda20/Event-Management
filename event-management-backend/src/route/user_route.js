import express from "express";
import {
  registerUser,
  loginUser,
  guestLogin,
} from "../controller/user_controller.js"; // Adjust the import path as needed

const router = express.Router();

// Route for user registration
router.post("/register", registerUser);

// Route for user login
router.post("/login", loginUser);

//Guest login
router.post("/guest-login", guestLogin);

export default router;
