const pool = require('../../dataBase/index')
const format = require('pg-format')
const bcrypt = require('bcryptjs')


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

// Funcion para registrar nuevo usuario
const registrarUsuarioQuery = async (email, password, rol, lenguage) => {

    try {
        const encryptPassword = bcrypt.hashSync(password)
        password = encryptPassword
        const values = [email, password, rol, lenguage]
        const consulta = format(`INSERT INTO usuarios (email,password,rol,lenguage) 
                                 VALUES(%L, %L, %L, %L) RETURNING *`, ...values
        );
        const result = await pool.query(consulta)
        return result.rows

    } catch (error) {
        // captura el error de restriccion UNIQUE para el email
        if (error.code === '23505' && error.constraint === 'usuarios_email_key') {
            throw new Error('El correo electrónico ya está registrado. Ingresa un correo diferente.');
        }
        console.error(`Error al en registrarUsuarioQuery:`, error.message)
        throw new Error(`Error en el servidor intentar mas tarde`)

    }
}

// Verificacion de credenciales
const verificarCredencialesQuery = async (email) => {
    try {
        const values = [email]
        const consulta = format("SELECT * FROM usuarios WHERE email = %L", ...values)
        const {rows:[usuario] } = await pool.query(consulta)
        return usuario
    } catch (error) {
        console.error(`Error aja al en verificarCredencialesQuery:`, error.message)
        throw new Error(`Error en el servidor intentar mas tarde`)
    }

}

module.exports = {
    getQuery,
    registrarUsuarioQuery,
    verificarCredencialesQuery
}