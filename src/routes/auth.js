const { Router } = require('express')
const router = Router()

const AuthController = require('../controllers/authController')
const UsuarioController = require('../controllers/usuarioController')

router
    .post('/auth/login', AuthController.login)
    .post('/usuario', UsuarioController.cadastrarUsuario)

module.exports = router