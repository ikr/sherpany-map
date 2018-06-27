import React from 'react'
import PropTypes from 'prop-types'
import Map from './Map'
import identifyAll from './identifyAll'
import personMapMarker from './personMapMarker'

export default class App extends React.Component {
    render () {
        return <Map {...this.mapProps()}/>
    }

    mapProps () {
        return {
            markers: this.mapMarkers(),
            selectedMarkerIds: [],
            lineCoordinates: [],
            onMarkerClick: x => 0,
            onCoordinatesClick: x => 0
        }
    }

    mapMarkers () {
        return identifyAll(1, this.props.people).map(personMapMarker)
    }
}

App.propTypes = {
    people: PropTypes.arrayOf(PropTypes.object).isRequired
}
