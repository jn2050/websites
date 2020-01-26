import React, { Component } from 'react'
import Select from './Select'
import Button from './Button'
import './Burger.css'


class Burger extends Component {

    constructor(props) {
        super(props)
        this.container = React.createRef()
        this.state = {
            open: false,
            selected: 0,
        }
    }

    componentDidMount = () => document.addEventListener("mousedown", this.clickOutside)
    componentWillUnmount = () => document.removeEventListener("mousedown", this.clickOutside)
    clickOutside = event => this.container.current && !this.container.current.contains(event.target) ? this.setState({open: false}) : null
    toggle = () => this.setState({open:!this.state.open})

    onSelect = (n) => {
        this.setState({open: false})
        if(this.props.onSelect) this.props.onSelect(n)
    }

    render() {
        return (
          <div className="Burger" ref={this.container}>
            <Button iconsize={24} icon="burger" onClick={this.toggle}/>
            {this.state.open &&
                <div className="BurgerBody ">
                    <Select menu vertical underline left options={this.props.options} menuItem={this.props.menuItem}
                            onSelect={this.onSelect}/>
                </div>
            }
          </div>
        )
    }
}

export default Burger
