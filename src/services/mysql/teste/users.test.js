const test = require('ava')
require('dotenv').config()
const sha1 = require('sha1')

const { connection, errorHandler } = require('./setup')
const users = require('../users')({ connection, errorHandler })

test.beforeEach(t => connection.query('TRUNCATE TABLE users'))
test.after.always(t => connection.query('TRUNCATE TABLE users'))

const create = () => users.save('user-test@gmail.com', '123456')

test('Deve listar usuários', async t => {
    await create()
    await create()
    const list = await users.all()
    t.is(list.users.length, 2)
})

test('Deve criar um usuário', async t => {
    const result = await create()
    t.is(result.user.email, 'user-test@gmail.com')
})

test('Deve atualizar a senha de um usuário', async t => {
    await create()
    const result = await users.update(1, 654321)
    t.is(result.user.id, 1)
    t.is(result.affectedRows, 1)
})

test('Deve remover um usuário', async t => {
    await create()
    const result = await users.del(1)
    t.is(result.affectedRows, 1)
})
