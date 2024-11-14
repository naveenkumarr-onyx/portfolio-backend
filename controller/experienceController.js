import { experiences } from "../models/portfolio.js";

const addExperienceController = async (req, res) => {
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
};

const updateExperienceController = async (req, res) => {
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
};

export { updateExperienceController, addExperienceController };
