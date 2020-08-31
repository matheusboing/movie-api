/**
 * Rotas para os endpoints de gerenciamento de filmes
 * @prefix /filmes
 */

const express = require("express")
const app = require("../bin/server")
const router = express.Router()
const filmesController = require("../controllers/filmesController")
const authMiddleware = require("../middlewares/authMiddleware")

// Usa um middleware de autenticação
// Apenas usuários autenticados podem fazer requisições
router.use((req, res, next) => authMiddleware(req, res, next))

// Define as rotas
app.use("/filmes",
    router.get('/', (req, res) => filmesController.getAll(req, res)),
    router.get('/:id', (req, res) => filmesController.get(req, res)),
    router.post('/', (req, res) => filmesController.post(req, res)),
    router.put('/:id', (req, res) => filmesController.put(req, res)),
    router.delete('/:id', (req, res) => filmesController.delete(req, res))
)