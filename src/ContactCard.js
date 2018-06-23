import React from 'react'
import PropTypes from 'prop-types'

export default function ContactCard (props) {
    return (
        <article>
            <img src={props.person.picture.thumbnail}/>
        </article>
    )
}

ContactCard.propTypes = {
    person: PropTypes.shape({
        picture: PropTypes.shape({
            thumbnail: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
}
