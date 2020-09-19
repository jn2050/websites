import React, { Component } from 'react'
import SVGDefs from '../assets/svg'
import './Icon.css'


class Icon extends Component {

    onClick = (e) => {
        if(this.props.onClick)
            this.props.onClick(e)
    }

    render() {
        let css = {
            width: this.props.size || 16,
            fill: this.props.color || 0
        }
        const cls = `Icon ${this.props.icon} ${this.props.cls ? this.props.cls : ""}`
        return(
            <span className={cls} style={css} onClick={this.props.onClick} >
                <SVGDefs icon={this.props.icon} fill={this.props.fill}></SVGDefs>
            </span>
        )
    }
}

export default Icon