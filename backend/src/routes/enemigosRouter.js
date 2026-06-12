import express from "express";

import { get, getById } from "../controllers/enemigosController.js";

const router = express.Router();

router.get("/", get); // listar enemigos
router.get("/:id", getById); // un enemigo por id

export default router;
