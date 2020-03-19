import React, { Component } from 'react'
import Icon from './Icon'
import './Button.css'


class Button extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: this.props.selected,
        }
        this.size = this.props.text ? (this.props.size || 'M') : 'S'
    }

    setSelect = (v) => this.setState({selected: v})

    onClick = () => {
        this.setState({selected: true})
        if(this.props.onClick) this.props.onClick(this.props.id)
    }

    render() {
        let cls = `Button`
        if(this.props.cls) cls += ` ${this.props.cls}`
        if(this.size) cls += ` ${this.size}`
        if(this.props.select && this.state.selected) cls += ` Selected`
        return(
            <button className={cls} onClick={this.onClick}>
                {this.props.icon && <Icon icon={this.props.icon} size={10} />}
                {this.props.text && <span>{this.props.text}</span>}
            </button>
        )
    }
}

export default Button
