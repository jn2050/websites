import React, { Component } from 'react'
import Icon from './Icon'
import './Button.css'

const Cap = (e) => e.replace(/^\w/, c=>c.toUpperCase())

const TYPES = ['Action', 'Inactive', 'Danger', 'Close', 'Clear', 'S', 'L', 'S', 'Row', 'Round', 'Link']


class Button extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: this.props.selected,
            type: null,
            text: null,
            cls: null,
            inactive: false
        }
    }

    componentDidMount(prevProps, prevState) {
        this.parse_props()
    }

    componentDidUpdate(prevProps, prevState) {
        if(JSON.stringify(this.props)===JSON.stringify(prevProps)) return
        this.parse_props()
    }

    parse_props = () => {
        let type = this.props.type ? Cap(this.props.type) : null
        let selected = this.props.selected
        let cls = 'Button'
        Object.keys(this.props).forEach(e=>TYPES.indexOf(Cap(e))!==-1 ? cls+=` ${Cap(e)}`:null)
        if(type) cls+= ` ${type}`
        if(this.props.cls) cls+= ` ${this.props.cls}`
        if(selected) cls+= ' Selected'
        let is_cancel = cls.indexOf("Clear")>-1
        let text = this.props.text ? this.props.text : (is_cancel ? 'X' : null)
        let inactive = this.props.inactive
        this.setState({type: type, selected: selected, text: text, cls: cls, inactive:inactive})
    }

    setSelect = (v) => this.setState({selected: v})

    onClick = () => {
        if(this.state.inactive) return
        this.setState({selected: true})
        if(this.props.onClick) this.props.onClick(this.props.id)
    }

    render() {
        return(
            <button ref="button" className={this.state.cls} onClick={this.onClick}>
                {this.state.text && <span className="Text">{this.state.text}</span>}
                {this.props.icon && <Icon cls="Before" icon={this.props.icon} size={10}/>}
            </button>
        )
    }
}

export default Button
