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

    beforeEach(() => {
        appBox = shallow(<App people={people()}/>)
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
    })
})
