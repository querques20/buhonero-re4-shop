import express from "express";

import { get, getById, save, auth } from "../controllers/userController.js";

const router = express.Router();

router.get("/", get); // listar usuarios
router.get("/:id", getById); // un usuario por id
router.post("/", save); // registro
router.post("/auth", auth); // login

export default router;
