import React, { Component } from 'react'
import './App.css'

import data from './content/data.json'
import PDF from './content/Ficha.pdf'
import img_main from './images/greenland.jpeg'
import img_p2020 from './images/p2020.jpg'

const imgs = {}
imgs['cloudware'] = require('./images/cloudware.png')
imgs['petapilot'] = require('./images/petapilot.png')
imgs['kuantokusta'] = require('./images/kuantokusta.png')
imgs['nanopower'] = require('./images/nanopower.png')


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Main />
        <Portfolio />
        <Footer /> 
      </div>
    )
  }
}

export default App


const Header = () => {
  return (
    <div className="Header">
      <div className="Logo">
        <p className="Digital">Digital_logic</p>
      </div>
      <P2020 />
    </div>
  )
}


const Main = () => {
  return (
    <div className="Main">
      <img src={img_main} alt="greenland" />
      <h1>{data.title}</h1>
      <h2>{data.subtitle1}</h2>
      <h2>{data.subtitle2}</h2>
    </div>
  )
}


const Footer = () => {
  return (
    <div className="Footer">
      <p className="Info">info@dlogic.io</p>
      <p>Centro Empresarial Lionesa, Pavilhão C27, Rua da Lionesa</p>
      <p>4465-671 Leça do Balio, Porto, Portugal</p>
      <p>© Digital Logic 2019</p>
    </div>
  )
}


const Card = (props) => {
  const img = imgs[props.item.logo]
  return (
    <div className="Card">
      <div className="img-container">
        <img src={img}/>
      </div>
      <div className="text-container">
        <p className="">{props.item.desc}</p>
      </div>
    </div>
  )
}


const Portfolio = () => {
  return (
    <div className="Portfolio">
      <h1>Portfolio</h1>
      <div className="Cards">
        {data.portfolio.map(item => <Card item={item} />)}
      </div>
    </div>
  )
}


const Menu = () => {
  return (
    <div className="Menu">
      <a href="">Home</a>
      <a href="">About</a>
      <a href="">Porfolio</a>
    </div>
  )
}


const P2020 = () => {
  return (
    <div className="P2020">
      <a className="Link" target="_blank" href={PDF}>
        <img src={img_p2020} alt="logo" />
        <p>Projetos Cofinanciados pela UE</p>
      </a>
    </div>
  )
}
