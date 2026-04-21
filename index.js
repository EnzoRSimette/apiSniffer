import express from "express";

class App {
    #app;
    constructor(port) {
        this.#app = express();
        this.#app.listen(port);
    }
}

export const app = new App(3333);
