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

// GET /api/enemigos/:id  -> un enemigo por su id
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

// POST /api/enemigos  -> agregar un enemigo (solo admin)
export const save = async (req, res) => {
    try {
        const { id, name, category } = req.body;

        if (!id || !name || !category) {
            return res.status(400).json({ status: "error", msg: "Faltan campos obligatorios" });
        }

        // No repetir ids
        const existe = await enemyModel.findOne({ id });
        if (existe) {
            return res.status(409).json({ status: "error", msg: "Ya hay un enemigo con ese id" });
        }

        const enemigo = new enemyModel({ id, name, category });
        const data = await enemigo.save();
        res.status(201).json({ status: "ok", data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", msg: "Error al guardar el enemigo" });
    }
};

// PUT /api/enemigos/:id  -> editar un enemigo (solo admin)
export const update = async (req, res) => {
    try {
        const { name, category } = req.body;

        const enemy = await enemyModel.findOne({ id: req.params.id });
        if (!enemy) {
            return res.status(404).json({ status: "error", msg: "Enemigo no encontrado" });
        }

        // Se pisa solo lo que vino en el body (el id de juego queda fijo)
        if (name) enemy.name = name;
        if (category) enemy.category = category;

        const data = await enemy.save();
        res.json({ status: "ok", data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", msg: "Error al editar el enemigo" });
    }
};

// DELETE /api/enemigos/:id  -> borrar un enemigo (solo admin)
export const remove = async (req, res) => {
    try {
        const enemy = await enemyModel.findOneAndDelete({ id: req.params.id });
        if (enemy) {
            res.json({ status: "ok", msg: "Enemigo eliminado" });
        } else {
            res.status(404).json({ status: "error", msg: "Enemigo no encontrado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", msg: "Error al borrar el enemigo" });
    }
};
