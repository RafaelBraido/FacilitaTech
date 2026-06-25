import express, { router } from "express";
import AdminControllers from "../controllers/AdminControllers.js";
import AdminServices from "../Services/AdminServices.js";

router.post("/BancoDeDados", AdminControllers.BancoDeDados);
router.put("/GuiaEspecifico", AdminControllers.GuiaEspecifico);
router.delete("/deleteGuia", AdminControllers.DeleteGuia);

export default router;  