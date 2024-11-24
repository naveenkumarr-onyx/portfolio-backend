import path from "path"; // Ensure path module is imported
import { ratings } from "../models/portfolio.js";
import nodemailer from "nodemailer";
import express from "express";
import { fileURLToPath } from "url"; // Import 'fileURLToPath' from 'url'

const app = express();
// Correctly define __filename and __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

export const ratingsControllerMethod = async (req, res) => {
  const { email, rating, feedback, name } = req.body;

  try {
    // Check if a rating already exists for the user
    const existingRating = await ratings.findOne({ email });
    if (existingRating) {
      return res.status(400).json({
        message: "Rating already exists for this user",
        success: false,
      });
    }

    // Save the new rating
    const newrating = new ratings({
      name: name,
      email: email,
      rating: [
        {
          score: rating,
        },
      ],
      feedback: feedback,
    });
    await newrating.save();

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
      logger: true,
      debug: true,
    });

    // Configure email options
    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: "Thank you for your rating",
      text: `Hi ${name || email},

Thank you for your rating. Your feedback is valuable to us and will be reviewed for future improvements.

Best regards,
Naveenkumar`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error occurred while sending email:", error);
      } else {
        console.log("Email sent successfully:", info.response);
      }
    });

    // Serve the Thank You page
    const thankYouPagePath = path.join(
      __dirname,
      "..",
      "public",
      "thank_you.html"
    );

    return res.status(200).sendFile(thankYouPagePath);
  } catch (error) {
    // Handle errors
    console.error("Error in ratingsControllerMethod:", error);
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
