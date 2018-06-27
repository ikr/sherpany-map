import React from 'react'
import PropTypes from 'prop-types'
import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
    Lines,
    Line,
    Markers,
    Marker
} from 'react-simple-maps'
import {geoPath} from 'd3-geo'

const MAP_MAX_WIDTH = 980
const MAP_MAX_HEIGHT = 551

function onGeographyClick (projection, onCoordinatesClick) {
    const gp = geoPath().projection(projection)

    return function (geo, evt) {
        const dim = evt.target.getBoundingClientRect()
        const cx = evt.clientX - dim.left
        const cy = evt.clientY - dim.top
        const [orgX, orgY] = gp.bounds(geo)[0]

        onCoordinatesClick(projection.invert([orgX + cx, orgY + cy]))
    }
}

function generateGeographies (onCoordinatesClick) {
    return (geographies, projection) => geographies.map(
        (geography, i) => geography.id !== 'ATA' && (
            <Geography
                key={i}
                geography={geography}
                projection={projection}
                onClick={onGeographyClick(projection, onCoordinatesClick)}
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
                }}/>
        )
    )
}

function generateLines ({lineCoordinates}) {
    const style = {stroke: 'gray', strokeWidth: 2}

    return lineCoordinates.map((coordinates, i) => (
        <Line
            key={i}
            line={{coordinates}}
            style={{default: style, hover: style, pressed: style}}/>
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
                default: {fill: isSelected(marker.id) ? 'yellow' : '#FF5722'},
                hover: {fill: isSelected(marker.id) ? 'yellow' : '#FFFFFF', cursor: 'pointer'},
                pressed: {fill: '#FF5722'}
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

function pinBox ({pinCoordinates}) {
    if (pinCoordinates) {
        return [
            <Marker
                key='pin'
                marker={{coordinates: pinCoordinates}}
                style={{
                    default: {stroke: 'red'},
                    hover: {stroke: 'red'},
                    pressed: {stroke: 'red'}
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
                        strokeWidth={2}
                        strokeLinecap='square'
                        strokeMiterlimit={10}
                        strokeLinejoin='miter'
                        cx={12}
                        cy={9}
                        r={3}/>
                </g>
            </Marker>
        ]
    }

    return []
}

export default class Map extends React.Component {
    constructor (props) {
        super(props)
        this.state = {scale: 1.0}
        this.handleResize = this.handleResize.bind(this)
    }

    componentDidMount () {
        if (global.window) {
            global.window.addEventListener('resize', this.handleResize)
        }
    }

    componentWillUnmount () {
        if (global.window) {
            global.window.removeEventListener('resize', this.handleResize)
        }
    }

    render () {
        const divProps = {
            style: {
                width: '100%',
                maxWidth: MAP_MAX_WIDTH,
                margin: '0 auto'
            }
        }

        return (
            <div {...divProps}>
                <ComposableMap
                    projectionConfig={{scale: 205, rotation: [-11, 0, 0]}}
                    width={MAP_MAX_WIDTH}
                    height={MAP_MAX_HEIGHT}
                    style={{width: '100%', height: 'auto'}}>
                    <ZoomableGroup center={[0, 20]} disablePanning>
                        <Geographies geography='world-110m.json'>
                            {generateGeographies(this.props.onCoordinatesClick)}
                        </Geographies>
                        <Lines>
                            {generateLines(this.props)}
                        </Lines>
                        <Markers>
                            {generateMarkers(this.props).concat(pinBox(this.props))}
                        </Markers>
                    </ZoomableGroup>
                </ComposableMap>
            </div>
        )
    }

    handleResize () {
        const svg = global.document.querySelector('svg')
        const {width} = svg.getBoundingClientRect()
        this.setState({scale: width / MAP_MAX_WIDTH})
        console.log(width / MAP_MAX_WIDTH)
    }
}

Map.propTypes = {
    lineCoordinates: PropTypes.arrayOf(PropTypes.shape({
        start: PropTypes.arrayOf(PropTypes.number).isRequired,
        end: PropTypes.arrayOf(PropTypes.number).isRequired
    })).isRequired,
    markers: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        coordinates: PropTypes.arrayOf(PropTypes.number).isRequired
    })).isRequired,
    selectedMarkerIds: PropTypes.arrayOf(PropTypes.number).isRequired,
    onMarkerClick: PropTypes.func.isRequired,
    onCoordinatesClick: PropTypes.func.isRequired,
    pinCoordinates: PropTypes.arrayOf(PropTypes.number)
}
