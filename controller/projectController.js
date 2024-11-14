import { projects } from "../models/portfolio.js";

const getProjectController = async (req, res) => {
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
};

const deleteProjectController = async (req, res) => {
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
};

const updateProjectController = async (req, res) => {
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
};

const addProjectController = async (req, res) => {
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
};

const addBulkProjectsController = async (req, res) => {
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
};

export {
  getProjectController,
  deleteProjectController,
  updateProjectController,
  addProjectController,
  addBulkProjectsController,
};
