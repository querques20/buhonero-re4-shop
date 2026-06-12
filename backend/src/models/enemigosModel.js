import mongoose from "mongoose";

const collection = "enemigos";

const schema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, 
    name: { type: String, required: true },
    category: { type: String, required: true },
});

export const enemyModel = mongoose.model(collection, schema);
