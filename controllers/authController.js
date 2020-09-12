const base64 = require("base-64")
const database = require("../db/database")

const authController = {
    post(req, res) {
        const login = req.body
        let usuario = database.selectFirst(`SELECT username, senha FROM usuarios WHERE username = '${login.username}'`)

        if(!usuario) {
            return res.status(404).send({error: "Credenciais inválidas"})
        }

        if(usuario.senha != login.senha) {
            return res.status(404).send({error: "Credenciais inválidas"})
        }

        const token = base64.encode(usuario.username + ":" + usuario.senha)
        res.send({token})
    }, 
}

module.exports = authController 