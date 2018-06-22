import React from 'react'
import ReactDOM from 'react-dom'
import People from 'People'
import Map from './Map'
import personMapMarker from './personMapMarker'

ReactDOM.render(
    (<Map markers={People.map(personMapMarker)}/>),
    global.document.getElementById('root')
)
