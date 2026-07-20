/**
 * UserRoutes.js
 * -------------
 *   PUT    /User/me   — atualizar a própria conta (precisa estar logado)
 *   DELETE /User/me   — excluir a própria conta (precisa estar logado)
 *   GET    /User/all  — listar todos os usuários (só admin)
 *
 * "GET /all" ganhou adminMiddleware nesta revisão: antes, qualquer
 * pessoa logada conseguia listar todos os usuários do sistema — dado
 * sensível demais para não ter essa proteção extra.
 */
import express from "express";
import UserControllers from "../Controllers/UserControllers.js";
import authMiddleware from "../Middlewares/authMiddleware.js";
import adminMiddleware from "../Middlewares/adminMiddlewares.js";

const router = express.Router();

router.put("/me", authMiddleware, UserControllers.updateMe);
router.delete("/me", authMiddleware, UserControllers.DeleteMe);
router.get("/all", authMiddleware, adminMiddleware, UserControllers.getAllUsers);

export default router;