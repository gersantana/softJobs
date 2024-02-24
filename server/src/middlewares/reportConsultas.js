// REPORTA CONSULTAS REALIZADAS EN CONSOLA
const reportarConsultaMiddleWare = async (req, res, next) => {
    // Parametros
    const body = req.body
    const parametrosURL = req.query
    const url = req.url
    const method = req.method

    // Validaciones 
    if (Object.keys(body).length === 0 && Object.keys(parametrosURL).length === 0) {
        console.log(`Se ha recibido una consulta; ${new Date()}.
        URl: ${url}.
        METHOD: ${method}.`)
        next()
        return
    }
    else if (Object.keys(body).length === 0) {
        console.log(`Se ha recibido una consulta; ${new Date()}.
        URl: ${url}.
        METHOD: ${method}.`)
        console.log("PARÁMETROS:")
        console.table(parametrosURL)
        next()
        return
    }
    else if (Object.keys(parametrosURL).length === 0) {
        console.log(`Se ha recibido una consulta; ${new Date()}.
        URl: ${url}.
        METHOD: ${method}.`)
        console.log("BODY:")
        console.table(body)
        next()
        return
    }
    else {
        console.log(`Se ha recibido una consulta; ${new Date()}.
        URl: ${url}.
        METHOD: ${method}.`)
        console.log("BODY:")
        console.table(body)
        console.log("PARÁMETROS:")
        console.table(parametrosURL)
        next()
        return
    }
}

module.exports = reportarConsultaMiddleWare