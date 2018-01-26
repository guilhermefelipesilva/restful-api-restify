
const jwt = require('jsonwebtoken')

const jwdMiddleware = (deps) => {
    return async (req, res, next) => {

        if (!deps.exclusions.includes(req.href())) {

            console.log(req.href())

            const token = req.headers['x-access-token']

            if (!token) {
                res.send(403, { error: 'Token não encontrado' })
                return false
            }

            await jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
                if (error) {
                    res.send(403, { error: 'Token inválido' })
                } else {
                    console.log(decoded)
                }
            })
        }

        next()
    }
}

module.exports = jwdMiddleware
