import React from 'react'
import Map from './Map'

export default class App extends React.Component {
    render () {
        return <Map {...this.mapProps()}/>
    }

    mapProps () {
        return {
            markers: [],
            selectedMarkerIds: [],
            lineCoordinates: [],
            onMarkerClick: x => 0,
            onCoordinatesClick: x => 0
        }
    }
}
