import React, { Component } from 'react'
import './Tag.css'


class Tag extends Component {

    onClick = (e) => this.props.onClick ? this.props.onClick(e) : null

    render() {
        let css = {
            background: this.props.background ? this.props.background : "transparent",
            cursor: this.props.onClick ? "pointer" : "auto",
        }
        const cls = `Tag`
        return <span className={cls} style={css} onClick={this.props.onClick} >{this.props.text} </span>
    }
}

export default Tag