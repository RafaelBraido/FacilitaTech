import express from "express";
import UserControllers from "../Controllers/UserControllers.js";
import authMiddleware from "../Middlewares/authMiddleware.js";  


const router = express.Router();

router.put("/me", authMiddleware, UserControllers.updateMe);
router.delete("/me", authMiddleware, UserControllers.DeleteMe);

export default router;  
