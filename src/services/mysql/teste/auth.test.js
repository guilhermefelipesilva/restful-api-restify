const test = require('ava')
require('dotenv').config()

const { connection, errorHandler } = require('./setup')

const users = require('../users')({ connection, errorHandler })

const auth = require('../auth')({ connection, errorHandler })

const create = () => users.save('user-test@gmail.com', '123456')

test.beforeEach(t => connection.query('TRUNCATE TABLE users'))
test.after.always(t => connection.query('TRUNCATE TABLE users'))

test('Login usuário com sucesso', async t => {
    await create()
    const result = await auth.authenticate('user-test@gmail.com', '123456')

    t.not(result.tolken, null)
    t.not(result.token.lenth, 0)
    
})

test('Login usuário com falha', async t => {
    await create()
    const promise = auth.authenticate('user-test2@gmail.com', '123456')
    const error = await t.throws(promise)
    t.is(error.error, 'Falha ao localizar o usuário!')
    
})
