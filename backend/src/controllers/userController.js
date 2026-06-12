import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { userModel } from "../models/userModel.js";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

// GET /api/users  -> lista todos los usuarios (sin la contraseña)
export const get = async (req, res) => {
    try {
        const users = await userModel.find().select("-password");
        res.json({ status: "ok", data: users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", data: [] });
    }
};

// GET /api/users/:id  -> un usuario por id
export const getById = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id).select("-password");
        if (user) {
            res.json({ status: "ok", data: user });
        } else {
            res.status(404).json({ status: "error", msg: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", data: [] });
    }
};

// POST /api/users  -> REGISTRO de un nuevo usuario
export const save = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validación de campos en el backend
        if (!name || !email || !password) {
            return res
                .status(400)
                .json({ status: "error", msg: "Faltan campos obligatorios" });
        }

        // No permitir emails repetidos
        const existe = await userModel.findOne({ email });
        if (existe) {
            return res
                .status(409)
                .json({ status: "error", msg: "Ese email ya está registrado" });
        }

        // Hasheamos la contraseña antes de guardarla
        const hash = await bcrypt.hash(password, 10);
        const usuario = new userModel({ name, email, password: hash });
        const data = await usuario.save();

        // Devolvemos el usuario SIN el hash de la contraseña
        res.status(201).json({
            status: "ok",
            data: { _id: data._id, name: data.name, email: data.email },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", msg: "Error al registrar el usuario" });
    }
};

// POST /api/users/auth  -> LOGIN (devuelve un JWT)
export const auth = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ status: "error", msg: "Email inválido" });
        }

        const passOk = await bcrypt.compare(password, user.password);
        if (!passOk) {
            return res.status(401).json({ status: "error", msg: "Contraseña inválida" });
        }

        const data = { _id: user.id, name: user.name };
        const token = jwt.sign(data, SECRET_KEY, { expiresIn: "1h" });

        res.json({ status: "ok", data: token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", msg: "Error al autenticar" });
    }
};
