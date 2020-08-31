/**
 * Este arquivo exporta todas as rotas que
 * estiverem dentro da pasta "routes/"
 */

 // Pacote para exportar os arquivos
const requireDir = require("require-dir")

// Exporta todos os arquivos .js dentro da pasta "routes/"
module.exports = requireDir(".", {recurse: true, extensions: [".js"]})