const sha1 = require('sha1')
const jwt = require('jsonwebtoken')

const auth = deps => {
    return {

        authenticate: (email, senha) => {

            return new Promise((resolve, reject) => {

                const { connection, errorHandler } = deps

                const queryString = 'SELECT id, email FROM users WHERE email = ? AND senha = ?'
                const queryData = [email, sha1(senha)]

                connection.query(queryString, queryData, (error, results) => {
                    if (error || !results.length) {
                        errorHandler(error, 'Falha ao localizar o usuário!', reject)
                        return false
                    }

                    const {email, id} = results[0]

                    const token = jwt.sign({email, id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24})
                    resolve({ token })
                })
            })
        },

        save: (email, senha) => {

            return new Promise((resolve, reject) => {

                const { connection, errorHandler } = deps

                connection.query('INSERT INTO users (email, senha) VALUES (?, ?) ', [email, sha1(senha)], (error, results) => {
                    if (error) {
                        errorHandler(error, `Falha ao salvar usuários ${email}`, reject)
                        return false
                    }
                    resolve({ user: { email, id: results.insertId } })
                })
            })
        },

        update: (id, senha) => {
            return new Promise((resolve, reject) => {

                const { connection, errorHandler } = deps

                connection.query('UPDATE users SET senha = ? WHERE id = ?', [sha1(senha), id], (error, results) => {

                    if (error || !results.affectedRows) {
                        errorHandler(error, `Falha ao atualizar usuário de ${id}`, reject)
                        return false
                    }
                    resolve({ user: { id }, affectedRows: results.affectedRows })
                })
            })
        },

        del: (id) => {
            return new Promise((resolve, reject) => {

                const { connection, errorHandler } = deps

                connection.query('DELETE FROM users WHERE id = ?', [id], (error, results) => {
                    if (error || !results.affectedRows) {
                        errorHandler(error, `Falha ao excluir usuário id ${id}`, reject)
                        return false
                    }
                    resolve({ message: 'Usuário removido com sucesso!', affectedRows: results.affectedRows })
                })
            })
        }
    }

}

module.exports = auth
