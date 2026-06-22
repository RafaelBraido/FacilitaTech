import express, { Router } from "express";
import UserControllers from "../controllers/UserControllers.js";
import UserServices from "../Services/UserServices.js";

const router = express.Router();
router.put("/me", UserControllers.updateMe);
router.get("/delete/me", UserControllers.DeleteMe);
export default router;  