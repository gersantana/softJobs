
const router = require('express').Router()
const { reportarConsultaMiddleWare, validacionesNuevoUsuario, validacionesVerificarUsuario } = require('../middlewares/index')
const { nuevoUsuarioController, verificarCredencialesController, getUsuarioTokenController } = require('../controllers/index')

router.post('/usuarios', validacionesNuevoUsuario, reportarConsultaMiddleWare, nuevoUsuarioController)

router.post('/login', reportarConsultaMiddleWare, validacionesVerificarUsuario, verificarCredencialesController)

router.get('/usuarios',reportarConsultaMiddleWare, getUsuarioTokenController )

//mensaje si no hay coincidencias con las rutas anteriores
router.get("*", (req, res) => {
    res.status(404).send("La ruta solicitada no existe")
})

module.exports = router