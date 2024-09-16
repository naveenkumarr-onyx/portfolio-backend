import express from "express";
import Intro from "../models/portfolio.js";

const router = express.Router();

router.get("/get-portfolio-data", async (req, res) => {
  try {
    const intros = await Intro.find();
    res.status(200).send({
      intro: intros[0],
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/add-intro", async (req, res) => {
  const intro = new Intro({
    name: req.body.name,
    role: req.body.role,
  });
  try {
    await intro.save();
    res.status(201).json(intro);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
