import React from 'react'
import ReactDom from 'react-dom';

import { create } from '@noplugin/core'



create({
    plugins: []
})

// function App(){
//     return <>1232332</>
// }

const div = document.createElement('div')
document.body.appendChild(div)

// ReactDom.render(<App /> , div)