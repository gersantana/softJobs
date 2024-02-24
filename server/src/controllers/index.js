const { registrarUsuarioQuery, verificarCredencialesQuery } = require(`../dataBase/querys/querys`)
const jwt = require('jsonwebtoken')


const nuevoUsuarioController = async (req, res) => {
    try {
        const { email, password, rol, lenguage } = req.body
        const registrarUsuario = await registrarUsuarioQuery(email, password, rol, lenguage)
        res.status(200).json({
            msg: 'Usuario registrado exitosamente',
            User: registrarUsuario
        })
    } catch (error) {
        console.log(`error: ${error.tittle}: ${error.message}`)
        // envia una respuesta al usuario si exite el email
        if (error.message.includes('El correo electrónico ya está registrado')) {
            res.status(400).json({
                error: error.message
            });
            return
        }
        res.status(500).json({
            error: `Error en el servidor intentar mas tarde`
        })
    }
}

const verificarCredencialesController = async (req, res) => {
    try {
        const { email, password } = req.body
        await verificarCredencialesQuery(email, password)
        const crearToken = jwt.sign({ email }, "az_AZ")
        res.status(200).json({
            Msg: `Usuario con el Email: ${email} Verificado exitosamente`,
            Token: crearToken
        })
    } catch (error) {
        console.log(`error: ${error.tittle}: ${error.message}`)
        res.status(500).json({
            error: `Error en el servidor intentar mas tarde`
        })
    }
}

const getUsuarioTokenController = async (req, res) => {
    try {
        const authorization = req.header("Authorization")
        const token = authorization.split("Bearer ")[1]
        jwt.verify(token, "az_AZ")
        const { email } = jwt.decode(token)
        const usuario = await verificarCredencialesQuery(email)
        res.status(200).send({
            Msg: 'token obtenido',
            User: usuario
        })
    } catch (error) {
        console.log(`Error en getUsuarioTokenController:`, error.message)
        if (error.message.includes('invalid token')) {
            res.status(401).json({
                error: 'Error de autenticación Token invalido.'
            });
            return
        }
        res.status(500).json({
            Error: 'Error en el servidor intentar mas tarde'
        })
    }
}


module.exports = {
    nuevoUsuarioController,
    verificarCredencialesController,
    getUsuarioTokenController
}