import React, { Component } from 'react'
import './Logo.css'
import LOGO from '../assets/Logo.png'


class Logo extends Component {
    render() {
        const logo = this.props.logo || LOGO
        return <div className="Logo"><img src={logo}/></div>
    }
}

export default Logo