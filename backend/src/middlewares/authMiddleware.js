import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

// Revisa que venga el token en el header Authorization y que sea válido.
// Si está todo bien deja los datos del usuario en req.user y sigue.
export const verifyToken = (req, res, next) => {
    const header = req.headers.authorization;

    if (!header) {
        return res.status(401).json({ status: "error", msg: "Falta el token" });
    }

    // El header llega como "Bearer xxxxx", nos quedamos solo con el token
    const token = header.split(" ")[1];

    try {
        req.user = jwt.verify(token, SECRET_KEY);
        next();
    } catch (error) {
        res.status(401).json({ status: "error", msg: "Token inválido o vencido" });
    }
};

// Va siempre después de verifyToken: solo deja pasar a los admin
export const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        return next();
    }
    res.status(403).json({ status: "error", msg: "Hace falta ser admin para esto" });
};
