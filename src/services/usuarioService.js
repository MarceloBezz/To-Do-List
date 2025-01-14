const database = require('../models')
const { v4 } = require('uuid')
const { hash } = require('bcryptjs')

class UsuarioService {
    async cadastrarUsuario(dto) {
        const usuario = await database.usuarios.findOne({
            where: {
                nome: dto.nome
            }
        })

        if (usuario) {
            throw new Error("Nome de usuário já cadastrado")
        }

        try {
            const hashSenha = await hash(dto.senha, 8)
            const novoUsuario = await database.usuarios.create({
                id: v4(),
                nome: dto.nome,
                senha: hashSenha
            })
            return novoUsuario

        } catch (error) {
            throw new Error("Erro ao cadastrar usuário")
        }
    }

    async pegaTodos() {
        try {
            return await database.usuarios.findAll()
        } catch (error) {
            throw new Error("Erro ao buscar usuários")
        }
    }

    async pegaPorId(id) {
        const usuario = await database.usuarios.findOne({
            where: {
                id: id
            },
            include: {
                model: database.tarefas,
                as: 'tarefas'
            }
        })

        if (!usuario) {
            throw new Error("Usuário não cadastrado")
        }
        
        return usuario
    }

    async editar(dto) {
        const usuario = await this.pegaPorId(dto.id)
        
        try {
            usuario.nome = dto.nome

            if(dto.senha !== undefined) {
                const hashSenha = await hash(dto.senha, 8)
                usuario.senha = hashSenha
            }
            
            await usuario.save()
            return usuario;
        } catch (error) {
            throw new Error("Erro ao editar usuário")
        }
    }

    async deletar(id) {
        await this.pegaPorId(id);

        await database.usuarios.destroy({
            where: {
                id: id
            }
        })
    }
}

module.exports = UsuarioService;