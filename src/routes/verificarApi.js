import express from "express";
import { db } from "../database/criarDB";

class VerificarApis {
    async getDados() {
        const consulta = db.consultarDados(apis);
        for (const element of consulta) {
            const url = element.url_do_endpoint;
            const response = await fetch(url);
            const padrao = {
                url: null,
                status: null,
                tempo_de_resposta: null,
                timestamp_fetch: null,
            };
            const dadoFinal = { ...padrao, ...response };
        }
    }
}
