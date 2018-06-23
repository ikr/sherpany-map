function capitalize (s) {
    return s[0].toUpperCase() + s.substr(1)
}

export default function ({
    name: {title, first, last},
    location: {coordinates: {latitude, longitude}}
}) {
    return {
        name: [first, last].map(capitalize).join(' '),
        coordinates: [parseFloat(latitude), parseFloat(longitude)]
    }
}
