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

// POST /api/weapons  -> agregar un arma nueva (solo admin)
export const save = async (req, res) => {
    try {
        const { id, name, category, price, slots, badge } = req.body;

        // price y slots se chequean contra undefined porque 0 es un valor válido
        // (la SG-09 R sale 0 pesetas)
        if (!id || !name || !category || price === undefined || slots === undefined) {
            return res.status(400).json({ status: "error", msg: "Faltan campos obligatorios" });
        }
        if (isNaN(price) || Number(price) < 0 || isNaN(slots) || Number(slots) < 0) {
            return res
                .status(400)
                .json({ status: "error", msg: "El precio y los slots tienen que ser números positivos" });
        }

        // No repetir ids
        const existe = await weaponModel.findOne({ id });
        if (existe) {
            return res.status(409).json({ status: "error", msg: "Ya hay un arma con ese id" });
        }

        const arma = new weaponModel({ id, name, category, price, slots, badge: badge || null });
        const data = await arma.save();
        res.status(201).json({ status: "ok", data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", msg: "Error al guardar el arma" });
    }
};

// PUT /api/weapons/:id  -> editar un arma (solo admin)
export const update = async (req, res) => {
    try {
        const { name, category, price, slots, badge } = req.body;

        const weapon = await weaponModel.findOne({ id: req.params.id });
        if (!weapon) {
            return res.status(404).json({ status: "error", msg: "Arma no encontrada" });
        }

        // El id de juego no se toca (es el que usan las URLs); el resto se pisa
        // solo si vino en el body
        if (name) weapon.name = name;
        if (category) weapon.category = category;
        if (price !== undefined) {
            if (isNaN(price) || Number(price) < 0) {
                return res.status(400).json({ status: "error", msg: "El precio tiene que ser un número positivo" });
            }
            weapon.price = price;
        }
        if (slots !== undefined) {
            if (isNaN(slots) || Number(slots) < 0) {
                return res.status(400).json({ status: "error", msg: "Los slots tienen que ser un número positivo" });
            }
            weapon.slots = slots;
        }
        if (badge !== undefined) weapon.badge = badge || null;

        const data = await weapon.save();
        res.json({ status: "ok", data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", msg: "Error al editar el arma" });
    }
};

// DELETE /api/weapons/:id  -> borrar un arma (solo admin)
export const remove = async (req, res) => {
    try {
        const weapon = await weaponModel.findOneAndDelete({ id: req.params.id });
        if (weapon) {
            res.json({ status: "ok", msg: "Arma eliminada" });
        } else {
            res.status(404).json({ status: "error", msg: "Arma no encontrada" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", msg: "Error al borrar el arma" });
    }
};
