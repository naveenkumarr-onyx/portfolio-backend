import express from "express";
import { intro, experiences, projects, skills } from "../models/portfolio.js";

const router = express.Router();

// get-data method
router.get("/get-data", async (req, res) => {
  try {
    const intros = await intro.find();
    const experience = await experiences.find();
    const project = await projects.find();
    const skill = await skills.find();
    res.status(200).send({
      intro: intros[0],
      experience: experience,
      project: project,
      skill: skill,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// intro method
router.post("/add-intro", async (req, res) => {
  const intro = new intro({
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

// experience method
router.post("/add-experience", async (req, res) => {
  const experience = new experiences({
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
    const updateExperience = await experiences.findByIdAndUpdate(
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

// project method
router.post("/add-project", async (req, res) => {
  const technologiesArray = Array.isArray(req.body.technologies)
    ? req.body.technologies
    : req.body.technologies.split(",").map((tech) => tech.trim());

  const pro = new projects({
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

    const savedProjects = await projects.insertMany(projects);
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

router.put("/update-projects/:id", async (req, res) => {
  try {
    const updateProject = await projects.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updateProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }
    res.status(200).json({
      data: updateProject,
      success: true,
      message: "Project updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
});

router.delete("/delete-projects/:id", async (req, res) => {
  try {
    const deleteProject = await projects.findByIdAndDelete(req.params.id, {
      runValidators: true,
    });
    if (!deleteProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }
    res.status(200).json({
      message: "project delete Sucessfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
});

router.get("/get-project", async (req, res) => {
  try {
    const getProjects = await projects.find();
    res.status(200).json({
      data: getProjects,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
});

// skill method
router.post("/add-skill", async (req, res) => {
  try {
    const existingSkill = await skills.findOne({
      iconName: req.body.iconName,
    });
    if (existingSkill) {
      return res.status(400).json({
        success: false,
        message: "Skill already exists",
      });
    }
    const newskills = new skill({
      iconName: req.body.iconName,
    });
    await newskills.save();
    res.status(201).json({
      data: newskills,
      success: true,
      message: "skill added successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
