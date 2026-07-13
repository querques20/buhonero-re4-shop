import mongoose from "mongoose";

const collection = "users";

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // "usuario" común o "admin" (los admin son los que entran al panel)
    role: { type: String, default: "usuario" },
}, { timestamps: true });

export const userModel = mongoose.model(collection, schema);
