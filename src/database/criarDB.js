import Database from "better-sqlite3";

class BancoDeDados {
    #db;

    constructor() {
        this.#db = new Database("endpoints_cadastrados.db");

        const query1 = this.#db.prepare(`--sql;
            CREATE TABLE IF NOT EXISTS apis (
                url_do_endpoint TEXT PRIMARY KEY,
                get_ou_post TEXT
            )
        `);

        const query2 = this.#db.prepare(`--sql;
            CREATE TABLE IF NOT EXISTS estatisticas (
                url TEXT,
                status INTEGER,
                tempo_de_resposta INTEGER,
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

    inserirResponse(response) {
        const query = this.#db.prepare(`--sql;
            INSERT INTO estatisticas (url, status, tempo_de_resposta, timestamp_fetch)
            VALUES (@url, @status, @tempo_de_resposta, @timestamp_fetch)
        `);

        query.run(response);
    }

    inserirApis(objetoDeEnderecos) {
        const query = this.#db.prepare(`--sql;
            INSERT OR REPLACE INTO apis (url_do_endpoint, get_ou_post) VALUES (?, ?)
        `);

        for (const [url, metodo] of Object.entries(objetoDeEnderecos)) {
            query.run(url, metodo);
        }
    }
}

export const db = new BancoDeDados();
