import express from "express";

import { get, getById, save, update, remove } from "../controllers/enemigosController.js";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Leer es público; escribir pide admin
router.get("/", get); // listar enemigos
router.get("/:id", getById); // un enemigo por id
router.post("/", verifyToken, isAdmin, save); // agregar
router.put("/:id", verifyToken, isAdmin, update); // editar
router.delete("/:id", verifyToken, isAdmin, remove); // borrar

export default router;
