import React, { Component } from 'react'
import Icon from './Icon'
import './Button.css'


class Button extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: this.props.selected,
            set: false,
        }
        this.icon = this.props.icon || null
        this.type = null
        if('text' in this.props)
            this.type = 'Text'
        else
            if(this.icon && !this.text)
                this.type = ` IconOnly`
        this.size = this.props.size || 'M'
        this.iconsize = this.props.iconsize || 20
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.selected === prevProps.selected) return
        this.setState({selected: this.props.selected})
    }

    setSelect = (v) => this.setState({selected: v})

    onClick = () => {
        //this.setState({selected: !this.state.selected})
        this.setState({selected: true})
        if(this.props.onClick) this.props.onClick(this)
    }

    render() {
        let cls = `Button ${this.type}`
        if(this.props.cls) cls += ` ${this.props.cls}`
        if(this.props.size) cls += ` ${this.props.size}`
        if(this.state.selected) cls += ` Selected`
        return(
            <button className={cls} onClick={this.onClick}>
                {this.icon && <Icon icon={this.icon} size={this.iconsize} />}
                {this.props.text && <span className="ButtonText">{this.props.text}</span>}
            </button>
        )
    }
}

export default Button
