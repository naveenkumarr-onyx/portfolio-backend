import { Admin } from "../models/admin.js";
import CryptoJS from "crypto-js";

export const adminLoginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
        success: false,
      });
    }

    // Hash the input password to compare with the stored hash
    const hashedPassword = CryptoJS.SHA256(password).toString();

    // Compare the hashed input password with the stored hashed password
    if (hashedPassword !== admin.password) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    // Successful login
    return res.status(200).json({
      data: admin,
      message: "Login successful",
      success: true,
    });
  } catch (error) {
    console.error("Error during login:", error); // Debugging purposes
    res.status(500).json({
      message: "Error during login",
      success: false,
    });
  }
};

export const adminCreateController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = CryptoJS.SHA256(password).toString();
    const createAdmin = new Admin({
      email: email,
      password: hashedPassword,
    });
    await createAdmin.save();
    return res.status(200).json({
      message: "Admin Registered successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error during registration:", error); // Log for debugging
    res.status(500).json({
      message: "Error during registration",
      success: false,
    });
  }
};

export const adminGetController = async (req, res) => {
  try {
    const admin = await Admin.find();
    return res.status(200).json({
      data: admin,
      success: true,
      message: "admin fetched successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching admin",
    });
  }
};
