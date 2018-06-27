import React from 'react'
import assert from 'assert'
import {shallow} from 'enzyme'
import App from '../src/App'

describe('App', () => {
    it('is a function', () => {
        assert.strictEqual(typeof App, 'function')
    })
})

describe('App element', () => {
    let appBox

    beforeEach(() => {
        appBox = shallow(<App/>)
    })

    it('has a Map on top level', () => {
        assert.strictEqual(appBox.name(), 'Map')
    })
})
