import assert from 'assert'
import React from 'react'
import {shallow} from 'enzyme'
import ContactCard from '../src/ContactCard'

function person () {
    return {
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
    }
}

describe('ContactCard', () => {
    it('is a function', () => {
        assert.strictEqual(typeof ContactCard, 'function')
    })
})

describe('ContactCard element', () => {
    let contactCardBox

    beforeEach(() => {
        contactCardBox = shallow(<ContactCard person={person()}/>)
    })

    it('is an article on the top level', () => {
        assert.strictEqual(contactCardBox.type(), 'article')
    })

    it('contains the person\'s thumbnail photo', () => {
        assert.strictEqual(
            contactCardBox.find('img').prop('src'),
            'https://randomuser.me/api/portraits/thumb/men/81.jpg'
        )
    })

    it.skip('contains the capitalized salutation and the capitalized name', () => {
        assert.strictEqual(
            contactCardBox.find('span.name').text(),
            'Monsieur Matthieu Roux'
        )
    })
})
