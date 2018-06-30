import React from 'react'
import PropTypes from 'prop-types'
import ContactCard from './ContactCard'
import vCard from './vCard'

function vCardData (cards) {
    return (
        'data:text/plain;charset=utf-8,' +
            encodeURIComponent(cards.map(c => vCard(c.person)).join(''))
    )
}

function vCardDiv (cards) {
    if (cards.length === 0) return null

    return (
        <div className='vCard'>
            <a href={vCardData(cards)} download='contacts.vcf'>
                Download as a vCard file
            </a>
        </div>
    )
}

export default function ContactCards (props) {
    return (
        <div className='cards'>
            {props.cards.map((c, i) => (
                <ContactCard key={i} {...c}/>
            ))}
            {vCardDiv(props.cards)}
        </div>
    )
}

ContactCards.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        person: PropTypes.object.isRequired,
        distanceKm: PropTypes.number
    })).isRequired
}
