import React from 'react'
import ReactDOM from 'react-dom'
import People from 'People'
import identifyAll from './identifyAll'
import Map from './Map'
import personMapMarker from './personMapMarker'

const identifiedPeople = identifyAll(1, People)
const markers = identifiedPeople.map(personMapMarker)

const mapProps = {
    markers,
    selectedMarkerIds: [],
    onMarkerClick: console.log,
    pinCoordinates: [61, 48],
    lineCoordinates: [
        {start: [61, 48], end: markers[0].coordinates},
        {start: [61, 48], end: markers[1].coordinates},
        {start: [61, 48], end: markers[2].coordinates}
    ]
}

ReactDOM.render(
    <Map {...mapProps}/>,
    global.document.getElementById('root')
)
