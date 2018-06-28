import assert from 'assert'
import peopleOfInterest from '../src/peopleOfInterest'

function person (id, longitude, latitude) {
    return {id, location: {coordinates: {latitude, longitude}}}
}

describe('peopleOfInterest', () => {
    it('is a function', () => {
        assert.strictEqual(typeof peopleOfInterest, 'function')
    })

    it('well, works', () => {
        assert.deepEqual(peopleOfInterest([0, 0], [
            person(1, 1, 1),
            person(2, 2, 2),
            person(3, 180, 0),
            person(4, 179, 0),
            person(5, 178, 0)
        ]), {
            nearestId: 1,
            otherSideNearestId: 5,
            farthestId: 3
        })
    })
})
