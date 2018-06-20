import React from 'react'
import ReactDOM from 'react-dom'
import People from 'People'

ReactDOM.render(
    (<h1>Well, hello, {People[0].name.first}!</h1>),
    global.document.getElementById('root')
)
