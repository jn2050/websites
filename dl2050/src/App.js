import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css'
import Section from './components/Section'
import Webpage from './components/Webpage'
import Header from './Header'
import Footer from './Footer'
import { request } from './js/web'
import { url } from './js/util'
import { MODE, AUTH_ON, MENU_PUBLIC, MENU_PRIVATE, MENU_PULLDOWN } from './Config'
import CONTENT from './content/content.json'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      is_auth: false,
      online: navigator.onLine,
      loading: true
    }
    window.addEventListener("dragover", e=>e.preventDefault(), false)
    window.addEventListener("drop", e=>e.preventDefault(), false)
    window.addEventListener('online',  _ => this.setState({online:navigator.onLine}))
    window.addEventListener('offline', _ => this.setState({online:navigator.onLine}))
  }

  componentDidMount() {
    //const url = new URL(window.location.href)
    //if(localStorage.jwt_token && url.pathname!=='/') window.location.href = '/'
    //document.documentElement.style.setProperty('--color-B1', '#00FF00');
    if(!localStorage.jwt_token) {
      this.setState({is_auth: false, loading:false})
      return
    }
    request('/api/auth/is_auth', 'GET', {},
      res => {
        const is_auth = res.result.is_auth
        this.setState({is_auth: is_auth})
        if(is_auth)
          request('/api/get_meta', 'POST', {},
            res=>this.setState({meta:res.result.meta, loading:false}),
            error=>this.setState({loading:false}))
      },
      (error) => {
          console.log('Not auth')
          this.setState({is_auth: false})
          console.log('REMOVE')
          localStorage.removeItem('jwt_token')
      })
  }

  onAuth = (b)=>{this.setState({is_auth: b})}

  render() {
    const h = CONTENT.webpages[0].header
    return (
      <Section App Webpage>
      <Router>
        <Header {...h}/>
        <Webpage {...CONTENT}/>
      </Router>
      </Section>
    )
  }
}

export default App


      // <img className="SectionImage" src={url("dl2050-intro.jpg")}/>
        {/* <Header/> */}
