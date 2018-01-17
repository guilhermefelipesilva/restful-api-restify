const mysqlServer = require('mysql')

const connection = mysqlServer.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'restful-ws',
    database: 'restful-ws'
})

const categories = require('./categories')({ connection })

module.exports = categories
