import assert from 'assert'
import personMapMarker from '../src/personMapMarker'

describe('personMapMarker', () => {
    it('is a function', () => {
        assert.strictEqual(typeof personMapMarker, 'function')
    })

    it('properly projects/transforms the person data', () => {
        assert.deepEqual(
            personMapMarker({
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
            }),
            {name: 'Matthieu Roux', coordinates: [-121.3184, -50.9341]}
        )
    })
})
