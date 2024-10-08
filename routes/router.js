import express from "express";
import { Intro, Experience, Projects } from "../models/portfolio.js";

const router = express.Router();

router.get("/get-data", async (req, res) => {
  try {
    const intros = await Intro.find();
    const experience = await Experience.find();
    const projects = await Projects.find();
    res.status(200).send({
      intro: intros[0],
      experience: experience,
      projects: projects,
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
    active: req.body.active || false,
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

router.put("/update-experience/:id", async (req, res) => {
  try {
    const updateExperience = await Experience.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updateExperience) {
      return res
        .status(404)
        .json({ message: "Experience not found", success: false });
    }
    res.status(200).json({
      data: updateExperience,
      success: true,
      message: "experience updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
});

router.post("/add-project", async (req, res) => {
  const technologiesArray = Array.isArray(req.body.technologies)
    ? req.body.technologies
    : req.body.technologies.split(",").map((tech) => tech.trim());

  const pro = new Projects({
    title: req.body.title,
    technologies: technologiesArray,
    project_image: req.body.project_image,
    github_link: req.body.github_link,
    live_link: req.body.live_link,
  });

  try {
    await pro.save();
    res.status(201).json({
      data: pro,
      success: true,
      message: "Projects added successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/add-bulk-projects", async (req, res) => {
  try {
    const projects = req.body.projects.map((proj) => ({
      title: proj.title,
      technologies: Array.isArray(proj.technologies)
        ? proj.technologies
        : proj.technologies.split(",").map((tech) => tech.trim()), // Ensure technologies are stored as an array
      project_image: proj.project_image,
      github_link: proj.github_link,
      live_link: proj.live_link,
    }));

    const savedProjects = await Projects.insertMany(projects);
    res.status(201).json({
      data: savedProjects,
      success: true,
      message: "Projects added successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
