import React, { Component } from 'react'
import { withRouter } from "react-router"
import { Link } from 'react-router-dom'
import Section from './components/Section'
import Logo from './components/Logo'
import Burger from './components/Burger'
import Menu from './components/Menu'
import './Header.css'


class Header1 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            burgerOpen: false,
        }
    }

    componentDidMount = ()=>this.updateMenuWithLocationPath()

    updateMenuWithLocationPath = () => {
        if(!this.props.menu) return
        let n = this.props.menu.findIndex(e=>e.path===this.props.location.pathname)
        if(this.refs.menu) this.refs.menu.setSelect(n!==-1 ? n : 0)
    }

    openBurger = (n) => this.setState({burgerOpen: true})

    render() {
        const onLoginScreen = (new URL(window.location.href)).pathname === '/login'
        const error_msg = (!("online" in this.props) || this.props.online) ? null : "BROWSER OFFLINE"
        const cls = `Header ${error_msg?"HeaderError":""} ${this.props.MaxWidth?"MaxWidth":""}`
        return(
            <Section cls={cls}>
                <a className="LogoContainer" href="/"><Logo/></a>
                {this.props.menu && !error_msg &&
                    <div className="Navmenu">
                        <Menu ref="menu" options={this.props.menu}/>
                    </div>
                }
                <div className="HeaderErrorMsg">{error_msg}</div>
                {this.props.auth_on && !this.props.is_auth && !onLoginScreen &&
                    <div className="HeaderLogin">
                        <Link className="" to="/login">Login</Link>
                    </div>
                }
                {this.props.auth_on && this.props.is_auth && this.props.menu2 &&
                    <div className="Profile">
                        <Menu pulldown icon="profile" options={this.props.menu2}/>
                    </div>
                }
                {this.props.menu && <Burger options={this.props.menu}/>}
            </Section>
        )
    }
}

const Header = withRouter(Header1)
export default Header