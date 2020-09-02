const base64 = require("base-64")
const database = require("../db/database")
const sqlite = require("sqlite-sync");

const authController = {
    post(req, res) {
        const login = req.body
        let usuario = database.select(`SELECT username, senha FROM usuarios WHERE username = '${login.username}'`)

        if(!usuario[0]) {
            return res.status(404).send({error: "Credenciais inválidas"})
        }

        usuario = usuario[0]

        if(usuario.senha != login.senha) {
            return res.status(404).send({error: "Credenciais inválidas"})
        }

        const token = base64.encode(usuario.username + ":" + usuario.senha)
        res.send({token})
    }, 
}

module.exports = authController 