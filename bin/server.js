/**
 * Este arquivo constrói a aplicação Express da nossa API
 */

const express = require('express')
const app = express()

// Determina que a API receberá JSON via requisições
app.use(express.json())

module.exports = app
