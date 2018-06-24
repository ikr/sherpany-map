import React from 'react'
import PropTypes from 'prop-types'
import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
    Markers,
    Marker
} from 'react-simple-maps'

function generateGeographies (geographies, projection) {
    return geographies.map((geography, i) => geography.id !== 'ATA' && (
        <Geography
            key={i}
            geography={geography}
            projection={projection}
            style={{
                default: {
                    fill: '#ECEFF1',
                    stroke: '#607D8B',
                    strokeWidth: 0.75,
                    outline: 'none'
                },
                hover: {
                    fill: '#607D8B',
                    stroke: '#607D8B',
                    strokeWidth: 0.75,
                    outline: 'none',
                    cursor: 'pointer'
                },
                pressed: {
                    fill: '#FF5722',
                    stroke: '#607D8B',
                    strokeWidth: 0.75,
                    outline: 'none'
                }
            }} />
    ))
}

function generateMarkers (markers) {
    return markers.map((marker, i) => (
        <Marker
            key={i}
            marker={marker}
            style={{
                default: { fill: marker.selected ? 'yellow' : '#FF5722' },
                hover: { fill: '#FFFFFF', cursor: 'pointer' },
                pressed: { fill: '#FF5722' }
            }}>
            <circle
                cx={0}
                cy={0}
                r={10}
                style={{stroke: '#FF5722', strokeWidth: 3, opacity: 0.9}}/>
            <text
                textAnchor="middle"
                y={marker.markerOffset}
                style={{
                    fontFamily: 'sans-serif',
                    fontSize: '12px',
                    fill: 'black'
                }}>
                {marker.name}
            </text>
        </Marker>
    ))
}

export default function Map (props) {
    const divProps = {
        style: {
            width: '100%',
            maxWidth: 980,
            margin: '0 auto'
        }
    }

    return (
        <div {...divProps}>
            <ComposableMap
                projectionConfig={{scale: 205, rotation: [-11, 0, 0]}}
                width={980}
                height={551}
                style={{width: '100%', height: 'auto'}}>
                <ZoomableGroup center={[0, 20]} disablePanning>
                    <Geographies geography='world-110m.json'>
                        {generateGeographies}
                    </Geographies>
                    <Markers>
                        {generateMarkers(props.markers)}
                    </Markers>
                </ZoomableGroup>
            </ComposableMap>
        </div>
    )
}

Map.propTypes = {
    markers: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        coordinates: PropTypes.arrayOf(PropTypes.number),
        selected: PropTypes.bool.isRequired
    })).isRequired
}
