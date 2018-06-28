import {geoDistance} from 'd3-geo'

export default function (originCoordinates, targetCoordinates) {
    return geoDistance(originCoordinates, targetCoordinates) > (Math.PI / 2)
}
