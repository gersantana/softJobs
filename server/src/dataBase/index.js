require('dotenv').config()
const pg = require('pg')
const { Pool } = pg

// config db
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATA_BASE,
  host: process.env.DB_HOST,
  port: 5432,
  allowExitOnIdle: true
})

// test Conection db
const testDb = async () => {
  const result = await pool.query(`SELECT NOW()`)
  console.log(`Conexxion establecida con la base de datos:`, result.rows[0].now)
  return result
}
testDb()

module.exports = pool