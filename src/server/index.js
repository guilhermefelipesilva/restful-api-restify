const restify = require('restify')

const server = restify.createServer()

const routes = require('../http/routes')

const cors = require('./cors')

const jwdMiddleware = require('./jwtMiddleware')

server.pre(cors.preflight)

server.use(cors.actual)

server.use(restify.plugins.bodyParser())

const exclusions = ['/autenticacao']

server.use(jwdMiddleware({ exclusions }))

routes(server)

module.exports = server
