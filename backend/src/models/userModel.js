import mongoose from "mongoose";

const collection = "users";

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

export const userModel = mongoose.model(collection, schema);
