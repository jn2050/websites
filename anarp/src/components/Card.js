import React, { Component } from 'react'
import './Card.css'
import Icon from './Icon'


class Card extends Component {

  download = (url) => {
    let link = document.createElement('a')
    link.href = url
    console.log(url)
    link.download = url.substr(url.lastIndexOf('/') + 1)
    link.click()
  }

  opentab = (url) => window.open(url,'_blank')

  render() {
    let cls = 'Card ' + this.props.type

    switch(this.props.type) {
      case 'Doclink':
        return (
          <div className={cls}>
            <p>{this.props.name}</p>
            <Icon icon='download' size={16} color='#999999' onClick={()=>this.download(this.props.url)} />
            <Icon icon='open' size={20} color='#999999' onClick={()=>this.opentab(this.props.url)}/>
          </div>
        )
    }
    return (
      <div className={cls}>
        <img src={this.props.img}/>
        <h3>{this.props.title}</h3>
        {this.props.text && this.props.text.split("\n").map(p=><p>{p}</p>)}
      </div>
    )
  }
}

export default Card
