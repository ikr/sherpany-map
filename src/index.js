import React from 'react'
import ReactDOM from 'react-dom'
import People from 'People'
import App from './App'
import identifyAll from './identifyAll'
import byId from './byId'
import peopleOfInterest from './peopleOfInterest'

ReactDOM.render(
    <App
        peopleById={byId(identifyAll(1, People))}
        peopleOfInterest={peopleOfInterest}/>,
    global.document.getElementById('root')
)
