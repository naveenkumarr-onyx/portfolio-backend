import { admin } from "../models/admin.js";

const adminAuthController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const adminCredentials = new admin({
      email: email,
      password: password,
    });
    await adminCredentials.save();
    return res.status(201).json({
      mesaage: "Admin created successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating admin",
      sucess: false,
    });
  }
};

export default adminAuthController;
