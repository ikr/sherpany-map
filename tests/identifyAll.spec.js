import assert from 'assert'
import identifyAll from '../src/identifyAll'

describe('identifyAll', () => {
    it('is a function', () => {
        assert.strictEqual(typeof identifyAll, 'function')
    })

    it('add sequential id prop to all the passed objects, starting at base val', () => {
        assert.deepEqual(identifyAll(14, [{}, {}]), [{id: 14}, {id: 15}])
    })
})
