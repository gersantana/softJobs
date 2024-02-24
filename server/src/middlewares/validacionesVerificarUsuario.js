const { verificarCredencialesQuery } = require("../dataBase/querys/querys")
const bcrypt = require('bcryptjs')

// Validaciones para validar credenciales de usuario
const validacionesVerificarUsuario = async (req, res, next) => {

    try {
        const { email, password } = req.body
        const body = req.body
        const usuario = await verificarCredencialesQuery(email, password)

        // Validaciones antes de comparar contraseña
        if (Object.keys(body).length === 0) {
            res.status(400).json({
                Msg: `El Email y la contraseña son requeridos`
            })
            return
        } else if (!email) {
            res.status(400).json({
                Msg: `Debes ingresar tu Email`
            })
            return
        } else if (!usuario) {
            res.status(401).json({
                Msg: `Email no registrado`
            })
            return
        } else if (!password) {
            res.status(400).json({
                Msg: `Debes ingresar tu Contraseña`
            })
            return
        }

        // Compara las contraseñas encryptadas
        const { password: passwordEncrypt } = usuario
        const compararPassword = bcrypt.compareSync(password, passwordEncrypt)
        if (!compararPassword || !usuario) {
            res.status(401).json({
                Msg: `Contraseña incorrecta`
            })
            return
        } else {
            next()
        }

    } catch (error) {
        console.log(`error en validacionesVerificarUsuario: ${error.tittle}: ${error.message}`)
        res.status(500).json({
            Msg: `Error en el servidor, intenta de nuevo más tarde`
        })
    }
}

module.exports = validacionesVerificarUsuario