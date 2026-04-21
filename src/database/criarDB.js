import Database from "better-sqlite3";

class BancoDeDados {
    #db;
    constructor() {
        this.#db = Database("endpoints_cadastrados.db");
        const query1 = this.#db.prepare(`--sql;
            CREATE TABLE IF NOT EXISTS apis (
                url_do_endpoint TEXT PRIMARY KEY,
                get_ou_post TEXT
            )
        `);
        const query2 = this.#db.prepare(`--sql;
            CREATE TABLE IF NOT EXISTS estatisticas (
                "url" TEXT,
                "status" INT,
                tempo_de_resposta INT,
                timestamp_fetch TEXT
            )
        `);
        query1.run();
        query2.run();
    }

    consultarDados(tabela) {
        const query = this.#db.prepare(`--sql;
            SELECT * FROM ${tabela}
        `);
        return query.all();
    }

    inserirResponse(response) {}
}

bancoDeDados.prototype.inserirApis = function (objetoDeEndereços) {
    const query = this.#db.prepare(`--sql;
        INSERT OR REPLACE INTO apis (url_do_endpoint, get_ou_post) VALUES (?, ?);
    `);
    for (const [key, value] of Object.entries(objetoDeEndereços)) {
        query.run(key, value);
    }
};

export const db = new BancoDeDados();
