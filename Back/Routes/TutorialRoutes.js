import express from "express";
import TutorialControllers from "../Controllers/TutorialControllers.js";
import authMiddleware from "../Middlewares/authMiddleware.js";
import adminMiddleware from "../Middlewares/adminMiddlewares.js"; 

const router = express.Router();

router.post("/create/tutorial", authMiddleware, adminMiddleware, TutorialControllers.createTutorial);
router.delete("/delete/tutorial/:id", authMiddleware, adminMiddleware, TutorialControllers.deleteTutorial);
router.put("/update/tutorial/:id", authMiddleware, adminMiddleware, TutorialControllers.updateTutorial);
router.get("/All/tutorial", authMiddleware, adminMiddleware, TutorialControllers.getAllTutorials);

export default router;