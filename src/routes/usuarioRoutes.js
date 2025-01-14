const { Router } = require('express')
const router = Router()

const UsuarioController = require('../controllers/usuarioController')
const autenticado = require('../middlewares/autenticado')

router.use(autenticado)

router
    .get('/usuario', UsuarioController.pegaTodos)
    .get('/usuario/:id', UsuarioController.pegaPorId)
    .put('/usuario/:id', UsuarioController.editar)
    .delete('/usuario/:id', UsuarioController.deletar)

module.exports = router