import React, { Component } from 'react'
import './Webpage.css'
import Section from './Section'
import Card from './Card'
import {url} from '../js/util'

const COLORS = ["#FFFFFF", "#FF0000", "#00FF00", "#0000FF", "#FF0000", "#00FF00", "#0000FF"]


class Webpage extends Component {

  constructor(props) {
    super(props)
  }

  // MaxWidth
  render() {
    const webpage = this.props.webpages[0]
    return(
      <Section Page>
        {webpage.sections.map((section,i)=>
          <Section backgroundColor={COLORS[i]} title={section.title}>
            {section.cards.map((card,i)=><Card {...card}/>)}
          </Section>
        )}
      </Section>
    )
  }
}

export default Webpage


// img { 
//   background: url(images/bg.jpg) no-repeat center center fixed; 
//   -webkit-background-size: cover;
//   -moz-background-size: cover;
//   -o-background-size: cover;
//   background-size: cover;
// }