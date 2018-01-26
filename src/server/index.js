const restify = require('restify')

const jwt = require('jsonwebtoken')

const server = restify.createServer()

const routes = require('../http/routes')

const cors = require('./cors')

server.pre(cors.preflight)

server.use(cors.actual)

server.use(restify.plugins.bodyParser())

server.use(async (req, res, next) => {

    const token = req.headers['x-access-token']

    if (!token) {
        res.send(403, { error: 'Token não encontrado' })
        return false
    }
    next()

    await jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            res.send(403, { error: 'Token inválido' })
        } else {
            console.log(decoded)
        }
    })
})

routes(server)

module.exports = server
