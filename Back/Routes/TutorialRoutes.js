/**
 * TutorialRoutes.js
 * -----------------
 * Todas as rotas de tutorial exigem admin (authMiddleware + adminMiddleware).
 *   POST   /Tutorial/create/tutorial       { Title, Description }
 *   DELETE /Tutorial/delete/tutorial/:id
 *   PUT    /Tutorial/update/tutorial/:id   { Title, Description }
 *   GET    /Tutorial/All/tutorial
 */
import express from "express";
import TutorialControllers from "../Controllers/TutorialControllers.js";
import authMiddleware from "../Middlewares/authMiddleware.js";
import adminMiddleware from "../Middlewares/adminMiddlewares.js";

const router = express.Router();

router.post("/create/tutorial", authMiddleware, adminMiddleware, TutorialControllers.createTutorial);

// Antes: "/delete/tutorial" e "/update/tutorial" (sem :id), então
// req.params.id chegava sempre undefined no Controller. Agora o id vai na
// própria URL: /Tutorial/delete/tutorial/<id> e /Tutorial/update/tutorial/<id>
router.delete("/delete/tutorial/:id", authMiddleware, adminMiddleware, TutorialControllers.deleteTutorial);
router.put("/update/tutorial/:id", authMiddleware, adminMiddleware, TutorialControllers.updateTutorial);

router.get("/All/tutorial", authMiddleware, adminMiddleware, TutorialControllers.getAllTutorials);

export default router;