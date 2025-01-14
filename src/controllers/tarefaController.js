const TarefaService = require('../services/tarefaService')
const tarefaService = new TarefaService()

class TarefaController {
    static async cadastrar(req, res) {
        const { titulo } = req.body;
        const { usuarioId } = req;

        try {
            const novaTarefa = await tarefaService.cadastrar({ titulo, usuarioId })

            res.status(201).send(novaTarefa)
        } catch (error) {
            res.status(400).send(error.message)
        }
    }

    static async pegaTodos(req, res) {
        try {
            const tarefas = await tarefaService.pegaTodos()
            
            res.status(200).send(tarefas)
        } catch (error) {
            res.status(400).send(error.message)
        }
    }

    static async pegaPorId(req, res) {
        const { id } = req.params

        try {
            const tarefa = await tarefaService.pegaPorId(id)

            res.status(200).send(tarefa)
        } catch (error) {
            res.status(400).send(error.message)
        }
    }

    static async editarPorId(req, res) {
        const { id } = req.params
        const { titulo } = req.body

        try {
            const tarefaEditada = await tarefaService.editarPorId({ titulo, id })

            res.status(200).send(tarefaEditada)
        } catch (error) {
            res.status(400).send(error.message)
        }
    }

    static async deletarPorId(req, res) {
        const { id } = req.params;

        try {
            await tarefaService.deletarPorId(id)

            res.status(200).send("Tarefa deletada com sucesso!")
        } catch (error) {
            res.status(400).send(error.message)
        }
    }
}

module.exports = TarefaController