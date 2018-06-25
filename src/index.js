import React from 'react'
import ReactDOM from 'react-dom'
import People from 'People'
import identifyAll from './identifyAll'
import Map from './Map'
import personMapMarker from './personMapMarker'

const identifiedPeople = identifyAll(1, People)

const mapProps = {
    markers: identifiedPeople.map(personMapMarker),
    selectedMarkerIds: [],
    onMarkerClick: console.log,
    pinCoordinates: [91, 1]
}

ReactDOM.render(
    <Map {...mapProps}/>,
    global.document.getElementById('root')
)
