import { ratings } from "../models/portfolio.js";

export const ratingsControllerMethod = async (req, res) => {
  const { email, rating } = req.body;
  try {
    const existingRating = await ratings.findOne({ email });
    if (existingRating) {
      return res.status(400).json({
        message: "Rating alreaady exists for this user",
        success: false,
      });
    }

    const newrating = new ratings({
      email: email,
      rating: [
        {
          score: rating,
        },
      ],
    });
    await newrating.save();
    return res.status(200).json({
      message: "Rating submitted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
