import React from 'react'
import PropTypes from 'prop-types'
import {Marker} from 'react-simple-maps'

export default function Pin ({coordinates}) {
    return (
        <Marker
            marker={{coordinates}}
            style={{
                default: {stroke: '#455A64'},
                hover: {stroke: '#FF5722'},
                pressed: {stroke: '#FF5722'}
            }}>
            <g transform='translate(-12, -24)'>
                <path
                    fill='none'
                    strokeWidth={2}
                    strokeLinecap='square'
                    strokeMiterlimit={10}
                    strokeLinejoin='miter'
                    d='M20,9c0,4.9-8,13-8,13S4,13.9,4,9c0-5.1,4.1-8,8-8S20,3.9,20,9z'/>
                <circle
                    fill='none'
                    strokeWidth='2'
                    strokeLinecap='square'
                    strokeMiterlimit='10'
                    strokeLinejoin='miter'
                    cx='12'
                    cy='9'
                    r='3'/>
            </g>
        </Marker>
    )
}

Pin.propTypes = {
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired
}
