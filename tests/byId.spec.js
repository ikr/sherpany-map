import assert from 'assert'
import byId from '../src/byId'

describe('byId', () => {
    it('is a function', () => {
        assert.strictEqual(typeof byId, 'function')
    })

    it('well, works', () => {
        assert.deepEqual(byId([{id: 42}, {id: 43}]), {'42': {id: 42}, '43': {id: 43}})
    })
})
