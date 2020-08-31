const sqlite = require("sqlite-sync");
const path = require("path");

/**
 * Controller de filmes
 */
const filmesController = {
    /**
     * Endpoint para obter todos os filmes
     * @param {*} req Requisição
     * @param {*} res Resposta
     * @return Todos os filmes no banco de dados
     */
    getAll(req, res) {
        sqlite.connect(path.resolve(__dirname, "../database.sqlite"))
        const filmes = sqlite.run("SELECT * FROM filmes")
        res.send(filmes);
    },

    /**
     * Endpoint para obter um filme específico pelo ID na URL
     * @param {*} req Requisição
     * @param {*} res Resposta
     * @return O filme encontrado
     * @return 404, se o filme não estiver no banco de dados
     */
    get(req, res) {
        const id = req.params.id
        sqlite.connect(path.resolve(__dirname, "../database.sqlite"))
        let filme = sqlite.run(`SELECT * FROM filmes WHERE id = '${id}'`)
        filme = filme[0]

        if (!filme) {
            return res.status(404).send({ error: "Filme não encontrado" })
        }

        res.send(filme)
    },

    /**
     * Endpoint para criar um novo filme
     * @param {*} req Requisição
     * @param {*} res Resposta
     * @return O filme criado
     */
    post(req, res) {
        const filme = req.body
        
        delete filme.id
        
        sqlite.connect(path.resolve(__dirname, "../database.sqlite"))
        filme.id = sqlite.insert("filmes", filme)
        res.status(201).send(filme)
    },

    /**
     * Endpoind para editar um filme
     * @param {*} req Requisição
     * @param {*} res Resposta
     * @return O filme editado
     * @return 400, se o ID no corpo da requisição for diferente da URL
     * @return 404, se o filme não estiver no banco de dados
     */
    put(req, res) {
        const { id } = req.params // Desestruturação de objeto
        const body = req.body
        sqlite.connect(path.resolve(__dirname, "../database.sqlite"))
        let filme = sqlite.run(`SELECT id, titulo FROM filmes WHERE id = '${body.id}'`)
        filme = filme[0]

        if (parseInt(body.id) !== parseInt(id)) {
            return res.status(400).send({ error: "O ID no corpo da requisição é diferente do ID informado na URL" })
        }

        if (!filme) {
            return res.status(404).send({ error: "Filme não encontrado" })
        }

        filme.titulo = body.titulo
        sqlite.update("filmes", filme, {id: filme.id})
        res.send(filme)
    },

    /**
     * Endpoint para deletar um filme
     * @param {*} req Requisiçao
     * @param {*} res Resposta
     * @return 204, se o filme for deletado com sucesso
     * @return 404, se o filme não estiver no banco de dados
     */
    delete(req, res) {
        const { id } = req.params
        sqlite.connect(path.resolve(__dirname, "../database.sqlite"))
        let filme = sqlite.run(`SELECT id, titulo FROM filmes WHERE id = '${id}'`)
        filme = filme[0]
        if (!filme) {
            return res.status(404).send({ error: "Filme não encontrado" })
        }

        sqlite.delete("filmes", {id: id})
        res.status(204).send()
    }
}

module.exports = filmesController