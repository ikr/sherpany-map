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
import Pin from './Pin'

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

function generateMarkers ({markers, selectedMarkerIds, onMarkerClick}) {
    function isSelected (markerId) {
        return selectedMarkerIds.indexOf(markerId) >= 0
    }

    return markers.map((marker, i) => (
        <Marker
            key={i}
            marker={marker}
            style={{
                default: { fill: isSelected(marker.id) ? 'yellow' : '#FF5722' },
                hover: { fill: '#FFFFFF', cursor: 'pointer' },
                pressed: { fill: '#FF5722' }
            }}
            onClick={() => { onMarkerClick(marker.id) }}>
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

function pinElement ({pinCoordinates}) {
    if (pinCoordinates) {
        return [
            <Pin key='pin' coordinates={pinCoordinates}/>
        ]
    }

    return []
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
                        {generateMarkers(props)}
                        {pinElement(props)}
                    </Markers>
                </ZoomableGroup>
            </ComposableMap>
        </div>
    )
}

Map.propTypes = {
    markers: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        coordinates: PropTypes.arrayOf(PropTypes.number).isRequired
    })).isRequired,
    selectedMarkerIds: PropTypes.arrayOf(PropTypes.number).isRequired,
    onMarkerClick: PropTypes.func.isRequired,
    pinCoordinates: PropTypes.arrayOf(PropTypes.number)
}
