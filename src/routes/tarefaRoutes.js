const { Router } = require('express')
const router = Router()

const TarefaController = require('../controllers/tarefaController')
const autorizacao = require('../middlewares/autorizacao')

router
    .get('/tarefas', TarefaController.pegaTodos)
    .post('/tarefas', TarefaController.cadastrar)
    .get('/tarefas/:id', autorizacao(), TarefaController.pegaPorId)
    .put('/tarefas/:id', autorizacao(), TarefaController.editarPorId)
    .delete('/tarefas/:id', autorizacao(), TarefaController.deletarPorId)

module.exports = router