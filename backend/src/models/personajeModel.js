import mongoose from "mongoose";

const collection = "personajes";

const schema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    rol: { type: String, required: true },
    arma: { type: String },
});

export const personajeModel = mongoose.model(collection, schema);