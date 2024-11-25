import { skills } from "../models/portfolio.js";

export const addSkillsController = async (req, res) => {
  try {
    const existingSkills = await skills.findOne({
      iconName: req.body.iconName,
      iconType: req.body.iconType,
    });
    if (existingSkills) {
      return res
        .status(400)
        .json({ message: "Skills already exists", success: false });
    }

    const saveSkills = new skills({
      iconName: req.body.iconName,
      iconType: req.body.iconType,
    });

    await saveSkills.save();
    res
      .status(201)
      .json({ message: "Skills saved successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to save skills", success: false });
  }
};
