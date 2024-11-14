import { intro } from "../models/portfolio.js";

export const addIntroController = async (req, res) => {
  const intro_ = new intro({
    name: req.body.name,
    role: req.body.role,
  });
  try {
    await intro_.save();
    res.status(201).json({
      message: "Intro saved successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
