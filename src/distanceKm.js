import {geoDistance} from 'd3-geo'

const MEAN_EARTH_RADIUS_KM = 6371

export default function (coordinatesA, coordinatesB) {
    return geoDistance(coordinatesA, coordinatesB) * MEAN_EARTH_RADIUS_KM
}
