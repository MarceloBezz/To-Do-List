const { verify, decode } = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    const token = req.headers.authorization
    
    if(!token) {
        return res.status(401).send("Token de acesso não informado")
    }
    
    const [, acessToken] = token.split(' ')
    
    try {
        verify(acessToken, process.env.CHAVESECRETA)
        
        const { id, nome } = await decode(acessToken)
        
        req.usuarioId = id
        req.usuarioNome = nome
        

        return next()
    } catch (error) {
        res.status(401).send("Usuário não autorizado")
    }

}