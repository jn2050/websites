import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { withRouter } from "react-router"
import { Link } from 'react-router-dom'
import Burger from './Burger'
import Button from './Button'
import Logo from './Logo'
import logo from '../assets/logo.png'
import Select from './Select'
import '../App.css'
import './Header.css'


const menuItem = (props, i) => {
    let cls = 'MenuItem'
    cls += (props.selected ? ' Selected' : '')
    cls += (props.status==='inactive' ? ' Inactive' : '')
    return props.status !== 'inactive'
        ? <Link className={cls} onClick={i=>props.onSelect(i)} to={props.link}>{props.label}</Link>
        : <li className={cls}>{props.label}</li>
}


const profileOptions = [
    {label: 'Logout', to: '/login/logout'},
    {label: 'Change password',  to: '/login/change_password'}
]

const profileMenuItem = (props, i) => {
    return <Link to={props.to}>{props.label}</Link>
}


class Header1 extends Component {

    constructor(props) {
        super(props)
        this.state = {
            burgerOpen: false,
            w: null,
        }
    }

    componentDidMount() {
        this.setState({w: ReactDOM.findDOMNode(this).parentNode.clientWidth})
        if(!this.props.menu) return
        let menuItem = this.props.menu.find(e=>e.link===this.props.location.pathname)
        const sel = menuItem!=undefined ? menuItem.id : 0
        this.refs.mainMenu.setSelect(sel)
    }

    openBurger = (n) => this.setState({burgerOpen: true})

    render() {
        return(
            <div className="Header">
                <div className="Logo">
                    <Logo img={logo}/>
                </div>
                {this.props.menu &&
                    <div className="HeaderMenu">
                         <Select ref="mainMenu" menu underline options={this.props.menu} menuItem={menuItem}/>
                    </div>
                }
                {this.props.menu && <Burger options={this.props.menu} menuItem={menuItem}/>}
            </div>
        )
    }
}


const Header = withRouter(Header1)
export default Header