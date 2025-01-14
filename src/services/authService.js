const database = require('../models')
const { compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')

class AuthService {
    async login(dto) {
        const usuario = await database.usuarios.scope('todasAsColunas').findOne({
            where: {
                nome: dto.nome
            }
        })
        
        if(!usuario) {
            throw new Error("Usuário não cadastrado")
        }

        const senhasIguais = await compare(dto.senha, usuario.senha)
        
        if(!senhasIguais) {
            throw new Error("Usuário e/ou senha incorreto(s)")
        }

        const accessToken = sign({
            id: usuario.id,
            nome: usuario.nome
        }, process.env.CHAVESECRETA, {
            expiresIn: 86400
        });

        return { accessToken }
    }
}

module.exports = AuthService