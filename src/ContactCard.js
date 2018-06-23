import React from 'react'
import PropTypes from 'prop-types'
import joinCapitalized from './joinCapitalized'

function personName ({name: {title, first, last}}) {
    return joinCapitalized([title, first, last])
}

function zipAndCity ({location: {postcode, city}}) {
    return joinCapitalized([String(postcode), city])
}

export default function ContactCard (props) {
    return (
        <article>
            <img
                src={props.person.picture.thumbnail}
                alt={personName(props.person)}
                title='Picture of the person'/>
            <span className='name'>{personName(props.person)}</span>
            <ul>
                <li>
                    <a href={`mailto:${props.person.email}`}>{props.person.email}</a>
                </li>
                <li>{props.person.cell}</li>
                <li>{joinCapitalized(props.person.location.street.split(' '))}</li>
                <li>{zipAndCity(props.person)}</li>
            </ul>
        </article>
    )
}

ContactCard.propTypes = {
    person: PropTypes.shape({
        name: PropTypes.shape({
            title: PropTypes.string.isRequired,
            first: PropTypes.string.isRequired,
            last: PropTypes.string.isRequired
        }).isRequired,
        location: PropTypes.shape({
            street: PropTypes.string.isRequired
        }).isRequired,
        email: PropTypes.string.isRequired,
        cell: PropTypes.string.isRequired,
        picture: PropTypes.shape({
            thumbnail: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
}
