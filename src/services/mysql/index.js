const mysqlServer = require('mysql')

const connection = mysqlServer.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'restful-ws',
    database: 'restful-ws'
})

const categories = new Promise((resolve, reject) => {

    connection.query('SELECT * FROM categories', (error, results) => {
        if (error) {
            reject(error)
        }
        resolve({ categories: results })
    })
})

module.exports = categories
