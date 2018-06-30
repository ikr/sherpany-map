import capitalize from './capitalize'
import joinCapitalized from './joinCapitalized'

export default function ({
    name: {title, first, last},
    location: {street, city, state, postcode},
    email,
    cell,
    picture
}) {
    return `BEGIN:VCARD
VERSION:4.0
N:${capitalize(last)};${capitalize(first)};;${capitalize(title)};
FN:${joinCapitalized([title, first, last])}
PHOTO;MEDIATYPE=image/jpeg:${picture.large}
TEL;TYPE=cell,voice;VALUE=uri:tel:${cell}
ADR;HOME:;;${capitalize(street)};${capitalize(city)};;${postcode};${capitalize(state)}
EMAIL:${email}
`
}
