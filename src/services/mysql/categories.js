
const categories = deps => {
    const { connection } = deps

    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM categories', (error, results) => {
            if (error) {
                reject(error)
            }
            resolve({ categories: results })
        })
    })
}

module.exports = categories
