import express from "express";
import {
  addBulkProjectsController,
  addProjectController,
  deleteProjectController,
  getProjectController,
  updateProjectController,
} from "../controller/projectController.js";

import {
  addExperienceController,
  updateExperienceController,
} from "../controller/experienceController.js";
import { addIntroController } from "../controller/introController.js";
import { getAllControllerMethod } from "../controller/getAllcontroller.js";
import { ratingsControllerMethod } from "../controller/ratingsController.js";
import {
  adminCreateController,
  adminLoginController,
} from "../controller/adminAuthController.js";
import { addSkillsController } from "../controller/addSkillsController.js";

const router = express.Router();

// get-data method
router.get("/get-data", getAllControllerMethod);
// intro method
router.post("/add-intro", addIntroController);
// skills method

router.post("/add-skill", addSkillsController);
// experience method
router.post("/add-experience", addExperienceController);
router.put("/update-experience/:id", updateExperienceController);
// project method
router.post("/add-project", addProjectController);
router.post("/add-bulk-projects", addBulkProjectsController);
router.put("/update-projects/:id", updateProjectController);
router.delete("/delete-projects/:id", deleteProjectController);
router.get("/get-project", getProjectController);
// Rating method
router.post("/post-rating", ratingsControllerMethod);
//admin-login
router.get("/admin-auth/login", adminLoginController);
router.post("/admin-auth/register", adminCreateController);

export default router;
