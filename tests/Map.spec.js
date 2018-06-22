import React from 'react'
import assert from 'assert'
import {shallow} from 'enzyme'
import Map from '../src/Map'

describe('Map', () => {
    it('is a function', () => {
        assert.strictEqual(typeof Map, 'function')
    })
})

describe('Map element', () => {
    let mapBox

    beforeEach(() => {
        mapBox = shallow(<Map/>)
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
        })
    })
})
