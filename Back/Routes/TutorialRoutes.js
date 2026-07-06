import express from "express";
import TutorialControllers from "../Controllers/TutorialControllers.js";
import authMiddleware from "../Middlewares/authMiddleware.js";  
import adminMiddleware from "../Middlewares/adminMiddlewares.js";

const router = express.Router();

router.post("/ceate", authMiddleware,adminMiddleware, TutorialControllers.createTutorial);
router.delete("/delete", authMiddleware, adminMiddleware, TutorialControllers.deleteTutorial);
router.put("/update", authMiddleware, adminMiddleware, TutorialControllers.updateTutorial);
router.get("/All", authMiddleware, adminMiddleware, TutorialControllers.getAllTutorials);
export default router;  