
import express from "express";
import AdminController from "../Controllers/AdminControllers.js";
import authMiddleware from "../Middlewares/authMiddleware.js";
import adminMiddleware from "../Middlewares/adminMiddlewares.js";
import rateLimitAuth from "../Middlewares/Ratelimitauth.js";

const router = express.Router();

// Entrar como admin só com o código, sem e-mail nem conta.
router.post("/codigo", rateLimitAuth, AdminController.entrarComCodigo);

// Funções extras — só para quem já é admin (mesmo padrão do TutorialRoutes.js)
router.get("/usuarios", authMiddleware, adminMiddleware, AdminController.listarUsuarios);
router.put("/promover", authMiddleware, adminMiddleware, AdminController.promoverParaAdmin);
router.put("/rebaixar", authMiddleware, adminMiddleware, AdminController.rebaixarAdmin);
router.get("/estatisticas", authMiddleware, adminMiddleware, AdminController.estatisticas);

export default router;