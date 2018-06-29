function capitalize (s) {
    return s ? s[0].toUpperCase() + s.substr(1) : ''
}

export default function (parts) {
    return parts.map(capitalize).join(' ')
}
