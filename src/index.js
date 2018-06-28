import React from 'react'
import ReactDOM from 'react-dom'
import People from 'People'
import App from './App'
import identifyAll from './identifyAll'
import byId from './byId'

ReactDOM.render(
    <App peopleById={byId(identifyAll(1, People))}/>,
    global.document.getElementById('root')
)
