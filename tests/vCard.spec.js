import assert from 'assert'
import vCard from '../src/vCard'

function person () {
    return {
        name: {title: 'mrs', first: 'emilie', last: 'kristensen'},
        location: {
            street: '8973 udbyhøjvej',
            city: 'snertinge',
            state: 'danmark',
            postcode: 22477,
            coordinates: {latitude: '16.6085', longitude: '122.1798'},
            timezone: {offset: '+4:30', description: 'Kabul'}
        },
        email: 'emilie.kristensen@example.com',
        cell: '58261755',
        picture: {
            large: 'https://randomuser.me/api/portraits/women/71.jpg',
            medium: 'https://randomuser.me/api/portraits/med/women/71.jpg',
            thumbnail: 'https://randomuser.me/api/portraits/thumb/women/71.jpg'
        }
    }
}

describe('vCard', () => {
    it('is a function', () => {
        assert.strictEqual(typeof vCard, 'function')
    })

    it('works', () => {
        assert.strictEqual(
            vCard(person()),
            `BEGIN:VCARD
VERSION:4.0
N:Kristensen;Emilie;;Mrs;
FN:Mrs Emilie Kristensen
PHOTO;MEDIATYPE=image/jpeg:https://randomuser.me/api/portraits/women/71.jpg
TEL;TYPE=cell,voice;VALUE=uri:tel:58261755
ADR;HOME:;;8973 udbyhøjvej;Snertinge;;22477;Danmark
EMAIL:emilie.kristensen@example.com
END:VCARD
`
        )
    })
})
