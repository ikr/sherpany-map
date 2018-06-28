import React from 'react'
import ReactDOM from 'react-dom'
import People from 'People'
import App from './App'
import byId from './byId'

ReactDOM.render(
    <App peopleById={byId(People)}/>,
    global.document.getElementById('root')
)
