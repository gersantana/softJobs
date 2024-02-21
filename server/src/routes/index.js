
const router = require('express').Router()
const {getQuery} = require('../dataBase/querys/querys')
const {reportarConsulta} = require('../middlewares/index')


// router.post('/usuarios')

// router.post('/login')

router.get('/usuarios',reportarConsulta, async ( req,res) => {
    try {
        const getUsers = await getQuery()
        res.status(200).send({
           users: getUsers.rows
        })
    } catch (error) {
        console.log(error)
    }
})

//mensaje si no hay coincidencias con las rutas anteriores
router.get("*", (req, res) => {
    res.status(404).send("La ruta solicitada no existe")
})

module.exports = router