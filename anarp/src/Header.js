import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { withRouter } from "react-router"
import { Link } from 'react-router-dom'
import Section from './components/Section'
// import Burger from './Burger'
import Select from './components/Select'
import './Header.css'


const menuItem = (props, i) => {
    let cls = (props.selected ? ' Selected' : '')
    cls += (props.status==='inactive' ? ' Inactive' : '')
    return props.item.status !== 'inactive'
        ? <Link className={cls} onClick={i=>props.onSelect(i)} to={props.item.path}>{props.item.text}</Link>
        : <li className={cls}>{props.item.text}</li>
}


const profileOptions = [
    {text: 'Logout', to: '/login/logout'},
    {text: 'Change password',  to: '/login/change_password'}
]

const profileMenuItem = (props, i) => {
    return <Link to={props.to}>{props.label}</Link>
}


class Header1 extends Component {

    constructor(props) {
        super(props)
        this.state = {
            burgerOpen: false,
        }
    }

    componentDidUpdate = (prevProps, prevState) => prevProps.menu===this.props.menu ? this.updateMenuWithLocationPath() : null

    updateMenuWithLocationPath = () => {
        if(!this.props.menu) return
        let menuItem = this.props.menu.find(e=>e.path===this.props.location.pathname)
        const sel = menuItem!=undefined ? menuItem.id : 0
        if(this.refs.mainMenu)
            this.refs.mainMenu.setSelect(sel)
    }

    openBurger = (n) => this.setState({burgerOpen: true})

    render() {
        return(
            <Section Header>
                <Section Page>
                    <a href="/"><img className="Navlogo" src={this.props.logo}/></a>
                    {this.props.title && <h1 className="Navtitle">{this.props.title}</h1>}
                    {this.props.menu &&
                        <div className="Navmenu">
                            <Select ref="mainMenu" menu options={this.props.menu} item={menuItem}/>
                        </div>
                    }
                    <div className="Profile">
                        <Select pulldown icon="profile" menuItem={profileMenuItem} options={profileOptions}/>
                    </div>
                </Section>
            </Section>
        )
    }
}


const Header = withRouter(Header1)
export default Header