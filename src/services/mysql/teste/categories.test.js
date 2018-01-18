require('dotenv').config()
const test = require('ava')

const { connection, errorHandler } = require('./setup')
const categories = require('../categories')({ connection, errorHandler })

test('Deve criar uma categoria', async t => {
    const result = await categories.save('category-test')
    t.is(result.categories.name, 'category-test')
})
