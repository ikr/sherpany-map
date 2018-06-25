import React from 'react'
import assert from 'assert'
import {spy} from 'sinon'
import {shallow} from 'enzyme'
import Map from '../src/Map'

describe('Map', () => {
    it('is a function', () => {
        assert.strictEqual(typeof Map, 'function')
    })
})

describe('Map element structure', () => {
    let mapBox

    beforeEach(() => {
        mapBox = shallow(
            <Map markers={[]} selectedMarkerIds={[]} onMarkerClick={() => 0}/>
        )
    })

    it('is a div on top level', () => {
        assert.strictEqual(mapBox.type(), 'div')
    })

    it('comes in style', () => {
        assert(mapBox.prop('style'))
    })

    describe('ComposableMap', () => {
        let composableMapBox

        beforeEach(() => {
            composableMapBox = mapBox.find('ComposableMap')
        })

        it('is present', () => {
            assert(composableMapBox.exists())
        })

        it('has the width value matching the maxWidth of the container', () => {
            assert.strictEqual(composableMapBox.prop('width'), mapBox.prop('style').maxWidth)
        })

        describe('ZoomableGroup', () => {
            let zoomableGroupBox

            beforeEach(() => {
                zoomableGroupBox = composableMapBox.find('ZoomableGroup')
            })

            it('is present', () => {
                assert(zoomableGroupBox.exists())
            })

            describe('Geographies', () => {
                let geographiesBox

                beforeEach(() => {
                    geographiesBox = zoomableGroupBox.find('Geographies')
                })

                it('is present', () => {
                    assert(geographiesBox.exists())
                })

                it('uses the proper world data', () => {
                    assert.strictEqual(geographiesBox.prop('geography'), 'world-110m.json')
                })
            })

            describe('Markers', () => {
                let markersBox

                beforeEach(() => {
                    markersBox = zoomableGroupBox.find('Markers')
                })

                it('is present', () => {
                    assert(markersBox.exists())
                })
            })
        })
    })
})

describe('Map element with 2 markers and a pin', () => {
    const m1 = {
        id: 8,
        name: 'Catherine Brady',
        coordinates: [-7.0208, 97.2450]
    }

    const m2 = {
        id: 5,
        name: 'Matthew Knight',
        coordinates: [43.1676, 26.5837]
    }

    let mapBox

    beforeEach(() => {
        mapBox = shallow(
            <Map
                markers={[m1, m2]}
                selectedMarkerIds={[8]}
                onMarkerClick={() => 0}
                pinCoordinates={[91, 1]}/>
        )
    })

    it('renders 2 markers', () => {
        assert.strictEqual(mapBox.find('Marker').length, 2)
    })

    describe('1st marker', () => {
        let markerBox

        beforeEach(() => {
            markerBox = mapBox.find('Marker').at(0)
        })

        it('is filled with yellow as it\'s selected', () => {
            assert.strictEqual(markerBox.prop('style').default.fill, 'yellow')
        })
    })

    describe('2nd marker', () => {
        let markerBox

        beforeEach(() => {
            markerBox = mapBox.find('Marker').at(1)
        })

        it('is present', () => {
            assert(markerBox.exists())
        })

        it('recerives the proper marker prop value from the Map', () => {
            assert.deepEqual(markerBox.prop('marker'), m2)
        })

        it('is filled with red-ish as it\'s not selected', () => {
            assert.strictEqual(markerBox.prop('style').default.fill, '#FF5722')
        })
    })

    it('contains a Pin element with the passed coordinates', () => {
        assert.deepEqual(mapBox.find('Pin').prop('coordinates'), [91, 1])
    })
})

describe('Map element without a pin', () => {
    let mapBox

    beforeEach(() => {
        mapBox = shallow(
            <Map markers={[]} selectedMarkerIds={[]} onMarkerClick={() => 0}/>
        )
    })

    it('doesn\'t have a Pin element', () => {
        assert(!mapBox.find('Pin').exists())
    })
})

describe('Map event', () => {
    let mapBox
    let onMarkerClick

    beforeEach(() => {
        onMarkerClick = spy()

        mapBox = shallow(
            <Map
                markers={[{id: 4, name: '', coordinates: [0, 0]}]}
                selectedMarkerIds={[]}
                onMarkerClick={onMarkerClick}/>
        )
    })

    describe('marker click', () => {
        beforeEach(() => {
            mapBox.find('Marker').at(0).simulate('click')
        })

        it('triggers the onMarkerClick with a proper ID', () => {
            assert(onMarkerClick.calledOnceWith(4))
        })
    })
})
