import React, { Component } from 'react'
import './App.css'

import data from './data/page1.json'
import logo from './assets/logo.svg'


// Para além disso, para disfarçar a eventual falta de qualidade se a janela do browser estiver muito grande e 
// o vídeo ficar muito esticado, temos também lá um .png que é basicamente um pattern de 2x1 px, para colocar como 
// overlay repeated por cima do video


// <source src={u('video1.mp4')} type="video/mp4"/>
// <source src={u('video1.webm')} type="video/webm"/>


const CARDS = [
  {title: 'Insurance', img: 'ic_insurance.svg', text: 'Predict accident probability, improve risk models, churn analysis and fraud detection.'},
  {title: 'Finance', img: 'ic_finance.svg', text: 'Predict loan payment probability, reduce defaults.'},
  {title: 'Telecom', img: 'ic_content.svg', text: 'Automatic video scene classification through computer vision for Advertisement placement.'},
  {title: 'Accounting software', img: 'ic_business.svg', text: 'Automatic bills classification from document’s photos.'},
  {title: 'Healthcare', img: 'ic_healthcare.svg', text: 'Automating anesthesia by detecting patient loss of consciousness from EEG.'},
  {title: 'Retail', img: 'ic_industry.svg', text: 'Sales forecast per product, store, day and price modeling.'},
]


const URL_IMG = 'http://localhost/images/'
const u = (f) => `${URL_IMG}/${f}`


class Video extends Component {
  constructor(props) {
    super(props)
    this.state = {videoURL: null}
  }

  componentDidMount() {
    const video = document.createElement('video')
    video.src = u(this.props.video)
    video.load()
    video.addEventListener('loadeddata', () => {
      this.setState({videoURL: video.src})
    })
  }

  render() {
    return(
      <div>
        {!this.state.videoURL &&
          <img src={u(this.props.img)} />
        }
        {this.state.videoURL &&
          <video preload="true" autoPlay loop muted>
            <source src={this.state.videoURL} type="video/mp4"/>
          </video>
        }
      </div>
    )
  }
}


function App() {
  return (
    <div className="App">
      <Header/>
      <Section1/>
      <Section2/>
      <Section3/>
      <Section4/>
      <Section5/>
      <Section6/>
      <Footer/>
    </div>
  )
}

export default App;

const Header = () => {
  return (
    <header className="Header">
      <div className="Content">
        <div className="Logo"><img src={logo} className="Logo" alt="logo" /></div>
      </div>
    </header>
  )
}

const Section1 = () => {
  return (
    <div className="Section Section1">
      <Video video='video1.mp4' img='video1.png'/>
      <span className="Vertical">©2019, Oslo, Norway</span>
      <div className="Content">
        <div className="Row">
          <h1>Applied Machine Learning</h1>
        </div>
        <div className="Row">
          <h2>Solving complex problems with Deep Neural Networks</h2>
        </div>
      </div>
    </div>
  )
}

const Section2 = () => {
  return (
    <div className="Section Section2">
      <div className="Content">
        <h1><div className="Rectangle"/><span>Modern Deep Learning</span></h1>
        <h2>Welcome to the Machine is a software company specialized in applying Machine Learning to business needs.</h2>
        <h2>Machine learning is an old concept with very recent developments. With a class of algorithms based on Deep Neural Networks this technology improved exponentially and achieved results that are better than human experts in many fields since 2015.</h2>
        <h2>We have been developing software tools based on this new technology and successfully solving complex business problems across industries:</h2>
        <div className="Row">
          {CARDS.map(e=>Card(e))}
        </div>
      </div>
    </div>
  )
}


const Section3 = () => {
  return (
    <div className="Section Section3">
      <img src={u('video1.png')}/>
      <div className="Content">
        <h1>Leverage your own data</h1>
        <h2>Training a model with corporate data can automate processes and execute tasks that only experts can perform. And the machine will do it better and several orders of magnitude faster with unlimited gains in efficiency.</h2>
        <p>Contact us -></p>
      </div>
    </div>
  )
}


const Section4 = () => {
  return (
    <div className="Section Section4">
      <div className="Content">
        <h1>How it works</h1>
        <h2>Machine Learning development is based on creating and training Models that are able to make predictions of new data (ex: sales in the future).
A Model is a mathematical function that transforms the input (known data such as a medical image) into a prediction (has or has not cancer). 
For modern projects the Model is too complex to be defined or programmed by humans, so it is developed by the machine itself through training.
Training consists on showing the model historical input data and the corresponding known results and make it learn through specific technics.
Done properly the Model learns from data and generalizes, and is able to make accurate predictions on new data never seen before.
</h2>
      </div>
    </div>
  )
}


const Section5 = () => {
  return (
    <div className="Section Section5">
      <div className="Content">
        <h1>Case studies</h1>
      </div>
    </div>
  )
}


const Section6 = () => {
  return (
    <div className="Section Section6">
      <div className="Content">
        <h1>Our approach</h1>
      </div>
    </div>
  )
}


const Footer = () => {
  return (
    <header className="Footer">
      <div className="Logo"><img src={logo} className="Logo" alt="logo" /></div>
      <div className="Address">
        <p>Beddingen 24, 0250 Oslo</p>
        <p>info@themachine.global</p>
        <p>+47 909 78 606</p>
      </div>
    </header>
  )
}

const Card = (props) => 
  <div className="Card">
    <div className="Top">
      <img src={u(props.img)}/>
    </div>
    <h3>{props.title}</h3>
    <p>{props.text}</p>
  </div>