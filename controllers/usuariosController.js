const sqlite = require("sqlite-sync");
const path = require("path");
const database = require("../db/database");

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
        usuarios = database.select("SELECT * FROM usuarios")        
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
        usuario = database.selectFirst(`SELECT * FROM usuarios WHERE id = '${usuarioId}'`)

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
        let usuario = req.body

        delete usuario.id

        usuario.id = database.insert("usuarios", usuario)
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
        
        let usuario = database.selectFirst(`SELECT id, username, senha FROM usuarios WHERE id = '${body.id}'`)

        if (parseInt(body.id) !== parseInt(id)) {
            return res.status(400).send({ error: "O ID no corpo da requisição é diferente do ID informado na URL" })
        }

        if (!usuario) {
            return res.status(404).send({ error: "Usuário não encontrado" })
        }

        usuario.username = body.username
        usuario.senha = body.senha
        database.update("usuarios", usuario, { id: body.id })
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
        database.connect()
        let usuario = database.selectFirst(`SELECT * FROM usuarios WHERE id = '${id}'`)

        if (!usuario) {
            return res.status(404).send({ error: "Usuário não encontrado" })
        }

        database.delete("usuarios", { id: id })
        res.status(204).send()
    }
}

module.exports = usuariosController