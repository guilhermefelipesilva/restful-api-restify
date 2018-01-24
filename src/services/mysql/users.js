const sha1 = require('sha1')

const users = deps => {
    return {

        all: () => {

            return new Promise((resolve, reject) => {

                const { connection, errorHandler } = deps

                connection.query('SELECT id, email FROM users', (error, results) => {
                    if (error) {
                        errorHandler(error, 'Não foi possível obter usuários!', reject)
                        return false
                    }
                    resolve({ users: results })
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

module.exports = users
