import React from 'react'
import ReactDOM from 'react-dom'
import People from 'People'
import identifyAll from './identifyAll'
import Map from './Map'
import personMapMarker from './personMapMarker'

const identifiedPeople = identifyAll(1, People)

ReactDOM.render(
    (<Map markers={identifiedPeople.map(personMapMarker)}/>),
    global.document.getElementById('root')
)
