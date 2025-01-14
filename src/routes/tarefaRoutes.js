const { Router } = require('express')
const router = Router()

const TarefaController = require('../controllers/tarefaController')

router
    .get('/tarefas', TarefaController.pegaTodos)
    .post('/tarefas', TarefaController.cadastrar)
    .get('/tarefas/:id', TarefaController.pegaPorId)
    .put('/tarefas/:id', TarefaController.editarPorId)
    .delete('/tarefas/:id', TarefaController.deletarPorId)

module.exports = router