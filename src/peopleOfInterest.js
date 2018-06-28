import distanceKm from './distanceKm'
import isOnOtherSphereSide from './isOnOtherSphereSide'

export default function (originCoordinates, people) {
    let nearestId = -1
    let nearestDistanceKm = Number.MAX_VALUE
    let otherSideNearestId = -1
    let otherSideNearestDistanceKm = Number.MAX_VALUE
    let farthestId = -1
    let farthestDistanceKm = 0

    people.forEach(({id, location: {coordinates: {latitude, longitude}}}) => {
        const targetCoordinates = [longitude, latitude]
        const km = distanceKm(originCoordinates, targetCoordinates)

        if (km < nearestDistanceKm) {
            nearestId = id
            nearestDistanceKm = km
        }

        if (
            isOnOtherSphereSide(originCoordinates, targetCoordinates) &&
            km < otherSideNearestDistanceKm
        ) {
            otherSideNearestId = id
            otherSideNearestDistanceKm = km
        }

        if (km > farthestDistanceKm) {
            farthestId = id
            farthestDistanceKm = km
        }
    })

    return {nearestId, otherSideNearestId, farthestId}
}
