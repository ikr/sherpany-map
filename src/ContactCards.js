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

export default function ContactCards (props) {
    return (
        <div className='cards'>
            {props.cards.map(({title, person}, i) => (
                <ContactCard key={i} {...{title, person}}/>
            ))}

            <div className='vCard'>
                <a href={vCardData(props.cards)} download='contacts.vcf'>
                    Download as a vCard file
                </a>
            </div>
        </div>
    )
}

ContactCards.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        person: PropTypes.object.isRequired
    })).isRequired
}
