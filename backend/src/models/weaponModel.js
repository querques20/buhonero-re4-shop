import mongoose from "mongoose";

const collection = "weapons";

const schema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // id del juego (ej: 'red9')
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    slots: { type: Number, required: true },
    badge: { type: String, default: null },
});

export const weaponModel = mongoose.model(collection, schema);
