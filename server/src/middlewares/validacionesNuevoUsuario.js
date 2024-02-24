
// Valida el formulario para ingreso de nuevo usuario
const validacionesNuevoUsuario = (req, res, next) => {

    const { email, password, rol, lenguage } = req.body
    const body = req.body

    if (Object.keys(body).length === 0) {
        res.status(400).json({
            Msg: `No se puedes enviar el formulario vació`
        })
        console.log(`No se puedes enviar el formulario vació`)
        return
    } else if (!email) {
        res.status(400).json({
            Msg: `Ingresa un Email para tu registro`
        })
        console.log(`Campo email vació`)
        return
    } else if (!password) {
        res.status(400).json({
            Msg: `Ingresa una Password para tu registro`
        })
        console.log(`Campo Password vació`)
        return
    } else if (!rol) {
        res.status(400).json({
            Msg: `Ingresa un Rol para tu registro`
        })
        console.log(`Campo Rol vació`)
        return
    } else if (!lenguage) {
        res.status(400).json({
            Msg: `Ingresa un Lenguaje para tu registro`
        })
        console.log(`Campo lenguaje vació`)
        return
    } else {
        next()
    }
}

module.exports = validacionesNuevoUsuario