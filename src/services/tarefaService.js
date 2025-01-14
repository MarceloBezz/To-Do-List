const database = require('../models')

const UsuarioService = require('../services/usuarioService')
const usuarioService = new UsuarioService()

const { v4 } = require('uuid')


class TarefaService {
    async cadastrar(dto) {
        try {
            const novaTarefa = await database.tarefas.create({
                id: v4(),
                titulo: dto.titulo,
                usuario_id: dto.usuarioId
            })
            
            return novaTarefa
        } catch (error) {
            throw new Error("Erro ao cadastrar tarefa")
        }
    }

    async pegaTodos() {
        try {
            const tarefas = await database.tarefas.findAll({
                include: {
                    model: database.usuarios,
                    attributes: ['nome']
                }
            })

            return  tarefas
        } catch (error) {
            throw new Error("Erro ao buscar tarefas")
        }
    }

    async pegaPorId(id) {
        const tarefa = await database.tarefas.findOne({
            where: {
                id: id
            }
        })

        if(!tarefa) {
            throw new Error("Tarefa não cadastrada")
        }

        return tarefa
    }

    async editarPorId(dto) {
        const tarefa = await this.pegaPorId(dto.id)

        try {
            tarefa.titulo = dto.titulo
            await tarefa.save()
            return tarefa
        } catch (error) {
            throw new Error("Erro ao atualizar tarefa")
        }
    }

    async deletarPorId(id) {
        await this.pegaPorId(id)

        try {
            await database.tarefas.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw new Error("Erro ao deletar tarefa")
        }
    }
}

module.exports = TarefaService;