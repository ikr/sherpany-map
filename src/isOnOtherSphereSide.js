import {geoDistance} from 'd3-geo'

export default function (origin, target) {
    return geoDistance(origin, target) > (Math.PI / 2)
}
