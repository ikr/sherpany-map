import assert from 'assert'
import isOnOtherSphereSide from '../src/isOnOtherSphereSide'

describe('isOnOtherSphereSide', () => {
    it('is a function', () => {
        assert.strictEqual(typeof isOnOtherSphereSide, 'function')
    })

    it('is true for the diametrically opposite points', () => {
        assert(isOnOtherSphereSide([0, 0], [180, 0]))
    })

    it('is true for a slightly-over-the-border point', () => {
        assert(isOnOtherSphereSide([0, 0], [91, 0]))
    })

    it('is false for the origin = target', () => {
        assert(!isOnOtherSphereSide([1, 1], [1, 1]))
    })

    it('is false for slightly different points', () => {
        assert(!isOnOtherSphereSide([1, 1], [2, 2]))
    })
})
