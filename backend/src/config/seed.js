import { weaponModel } from "../models/weaponModel.js";
import { weapons } from "../data/weapons.js";
import { personajeModel } from "../models/personajeModel.js";
import { personajes } from "../data/personajes.js";
import { enemyModel } from "../models/enemigosModel.js";
import { enemigos } from "../data/enemigos.js";

// Sincroniza el catálogo de armas con la base cada vez que arranca el servidor:
// inserta las que falten y actualiza las que cambien (identificadas por su id).
// Para agregar o editar un arma: editás el array de "../data/weapons.js" y reiniciás.
export const seedWeapons = async () => {
    try {
        const operaciones = weapons.map((arma) => ({
            updateOne: {
                filter: { id: arma.id },
                update: { $set: arma },
                upsert: true,
            },
        }));
        const resultado = await weaponModel.bulkWrite(operaciones);
        const nuevas = resultado.upsertedCount || 0;
        if (nuevas > 0) {
            console.info(`Seed: ${nuevas} arma(s) nueva(s) agregada(s) a la base`);
        }
    } catch (error) {
        console.error("Error al sincronizar las armas:", error);
    }
};

// Mismo criterio para los personajes.
export const seedPersonajes = async () => {
    try {
        const operaciones = personajes.map((p) => ({
            updateOne: { filter: { id: p.id }, update: { $set: p }, upsert: true },
        }));
        const resultado = await personajeModel.bulkWrite(operaciones);
        const nuevos = resultado.upsertedCount || 0;
        if (nuevos > 0) console.info(`Seed: ${nuevos} personaje(s) nuevo(s)`);
    } catch (error) {
        console.error("Error al sincronizar los personajes:", error);
    }
};

export const seedEnemigos = async () => {
    try {
        const operaciones = enemigos.map((p) => ({
            updateOne: { filter: { id: p.id }, update: { $set: p }, upsert: true },
        }));
        const resultado = await enemyModel.bulkWrite(operaciones);
        const nuevos = resultado.upsertedCount || 0;
        if (nuevos > 0) console.info(`Seed: ${nuevos} enemigo(s) nuevo(s)`);
    } catch (error) {
        console.error("Error al sincronizar los enemigos:", error);
    }
};
