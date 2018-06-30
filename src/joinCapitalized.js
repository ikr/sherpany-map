import capitalize from './capitalize'

export default function (parts) {
    return parts.map(capitalize).join(' ')
}
