// Importa todas las rutas y arma el routerAPI
import userRouter from "./userRouter.js";
import weaponsRouter from "./weaponsRouter.js";
import personajeRouter from "./personajeRouter.js";
import enemigosRouter from "./enemigosRouter.js";

const routerAPI = (app) => {
    // Índice de la API: entrar a /api muestra qué recursos hay disponibles
    app.get("/api", (req, res) => {
        res.json({
            status: "ok",
            msg: "API del Buhonero RE4",
            recursos: ["/api/users", "/api/weapons", "/api/personajes", "/api/enemigos"],
        });
    });

    app.use("/api/users", userRouter);
    app.use("/api/weapons", weaponsRouter);
    app.use("/api/personajes", personajeRouter);
    app.use("/api/enemigos", enemigosRouter);
};

export default routerAPI;
