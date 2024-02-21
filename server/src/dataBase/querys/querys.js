const pool = require('../../dataBase/index')

const getQuery = async () => {
    try {
        const consulta = "SELECT * FROM usuarios"
        const result = await pool.query(consulta)
        return result
    } catch (error) {
        throw {
            message: "Error al ejecutar la consulta sql",
            originalError: error.message,
        };
    }

}

module.exports = {
    getQuery
}