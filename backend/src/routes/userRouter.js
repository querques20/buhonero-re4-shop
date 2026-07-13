import express from "express";

import { get, getById, save, auth, update, remove } from "../controllers/userController.js";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, isAdmin, get); // listar usuarios (solo admin)
router.get("/:id", verifyToken, isAdmin, getById); // un usuario por id (solo admin)
router.post("/", save); // registro
router.post("/auth", auth); // login
router.put("/:id", verifyToken, isAdmin, update); // editar usuario (solo admin)
router.delete("/:id", verifyToken, isAdmin, remove); // borrar usuario (solo admin)

export default router;
