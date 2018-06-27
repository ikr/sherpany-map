import React from 'react'
import assert from 'assert'
import {shallow} from 'enzyme'
import App from '../src/App'

function people () {
    return [{
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
    }]
}

describe('App', () => {
    it('is a function', () => {
        assert.strictEqual(typeof App, 'function')
    })
})

describe('App element', () => {
    let appBox

    beforeEach(done => {
        appBox = shallow(<App people={people()}/>)
        appBox.setState({pinCoordinates: [42, 42]}, done)
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

        it('has the coordinates change listener assigned', () => {
            assert.strictEqual(
                mapBox.prop('onCoordinatesClick'),
                appBox.instance().handleCoordinatesClick
            )
        })

        it('has the pin coordinates from the state assigned', () => {
            assert.deepEqual(mapBox.prop('pinCoordinates'), [42, 42])
        })
    })

    describe('handleCoordinatesClick', () => {
        beforeEach(done => {
            appBox.instance().handleCoordinatesClick([3, 5], done)
        })

        it('changes the pin coordinates in the app state', () => {
            assert.deepEqual(appBox.state('pinCoordinates'), [3, 5])
        })
    })
})
