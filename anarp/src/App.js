import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Section from './components/Section'
import Header from './Header'
import Footer from './Footer'
import './App.css'

import Test from './Test'

import logo_anarp from './assets/logos/logo_anarp.png'
import content from './assets/content.json'
import { webpage_anarp, webpage_forum, webpage_cina } from './Website.js'


const Anarp = () => webpage_anarp(content.page1)
const Forum = () => webpage_forum(content.page2)
const Cina = () => webpage_cina(content.page3)

const LOGO = logo_anarp
const TITLE = ""
const MENU = [
  {'id': 0, 'text': 'ANARP', 'path': '/anarp', 'component': Anarp},
  {'id': 1, 'text': 'Fórum', 'path': '/forum', 'component': Forum},
  {'id': 2, 'text': 'Cina', 'path': '/cina', 'component': Cina},
  {'id': 3, 'text': 'Test', 'path': '/test', 'component': Test},
]


class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Section App>
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i&display=swap" rel="stylesheet"/>
        <Router>
          <Header title={TITLE} logo={LOGO} menu={MENU} />
          <Section AppContent>
            <Switch>
              {MENU.map ((e) =><Route path={e.path} component={e.component}/>)}
              <Route path="/" component={MENU[0].component}/>
            </Switch>
          </Section>
          <Footer />
        </Router>
      </Section>
    )
  }

}

export default App
