const { Client } = require('pg')
require('dotenv').config()

const createClient = () => {
  const { HOST, PORT, DB_USER, PASSWORD, DATABASE } = process.env;

  return new Client({
    host: HOST,
    port: PORT,
    user: DB_USER,
    password: PASSWORD,
    database: DATABASE
  })
}

module.exports = { createClient }
