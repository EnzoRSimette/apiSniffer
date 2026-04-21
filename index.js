import express from "express";
import { verificarApis } from "./src/routes/verificarApi.js";

class App {
    #app;

    constructor(port) {
        this.#app = express();
        this.#app.use(verificarApis.router);
        this.#app.listen(port);
    }
}

export const app = new App(3333);
