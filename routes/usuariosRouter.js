const express = require("express")
const router = express.Router()
const usuariosController = require("../controllers/usuariosController")
const app = require("../bin/server")
const authMiddleware = require("../middlewares/authMiddleware")

// Usa um middleware de autenticação
// Apenas usuários autenticados podem fazer requisições
router.use((req, res, next) => authMiddleware(req, res, next))

app.use('/usuarios',
    router.get("/", (req, res) => usuariosController.getAll(req, res)),
    router.get("/:id", (req, res) => usuariosController.get(req, res)),
    router.post("/", (req, res) => usuariosController.post(req, res)),
    router.put("/:id", (req, res) => usuariosController.put(req, res)),
    router.delete("/:id", (req, res) => usuariosController.delete(req, res))
)