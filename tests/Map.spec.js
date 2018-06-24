import React from 'react'
import assert from 'assert'
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
        mapBox = shallow(<Map markers={[]}/>)
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

describe('Map element with 2 markers', () => {
    const m1 = {
        name: 'Catherine Brady',
        coordinates: [-7.0208, 97.2450],
        selected: true
    }

    const m2 = {
        name: 'Matthew Knight',
        coordinates: [43.1676, 26.5837],
        selected: false
    }

    let mapBox

    beforeEach(() => {
        mapBox = shallow(<Map markers={[m1, m2]}/>)
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
})
