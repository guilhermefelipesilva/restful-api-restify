require('dotenv').config()
const test = require('ava')

const { connection, errorHandler } = require('./setup')
const categories = require('../categories')({ connection, errorHandler })

test.beforeEach(t => connection.query('TRUNCATE TABLE categories'))
test.after.always(t => connection.query('TRUNCATE TABLE categories'))

const createCategory = () => categories.save('category-test')

test('Deve criar uma categoria', async t => {
    const result = await createCategory()
    t.is(result.categories.name, 'category-test')
})

test('Deve atualizar uma categoria', async t => {
    await createCategory()
    const result = await categories.update(1, 'category-test-updated')
    t.is(result.categories.name, 'category-test-updated')
    t.is(result.affectedRows, 1)
})

test('Deve remover uma categoria', async t => {
    await createCategory()
    const result = await categories.del(1)
    t.is(result.affectedRows, 1)
})
