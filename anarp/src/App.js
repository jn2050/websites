import React from 'react'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Header from './components/Header'
import './App.css'

import logo from './assets/logo.png'
import pdf from './assets/pdf.png'
import p1_img_1 from './assets/p1_img_1.jpeg'
import p2_img_1 from './assets/p2_img_1.jpeg'
import p2_img_2 from './assets/p2_img_2.jpeg'
import p3_img_1 from './assets/p3_img_1.jpeg'

import content from './assets/content.json'


const Menu = [
  {'id': 0, 'label': 'ANARP', 'link': '/anarp'},
  {'id': 1, 'label': 'Fórum', 'link': '/forum'},
  {'id': 2, 'label': 'CINA', 'link': '/cina'}
]


const CARDS = [
  {title: 'Healthcare', img: '', text: 'Diagnosing patients with medical image classification, EEG or EKG, healthcare delivery analysis and prediction.'},
  {title: 'Industry', img: '', text: 'Product quality classification from imagem and production data.'},
  {title: 'Business', img: '', text: 'Sales forecast, price prediction, churn analysis, fraud detection.'},
  {title: 'Finance', img: '', text: 'Loan risk assessments, assests valuation forecast.'},
  {title: 'Insurance', img: '', text: 'Forecasting accident likelyhood, improved risk models, sales channel isights.'},
  {title: 'Content', img: '', text: 'Semantica image, video and text classification, sentiment analysis.'},
]


function App() {
  return (
    <div className="App">
      <Router>
        <Header img={logo} menu={Menu}/>  
          <Switch>
              <Route path="/anarp" component={Anarp}/>,
              <Route path="/forum" component={Forum}/>,
              <Route path="/cina" component={Cina}/>,
              <Route component={Anarp}/>
          </Switch>        
        <Footer/>
        {/* MORADA
        Rua Coronel Almeida Valente 280, 4200-030 Porto, Portugal
        CONTACTOS
        225 504 394
        225 518 678
        ass.anarp1@gmail.com */}
      </Router>
    </div>
  )
}

export default App


const Anarp = () => section(p1_img_1, content.page_1)
const Forum = () => section(p2_img_1, content.page_2)
const Cina = () => section(p3_img_1, content.page_3)


const Footer = () =>
  <div className="Footer">
      <p>ANARP 2019</p>
      <p>Onde estamos</p>
      <p>Rua Professor Agostinho da Silva 34, 4250-017 Porto, Portugal</p>
      <p>228 325 741</p>
      <p>ass.cina@gmail.com</p>
      <p>Facebook</p>
  </div>


const section = (img, props) =>
  <div className="Section Main">
        {img && <img className="MainImage" src={img}/>}
        {props.title && <h1>{props.title}</h1>}
        {props.sections && props.sections.map(e=>
          <div>
            {e.title && <h2>{e.title}</h2>}
            {e.text && <p>{e.text}</p>}
            {e.nav && e.nav.map(e=>nav(e))}
            {e.cards && e.cards.map(e=>card(e))}
            {e.docs && e.docs.map(e=>doc(e))}
          </div>
        )}
  </div>


const card = (props) =>
  <div className="Card">
    {/* <img className="MainImage" src={img}/>
    <h1>{title}</h1> */}
    <p>CARD</p>
  </div>


const nav = (props) =>
  <a className="Nav" href={props.url}>{props.label}
    {/* <img className="MainImage" src={img}/>
    <h1>{title}</h1> */}
  </a>


const doc = (props) =>
<div className="Doc">
  <img src={pdf}/>
  <a>{props}</a>
</div>