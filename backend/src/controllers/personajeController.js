import { personajeModel } from "../models/personajeModel.js";

// GET /api/personajes  -> todos los personajes
export const get = async (req, res) => {
    try {
        const personajes = await personajeModel.find();
        res.json({ status: "ok", data: personajes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", data: [] });
    }
};

// GET /api/personajes/:id  -> un personaje por su id
export const getById = async (req, res) => {
    try {
        const personaje = await personajeModel.findOne({ id: req.params.id });
        if (personaje) {
            res.json({ status: "ok", data: personaje });
        } else {
            res.status(404).json({ status: "error", msg: "Personaje no encontrado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", data: [] });
    }
};

// POST /api/personajes  -> agregar un personaje (solo admin)
export const save = async (req, res) => {
    try {
        const { id, name, rol, arma } = req.body;

        if (!id || !name || !rol) {
            return res.status(400).json({ status: "error", msg: "Faltan campos obligatorios" });
        }

        // No repetir ids
        const existe = await personajeModel.findOne({ id });
        if (existe) {
            return res.status(409).json({ status: "error", msg: "Ya hay un personaje con ese id" });
        }

        const personaje = new personajeModel({ id, name, rol, arma });
        const data = await personaje.save();
        res.status(201).json({ status: "ok", data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", msg: "Error al guardar el personaje" });
    }
};

// PUT /api/personajes/:id  -> editar un personaje (solo admin)
export const update = async (req, res) => {
    try {
        const { name, rol, arma } = req.body;

        const personaje = await personajeModel.findOne({ id: req.params.id });
        if (!personaje) {
            return res.status(404).json({ status: "error", msg: "Personaje no encontrado" });
        }

        // Se pisa solo lo que vino en el body (el id de juego queda fijo)
        if (name) personaje.name = name;
        if (rol) personaje.rol = rol;
        if (arma !== undefined) personaje.arma = arma;

        const data = await personaje.save();
        res.json({ status: "ok", data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", msg: "Error al editar el personaje" });
    }
};

// DELETE /api/personajes/:id  -> borrar un personaje (solo admin)
export const remove = async (req, res) => {
    try {
        const personaje = await personajeModel.findOneAndDelete({ id: req.params.id });
        if (personaje) {
            res.json({ status: "ok", msg: "Personaje eliminado" });
        } else {
            res.status(404).json({ status: "error", msg: "Personaje no encontrado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", msg: "Error al borrar el personaje" });
    }
};