import React, { useEffect } from 'react'
import ReactDom from 'react-dom';
import { useName,  usePluginContext } from '@noplugin/core'

const App = () => {
    return <>App View</>
}


const createView = () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    ReactDom.render(<App />, div)
}

export default function view(){
    const pluginContexty =  usePluginContext()
    createView()
}