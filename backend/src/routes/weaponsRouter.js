import express from "express";

import { get, getById, save, update, remove } from "../controllers/weaponController.js";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Leer es público (la tienda se ve sin login); escribir pide admin
router.get("/", get); // listar armas
router.get("/:id", getById); // una arma por id
router.post("/", verifyToken, isAdmin, save); // agregar
router.put("/:id", verifyToken, isAdmin, update); // editar
router.delete("/:id", verifyToken, isAdmin, remove); // borrar

export default router;
