const UsuarioService = require('../services/usuarioService')
const usuarioService = new UsuarioService();

class UsuarioController {
    static async cadastrarUsuario(req, res) {
        const { nome, senha } = req.body;

        try {
            const usuario = await usuarioService.cadastrarUsuario({ nome, senha })

            res.status(201).send(usuario)
        } catch (error) {
            res.status(400).send(error.message)
        }
    }

    static async pegaTodos(req, res) {
        const { usuarioId } = req;
        try {
            const usuarios = await usuarioService.pegaTodos()

            res.status(200).send(usuarios)
        } catch (error) {
            res.status(400).send(error.message)
        }
    }

    static async pegaPorId(req, res) {
        const { id } = req.params

        try {
            const usuario = await usuarioService.pegaPorId(id)

            res.status(200).send(usuario)
        } catch (error) {
            res.status(400).send(error.message)
        }
    }

    static async editar(req, res) {
        const { nome, senha } = req.body
        const { id } = req.params

        try {
            const usuarioEditado = await usuarioService.editar({ id, nome, senha })
            res.status(200).send(usuarioEditado)
        } catch (error) {
            res.status(400).send(error.message)
        }
    }

    static async deletar(req, res) {
        const { id } = req.params

        try {
            await usuarioService.deletar(id)

            res.status(200).send("Usuário deletado com sucesso!")
        } catch (error) {
            res.status(400).send(error.message)
        }
    }

}

module.exports = UsuarioController;