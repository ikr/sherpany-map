import joinCapitalized from './joinCapitalized'

function toFloat (x) {
    return parseFloat(x)
}

export default function ({
    name: {title, first, last},
    location: {coordinates: {latitude, longitude}}
}) {
    return {
        name: joinCapitalized([first, last]),
        coordinates: [longitude, latitude].map(toFloat)
    }
}
