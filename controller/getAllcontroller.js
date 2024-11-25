import { experiences, intro, projects, skills } from "../models/portfolio.js";

export const getAllControllerMethod = async (req, res) => {
  try {
    const intros = await intro.find();
    const experience = await experiences.find();
    const project = await projects.find();
    const skill_ = await skills.find();
    res.status(200).send({
      intro: intros[0],
      experience: experience,
      project: project,
      skills_res: skill_,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
