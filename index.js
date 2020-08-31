const app = require('./bin/server')

/**
 * Importa todas as rotas
 */
require("./routes/routes")

/**
 * Inicia o servidor
 */
app.listen(3333,  function() {
    console.log('listening on localhost:3333')
})

