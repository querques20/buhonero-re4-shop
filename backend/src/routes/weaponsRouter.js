import express from "express";

import { get, getById } from "../controllers/weaponController.js";

const router = express.Router();

router.get("/", get); // listar armas
router.get("/:id", getById); // una arma por id

export default router;
