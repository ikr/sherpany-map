import React from 'react'
import PropTypes from 'prop-types'
import Map from './Map'
import identifyAll from './identifyAll'
import personMapMarker from './personMapMarker'

export default class App extends React.Component {
    constructor (props) {
        super(props)
        this.state = {pinCoordinates: null}
        this.handleCoordinatesClick = this.handleCoordinatesClick.bind(this)
    }

    render () {
        return <Map {...this.mapProps()}/>
    }

    mapProps () {
        return {
            markers: this.mapMarkers(),
            selectedMarkerIds: [],
            pinCoordinates: this.state.pinCoordinates,
            lineCoordinates: [],
            onMarkerClick: x => 0,
            onCoordinatesClick: this.handleCoordinatesClick
        }
    }

    mapMarkers () {
        return identifyAll(1, this.props.people).map(personMapMarker)
    }

    handleCoordinatesClick (pinCoordinates, callback) {
        this.setState({pinCoordinates}, callback)
    }
}

App.propTypes = {
    people: PropTypes.arrayOf(PropTypes.object).isRequired
}
