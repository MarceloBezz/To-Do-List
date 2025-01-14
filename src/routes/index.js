const bodyParser = require('body-parser')

const usuario = require('./usuarioRoutes')
const tarefas = require('./tarefaRoutes')
const auth = require('./auth')

module.exports = app => {
    app.use(
        bodyParser.json(),
        auth,
        usuario,
        tarefas
    )
}