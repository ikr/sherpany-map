import React from 'react'
import assert from 'assert'
import {shallow} from 'enzyme'
import App from '../src/App'
import byId from '../src/byId'

function people () {
    return [{
        id: 1,
        name: {title: 'monsieur', first: 'matthieu', last: 'roux'},
        location: {
            street: '605 place du 22 novembre 1943',
            city: 'alle',
            state: 'vaud',
            postcode: 9424,
            coordinates: {latitude: '-50.9341', longitude: '-121.3184'},
            timezone: {
                offset: '+9:00',
                description: 'Tokyo, Seoul, Osaka, Sapporo, Yakutsk'
            }
        },
        email: 'matthieu.roux@example.com',
        cell: '(826)-020-3024',
        picture: {
            large: 'https://randomuser.me/api/portraits/men/81.jpg',
            medium: 'https://randomuser.me/api/portraits/med/men/81.jpg',
            thumbnail: 'https://randomuser.me/api/portraits/thumb/men/81.jpg'
        }
    }, {
        id: 2,
        name: {title: 'mrs', first: 'melanie', last: 'wanke'},
        location: {
            street: 'neue straße 68',
            city: 'hersbruck',
            state: 'nordrhein-westfalen',
            postcode: 50431,
            coordinates: {latitude: '5.0457', longitude: '-5.6224'},
            timezone: {offset: '-3:30', description: 'Newfoundland'}},
        email: 'melanie.wanke@example.com',
        cell: '0170-3472907',
        picture: {
            large: 'https://randomuser.me/api/portraits/women/3.jpg',
            medium: 'https://randomuser.me/api/portraits/med/women/3.jpg',
            thumbnail: 'https://randomuser.me/api/portraits/thumb/women/3.jpg'
        }
    }]
}

function mockPeopleOfInterest () {
    return {nearestId: 2, otherSideNearestId: 1, farthestId: 2}
}

describe('App', () => {
    it('is a function', () => {
        assert.strictEqual(typeof App, 'function')
    })
})

describe('App element', () => {
    let appBox

    beforeEach(done => {
        appBox = shallow(<App peopleById={byId(people())} peopleOfInterest={mockPeopleOfInterest}/>)

        appBox.setState({
            pinCoordinates: [42, 42],
            selectedMarkerIds: [1]
        }, done)
    })

    it('has a Map on top level', () => {
        assert.strictEqual(appBox.name(), 'Map')
    })

    describe('Map', () => {
        let mapBox

        beforeEach(() => {
            mapBox = appBox.find('Map')
        })

        it('is present', () => {
            assert(mapBox.exists())
        })

        it('has an identified marker', () => {
            assert(mapBox.prop('markers')[0].id > 0)
        })

        it('has the pin coordinates from the state assigned', () => {
            assert.deepEqual(mapBox.prop('pinCoordinates'), [42, 42])
        })

        it('has the coordinates change listener assigned', () => {
            assert.strictEqual(
                mapBox.prop('onCoordinatesClick'),
                appBox.instance().handleCoordinatesClick
            )
        })

        it('has the selected marker ID-s from the state assigned', () => {
            assert.deepEqual(mapBox.prop('selectedMarkerIds'), [1])
        })

        it('has the marker click handler assigned', () => {
            assert.strictEqual(mapBox.prop('onMarkerClick'), appBox.instance().handleMarkerClick)
        })
    })

    describe('handleCoordinatesClick', () => {
        beforeEach(done => {
            appBox.instance().handleCoordinatesClick([3, 5], done)
        })

        it('changes the pin coordinates in the app state', () => {
            assert.deepEqual(appBox.state('pinCoordinates'), [3, 5])
        })

        it('clears the marker selection', () => {
            assert.deepEqual(appBox.state('selectedMarkerIds'), [])
        })
    })

    describe('handleMarkerClick', () => {
        beforeEach(done => {
            appBox.instance().handleMarkerClick(133, done)
        })

        it('sets the newly selected marker in the app state', () => {
            assert.deepEqual(appBox.state('selectedMarkerIds'), [133])
        })

        it('clears the pin', () => {
            assert.strictEqual(appBox.state('pinCoordinates'), null)
        })
    })
})
