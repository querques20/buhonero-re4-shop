import { weaponModel } from "../models/weaponModel.js";

// GET /api/weapons  -> todas las armas
export const get = async (req, res) => {
    try {
        const weapons = await weaponModel.find();
        res.json({ status: "ok", data: weapons });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", data: [] });
    }
};

// GET /api/weapons/:id  -> una arma por su id de juego (ej: 'red9')
export const getById = async (req, res) => {
    try {
        const weapon = await weaponModel.findOne({ id: req.params.id });
        if (weapon) {
            res.json({ status: "ok", data: weapon });
        } else {
            res.status(404).json({ status: "error", msg: "Arma no encontrada" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", data: [] });
    }
};
