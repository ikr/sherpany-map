import joinCapitalized from './joinCapitalized'

function toFloat (x) {
    return parseFloat(x)
}

export default function ({
    id,
    name: {title, first, last},
    location: {coordinates: {latitude, longitude}}
}) {
    return {
        id,
        name: joinCapitalized([first, last]),
        coordinates: [longitude, latitude].map(toFloat)
    }
}
