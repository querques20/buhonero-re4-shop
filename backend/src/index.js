import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import chalk from "chalk";

import connectDB from "./config/db.js";
import { seedWeapons, seedPersonajes , seedEnemigos} from "./config/seed.js";
import routerAPI from "./routes/index.js";

dotenv.config();

// Conexión con MongoDB y carga inicial de datos (armas y personajes)
connectDB().then(() => {
    seedWeapons();
    seedPersonajes();
    seedEnemigos();
});

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json({ status: "ok", msg: "API del Buhonero RE4" });
});

// Rutas de la API (/api/users)
routerAPI(app);

app.listen(PORT, () => {
    console.log(chalk.green(`Servidor Web en el puerto ${PORT}`));
});
