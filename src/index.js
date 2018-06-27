import React from 'react'
import ReactDOM from 'react-dom'
import People from 'People'
import App from './App'

ReactDOM.render(
    <App people={People}/>,
    global.document.getElementById('root')
)
