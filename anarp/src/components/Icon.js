import React, { Component } from 'react'
import SVGDefs from '../assets/svg-defs.js'
import './Icon.css'


class Icon extends Component {
    render() {
        return(
            <span className={`Icon Icon${this.props.size}`}>
                <SVGDefs icon={this.props.icon}></SVGDefs>
            </span>
        )
    }
}

export default Icon
