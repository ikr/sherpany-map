function capitalize (s) {
    return s[0].toUpperCase() + s.substr(1)
}

function toFloat (x) {
    return parseFloat(x)
}

export default function ({
    name: {title, first, last},
    location: {coordinates: {latitude, longitude}}
}) {
    return {
        name: [first, last].map(capitalize).join(' '),
        coordinates: [longitude, latitude].map(toFloat)
    }
}
