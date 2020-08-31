const usuarios = require("../usuarios.json");
const sqlite = require("sqlite-sync");
const path = require("path");

/**
 * Controller de usuários
 */
const usuariosController = {
    /**
     * Endpoint par aobter todo os usuários
     * @param {*} req Requisição 
     * @param {*} res Resposta
     */
    getAll(req, res) {
        sqlite.connect(path.resolve(__dirname, "../database.sqlite"))
        const usuarios = sqlite.run("SELECT * FROM usuarios")
        res.send(usuarios)
    },

    /**
     * Enpoint para encontrar um usuário específico pelo ID
     * @param {*} req Requisição 
     * @param {*} res Resposta
     * @return o usuário foi encontrado
     * @return 404, se o usuário não estiver no banco de dados
     */
    get(req, res) {
        const usuarioId = req.params.id
        sqlite.connect(path.resolve(__dirname, "../database.sqlite"))
        let usuario = sqlite.run(`SELECT * FROM usuarios WHERE id = '${usuarioId}'`)
        usuario = usuario[0]

        if (!usuario) {
            return res.status(404).send({ error: "Usuário não encontrado" })
        }

        res.send(usuario)
    },

    /**
     * Enpoint para criar um usuário
     * @param {*} req Requisição 
     * @param {*} res Resposta
     * @return o usuário criado
     */
    post(req, res) {
        const usuario = req.body

        delete usuario.id

        sqlite.connect(path.resolve(__dirname, "../database.sqlite"))
        usuario.id = sqlite.insert("usuarios", usuario)
        res.status(201).send(usuario)
    },


    /**
     * Endpoint para editar um usuário
     * @param {*} req Requisição 
     * @param {*} res Resposta
     * @return 400, se o ID no corpo da requisição for diferente da URL
     * @return 404, se o filme não estiver no banco de dados
     */
    put(req, res) {
        const { id } = req.params
        const body = req.body
        sqlite.connect(path.resolve(__dirname, "../database.sqlite"))
        let usuario = sqlite.run(`SELECT id, username, senha FROM usuarios WHERE id = '${body.id}'`)
        usuario = usuario[0]

        console.log(usuario)

        if (parseInt(body.id) !== parseInt(id)) {
            return res.status(400).send({ error: "O ID no corpo da requisição é diferente do ID informado na URL" })
        }

        if (!usuario) {
            return res.status(404).send({ error: "Usuário não encontrado" })
        }

        usuario.username = body.username
        usuario.senha = body.senha
        sqlite.update("usuarios", usuario, { id: usuario.id })
        res.send(usuario)
    },

    /**
     * Endpoint para deletar um usuário
     * @param {*} req Requisição 
     * @param {*} res Resposta
     * @return 404, se o usuário não existir no banco de dados
     * @return 204, se o usuário foi deletado com sucesso
     */
    delete(req, res) {
        const { id } = req.params
        sqlite.connect(path.resolve(__dirname, "../database.sqlite"))
        let usuario = sqlite.run(`SELECT * FROM usuarios WHERE id = '${id}'`)
        usuario = usuario[0]

        if (!usuario) {
            return res.status(404).send({ error: "Usuário não encontrado" })
        }

        sqlite.delete("usuarios", { id: id })
        res.status(204).send()
    }
}

module.exports = usuariosController