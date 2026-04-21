import express from "express";
import { db } from "../database/criarDB.js";

class VerificarApis {
    constructor() {
        this.router = express.Router();

        this.router.get("/verificar", async (_req, res) => {
            const resultados = await this.getDados();
            res.status(200).json(resultados);
        });
    }

    async getDados() {
        const consulta = db.consultarDados("apis");
        const resultados = [];

        for (const endpoint of consulta) {
            const url = endpoint.url_do_endpoint;
            const inicio = Date.now();

            try {
                const response = await fetch(url, {
                    method: endpoint.get_ou_post || "GET",
                });

                const dadoFinal = {
                    url,
                    status: response.status,
                    tempo_de_resposta: Date.now() - inicio,
                    timestamp_fetch: new Date().toISOString(),
                };

                db.inserirResponse(dadoFinal);
                resultados.push(dadoFinal);
            } catch {
                const dadoComFalha = {
                    url,
                    status: 0,
                    tempo_de_resposta: Date.now() - inicio,
                    timestamp_fetch: new Date().toISOString(),
                };

                db.inserirResponse(dadoComFalha);
                resultados.push(dadoComFalha);
            }
        }

        return resultados;
    }
}

export const verificarApis = new VerificarApis();
