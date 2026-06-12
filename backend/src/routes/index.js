// Importa todas las rutas y arma el routerAPI
import userRouter from "./userRouter.js";
import weaponsRouter from "./weaponsRouter.js";
import personajeRouter from "./personajeRouter.js";
import enemigosRouter from "./enemigosRouter.js";

const routerAPI = (app) => {
    app.use("/api/users", userRouter);
    app.use("/api/weapons", weaponsRouter);
    app.use("/api/personajes", personajeRouter);
    app.use("/api/enemigos", enemigosRouter);
};

export default routerAPI;
