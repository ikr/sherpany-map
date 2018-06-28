import React from 'react'
import PropTypes from 'prop-types'
import Map from './Map'
import personMapMarker from './personMapMarker'

export default class App extends React.Component {
    constructor (props) {
        super(props)
        this.state = {pinCoordinates: null, selectedMarkerIds: []}
        this.handleCoordinatesClick = this.handleCoordinatesClick.bind(this)
        this.handleMarkerClick = this.handleMarkerClick.bind(this)
    }

    render () {
        return <Map {...this.mapProps()}/>
    }

    mapProps () {
        return {
            markers: this.mapMarkers(),
            selectedMarkerIds: this.state.selectedMarkerIds,
            pinCoordinates: this.state.pinCoordinates,
            lineCoordinates: [],
            onMarkerClick: this.handleMarkerClick,
            onCoordinatesClick: this.handleCoordinatesClick
        }
    }

    mapMarkers () {
        return this.people().map(personMapMarker)
    }

    people () {
        return Object.keys(this.props.peopleById).map(id => this.props.peopleById[id])
    }

    handleCoordinatesClick (pinCoordinates, callback) {
        this.setState({pinCoordinates, selectedMarkerIds: []}, callback)
    }

    handleMarkerClick (markerId, callback) {
        this.setState({selectedMarkerIds: [markerId], pinCoordinates: null}, callback)
    }
}

App.propTypes = {
    peopleById: PropTypes.object.isRequired
}
