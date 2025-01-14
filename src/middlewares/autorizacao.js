const database = require('../models')

module.exports = () => {
    return async (req, res, next) => {
        const { id } = req.params
        const { usuarioId } = req;

        const tarefa = await database.tarefas.findOne({
            where: {
                id: id
            },
            include: {
                model: database.usuarios,
                as: 'usuario',
                attributes: ['id']
            }
        })

        if(tarefa.usuario.id !== usuarioId) {
            return res.status(400).send("Você não tem permissão para acessar ou editar esta tarefa")
        }

        next()
    }
}