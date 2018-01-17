const mysqlServer = require('mysql')

const connection = mysqlServer.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'restful-ws',
    database: 'restful-ws'
})

const contegoryModule = require('./categories')({ connection })

module.exports = {
    categories: () => contegoryModule
}
