import express from "express";

import { get, getById } from "../controllers/personajeController.js";

const router = express.Router();

router.get("/", get);       // listar todos
router.get("/:id", getById); // uno por id

export default router;