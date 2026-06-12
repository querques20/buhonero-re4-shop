import { enemyModel } from "../models/enemigosModel.js";

// GET /api/enemigos  -> todos los enemigos
export const get = async (req, res) => {
    try {
        const enemies = await enemyModel.find();
        res.json({ status: "ok", data: enemies });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", data: [] });
    }
};

// GET /api/enemigos/:id  -> un enemigo por su id de juego (ej: 'red9')
export const getById = async (req, res) => {
    try {
        const enemy = await enemyModel.findOne({ id: req.params.id });
        if (enemy) {
            res.json({ status: "ok", data: enemy });
        } else {
            res.status(404).json({ status: "error", msg: "Enemigo no encontrado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", data: [] });
    }
};
