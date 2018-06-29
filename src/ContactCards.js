import React from 'react'
import PropTypes from 'prop-types'
import ContactCard from './ContactCard'

export default function ContactCards (props) {
    return (
        <div className='cards'>
            {this.props.cards.map(({title, person}, i) => (
                <ContactCard key={i} {...{title, person}}/>
            ))}
        </div>
    )
}

ContactCards.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        person: PropTypes.object.isRequired
    }))
}
