const mysqlServer = require('mysql')

const connection = mysqlServer.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'restful-ws',
    database: 'restful-ws'
})

const errorHandler = (error, msg, rejectFunction) => {
    console.error(error)
    rejectFunction({error: msg})
}

const contegoryModule = require('./categories')({ connection, errorHandler })

module.exports = {
    categories: () => contegoryModule
}
