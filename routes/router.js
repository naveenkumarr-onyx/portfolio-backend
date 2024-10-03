import express from "express";
import { Intro, Experience } from "../models/portfolio.js";

const router = express.Router();

router.get("/get-data", async (req, res) => {
  try {
    const intros = await Intro.find();
    const experience = await Experience.find();
    res.status(200).send({
      intro: intros[0],
      experience: experience,
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

router.post("/add-experience", async (req, res) => {
  const experience = new Experience({
    company: req.body.company,
    location: req.body.location,
    position: req.body.position,
    period: req.body.period,
    mode: req.body.mode,
    description: req.body.description || null,
  });
  try {
    await experience.save();
    res.status(201).json({
      data: experience,
      success: true,
      message: "experience updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.put();

export default router;
