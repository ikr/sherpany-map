import React from 'react'
import assert from 'assert'
import {shallow} from 'enzyme'
import Pin from '../src/Pin'

describe('Pin', () => {
    it('is a function', () => {
        assert.strictEqual(typeof Pin, 'function')
    })
})

describe('Pin element', () => {
    let pinBox = shallow(<Pin coordinates={[90, 0]}/>)

    it('is a Marker', () => {
        assert.strictEqual(pinBox.name(), 'Marker')
    })

    it('sets the marker.coordinates prop', () => {
        assert.deepEqual(pinBox.prop('marker').coordinates, [90, 0])
    })

    it('comes in style', () => {
        assert.notDeepEqual(pinBox.prop('style').default, {})
        assert.notDeepEqual(pinBox.prop('style').hover, {})
        assert.notDeepEqual(pinBox.prop('style').pressed, {})
    })

    it('contains a path element', () => {
        assert(pinBox.find('g > path').exists())
    })

    it('contains a circle element', () => {
        assert(pinBox.find('g > circle').exists())
    })
})
