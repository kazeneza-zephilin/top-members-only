const { Pool } = require('pg')

//initialize database connection
const pool = new Pool({
    user: 'caz',
    host: 'localhost',
    database: 'only_members',
    password: '',
    port: 5432
})

module.exports = pool
