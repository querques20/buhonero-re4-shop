import bcrypt from "bcrypt";

import { weaponModel } from "../models/weaponModel.js";
import { weapons } from "../data/weapons.js";
import { personajeModel } from "../models/personajeModel.js";
import { personajes } from "../data/personajes.js";
import { enemyModel } from "../models/enemigosModel.js";
import { enemigos } from "../data/enemigos.js";
import { userModel } from "../models/userModel.js";

// Carga inicial: si la colección está vacía la llena con el catálogo de data/.
// Solo se hace esa primera vez; después la base queda en manos del panel de
// admin (si pisáramos los datos en cada arranque se perderían los cambios).
export const seedWeapons = async () => {
    try {
        const cuantas = await weaponModel.countDocuments();
        if (cuantas > 0) return;
        await weaponModel.insertMany(weapons);
        console.info(`Seed: ${weapons.length} armas cargadas en la base`);
    } catch (error) {
        console.error("Error al cargar las armas:", error);
    }
};

// Mismo criterio para los personajes.
export const seedPersonajes = async () => {
    try {
        const cuantos = await personajeModel.countDocuments();
        if (cuantos > 0) return;
        await personajeModel.insertMany(personajes);
        console.info(`Seed: ${personajes.length} personajes cargados en la base`);
    } catch (error) {
        console.error("Error al cargar los personajes:", error);
    }
};

export const seedEnemigos = async () => {
    try {
        const cuantos = await enemyModel.countDocuments();
        if (cuantos > 0) return;
        await enemyModel.insertMany(enemigos);
        console.info(`Seed: ${enemigos.length} enemigos cargados en la base`);
    } catch (error) {
        console.error("Error al cargar los enemigos:", error);
    }
};

// Crea el usuario admin si todavía no existe (es el que entra al panel).
// La contraseña se puede cambiar poniendo ADMIN_PASSWORD en el .env.
export const seedAdmin = async () => {
    try {
        const existe = await userModel.findOne({ email: "admin@buhonero.com" });
        if (existe) return;
        const pass = process.env.ADMIN_PASSWORD || "buhonero123";
        const hash = await bcrypt.hash(pass, 10);
        await userModel.create({
            name: "El Buhonero",
            email: "admin@buhonero.com",
            password: hash,
            role: "admin",
        });
        console.info("Seed: usuario admin creado (admin@buhonero.com)");
    } catch (error) {
        console.error("Error al crear el admin:", error);
    }
};
