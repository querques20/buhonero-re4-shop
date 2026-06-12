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