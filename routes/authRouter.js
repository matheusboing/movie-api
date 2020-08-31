const express = require("express")
const router = express.Router()
const app = require("../bin/server")
const authController = require("../controllers/authController")

// Define a rota para 
app.use('/auth', router.post("/", (req, res) => authController.post(req, res)))
