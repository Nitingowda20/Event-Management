import bcrypt from "bcryptjs"
import UserModel from "../model/user_model.js"; // Adjust the import path as needed

// Service to create a new user
export const createUser = async (username, email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return newUser;
  } catch (error) {
    throw new Error("Error while creating user: " + error.message);
  }
};

// to find a user by username or email
export const findUser = async (username, email) => {
  try {
    let user;
    if (username) {
      user = await UserModel.findOne({ username });
    } else if (email) {
      user = await UserModel.findOne({ email });
    }
    return user;
  } catch (error) {
    throw new Error("Error while finding user: " + error.message);
  }
};

// Service to compare password
export const comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw new Error("Error while comparing passwords: " + error.message);
  }
};
