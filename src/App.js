import React from 'react'
import PropTypes from 'prop-types'
import Map from './Map'
import personMapMarker from './personMapMarker'

function objectValues (obj) {
    return Object.keys(obj).map(k => obj[k])
}

function personCoordinates ({location: {coordinates: {latitude, longitude}}}) {
    return [parseFloat(longitude), parseFloat(latitude)]
}

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
        const lineCoordinates = (
            this.state.pinCoordinates
                ? objectValues(
                    this.props.peopleOfInterest(this.state.pinCoordinates, this.people())
                ).map(id => ({
                    start: this.state.pinCoordinates,
                    end: personCoordinates(this.props.peopleById[id])
                })) : []
        )

        return {
            markers: this.mapMarkers(),
            selectedMarkerIds: this.state.selectedMarkerIds,
            pinCoordinates: this.state.pinCoordinates,
            lineCoordinates,
            onMarkerClick: this.handleMarkerClick,
            onCoordinatesClick: this.handleCoordinatesClick
        }
    }

    mapMarkers () {
        return this.people().map(personMapMarker)
    }

    handleCoordinatesClick (pinCoordinates, callback) {
        this.setState({
            pinCoordinates,
            selectedMarkerIds: objectValues(
                this.props.peopleOfInterest(pinCoordinates, this.people())
            )
        }, callback)
    }

    handleMarkerClick (markerId, callback) {
        this.setState({selectedMarkerIds: [markerId], pinCoordinates: null}, callback)
    }

    people () {
        return objectValues(this.props.peopleById)
    }
}

App.propTypes = {
    peopleById: PropTypes.object.isRequired,
    peopleOfInterest: PropTypes.func.isRequired
}
