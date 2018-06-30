import React from 'react'
import assert from 'assert'
import {shallow} from 'enzyme'
import ContactCards from '../src/ContactCards'

function cards () {
    return [
        {
            title: 'In test',
            person: person()
        }
    ]
}

function person () {
    return {
        name: {title: 'mr', first: 'roope', last: 'jokela'},
        location: {
            street: '4852 myllypuronkatu',
            city: 'nastola',
            state: 'southern ostrobothnia',
            postcode: 47754,
            coordinates: {latitude: '-26.3781', longitude: '-103.5404'},
            timezone: {offset: '+9:30', description: 'Adelaide, Darwin'}
        },
        email: 'roope.jokela@example.com',
        cell: '044-489-62-27',
        picture: {
            large: 'https://randomuser.me/api/portraits/men/66.jpg',
            medium: 'https://randomuser.me/api/portraits/med/men/66.jpg',
            thumbnail: 'https://randomuser.me/api/portraits/thumb/men/66.jpg'
        }
    }
}

describe('ContactCards', () => {
    it('is a function', () => {
        assert.strictEqual(typeof ContactCards, 'function')
    })
})

describe('ContactCards element', () => {
    let contactCardsBox

    beforeEach(() => {
        contactCardsBox = shallow(<ContactCards cards={cards()} />)
    })

    it('is a div on the top level', () => {
        assert.strictEqual(contactCardsBox.name(), 'div')
    })

    it('has "cards" top level CSS class', () => {
        assert(contactCardsBox.hasClass('cards'))
    })

    describe('nested ContactCard', () => {
        let contactCardBox

        beforeEach(() => {
            contactCardBox = contactCardsBox.find('ContactCard')
        })

        it('is present', () => {
            assert(contactCardBox.exists())
        })

        it('receives the proper title', () => {
            assert.strictEqual(contactCardBox.prop('title'), 'In test')
        })

        it('receives the proper person', () => {
            assert.deepEqual(contactCardBox.prop('person'), person())
        })
    })

    describe('vCard download link', () => {
        let aBox

        beforeEach(() => {
            aBox = contactCardsBox.find('a[download]')
        })

        it('is present', () => {
            assert(aBox.exists())
        })

        it('has the downloaded file name assigned', () => {
            assert.strictEqual(aBox.prop('download'), 'contacts.vcf')
        })

        it('has the proper text', () => {
            assert.strictEqual(aBox.text(), 'Download as a vCard file')
        })

        it('has a data href', () => {
            assert.strictEqual(
                aBox.prop('href').indexOf('data:text/plain;charset=utf-8,'),
                0
            )
        })
    })
})
