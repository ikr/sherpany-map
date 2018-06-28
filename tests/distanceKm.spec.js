import assert from 'assert'
import distanceKm from '../src/distanceKm'

function assertFloatsClose (a, b, epsilon) {
    assert(Math.abs(a - b) < epsilon, `Expected |${a} - ${b}| < ${epsilon}`)
}

describe('distanceKm', () => {
    it('is a function', () => {
        assert.strictEqual(typeof distanceKm, 'function')
    })

    it('well, works', () => {
        assertFloatsClose(distanceKm([0, 0], [0, 180]), 20015, 1)
    })
})
