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
        if (!/\S+@\S+\.\S+/.test(email)) {
            return res
                .status(400)
                .json({ status: "error", msg: "El email no tiene un formato válido" });
        }
        if (password.length < 6) {
            return res
                .status(400)
                .json({ status: "error", msg: "La contraseña tiene que tener al menos 6 caracteres" });
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

        // El rol viaja adentro del token, así el middleware sabe si es admin
        const data = { _id: user.id, name: user.name, role: user.role };
        const token = jwt.sign(data, SECRET_KEY, { expiresIn: "1h" });

        // Mandamos el token y los datos básicos (el front los guarda para la sesión)
        res.json({ status: "ok", data: { token, user: data } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", msg: "Error al autenticar" });
    }
};

// PUT /api/users/:id  -> editar un usuario (solo admin)
export const update = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const user = await userModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ status: "error", msg: "Usuario no encontrado" });
        }

        // Solo pisamos los campos que llegaron en el body
        if (name) user.name = name;
        if (email) {
            // Que el email nuevo no esté usado por otro
            const repetido = await userModel.findOne({ email, _id: { $ne: user._id } });
            if (repetido) {
                return res.status(409).json({ status: "error", msg: "Ese email ya está registrado" });
            }
            user.email = email;
        }
        if (password) {
            if (password.length < 6) {
                return res
                    .status(400)
                    .json({ status: "error", msg: "La contraseña tiene que tener al menos 6 caracteres" });
            }
            user.password = await bcrypt.hash(password, 10);
        }
        if (role) {
            if (role !== "admin" && role !== "usuario") {
                return res.status(400).json({ status: "error", msg: "Rol inválido" });
            }
            user.role = role;
        }

        const data = await user.save();
        res.json({
            status: "ok",
            data: { _id: data._id, name: data.name, email: data.email, role: data.role },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", msg: "Error al editar el usuario" });
    }
};

// DELETE /api/users/:id  -> borrar un usuario (solo admin)
export const remove = async (req, res) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id);
        if (user) {
            res.json({ status: "ok", msg: "Usuario eliminado" });
        } else {
            res.status(404).json({ status: "error", msg: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", msg: "Error al borrar el usuario" });
    }
};
