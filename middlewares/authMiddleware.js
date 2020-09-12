const sqlite = require("sqlite-sync")
const base64 = require("base-64") 
const path = require("path")
const database = require("../db/database")

/**
 * Middleware de autenticação
 * 
 * Esse middleware é responsável por verificar
 * se o usuário que fez a requisição está autenticado
 * 
 * @param {*} req Requisição
 * @param {*} res Resposta
 * @param {*} next Continuação do processamento
 */
const authMiddleware = function (req, res, next) {
    // Obtém o cabeçalho de autorização na requisição
    let { authorization } = req.headers

    // Verifica se o cabeçalho começa com "Basic "
    if (!authorization || !authorization.startsWith("Basic ")) {
        return res.status(401).send()
    }

    // Retira o "Basic " do cabeçalho
    authorization = authorization.replace("Basic ", "")

    try {
        // Descriptografa o cabeçalho que está em BASE 64
        authorization = base64.decode(authorization)
    } catch {
        return res.status(401).send()
    }
    
    // Verifica se possui ":"
    if(!authorization.includes(":")) {
        return res.status(401).send()
    }

    // Obtém o usuário e senha do cabeçalho através de desestruturação do split
    const [username, senha] = authorization.split(":")

    // Procura o usuário
    let usuario = database.selectFirst(`SELECT username, senha FROM usuarios WHERE username = '${username}'`)

    // Verifica se o usuário existe e a senha está correta
    if (!usuario || usuario.senha != senha) {
        return res.status(401).send()
    }

    next()
}

module.exports = authMiddleware