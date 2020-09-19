import React, { Component } from 'react'
import './Card.css'
import Section from './Section'
import Button from './Button'
import Icon from './Icon'
import {url} from '../js/util'


class Card extends Component {

  constructor(props) {
    super(props)
  }

  download = (url) => {
    let link = document.createElement('a')
    link.href = url
    link.download = url.substr(url.lastIndexOf('/') + 1)
    link.click()
  }

  opentab = (url) => window.open(url,'_blank')

  render() {
    let cls = 'Card ' + this.props.type + ` ${this.props.titlePos?this.props.titlePos:""}`

    switch(this.props.type) {
      case 'Hero':
      case 'Text':
      case 'VBox':
        const imgPos = 'ImgLeft'  // ImgLeft, ImgRight, ImgTop, ImgBottom, ImgFull
        return (
          <div className={cls}>
            {this.props.backgroundImg && <img className="BackgroundImg" src={url(this.props.backgroundImg)}/>}
            {this.props.img && <img className={`Img ${imgPos}`} src={url(this.props.img)}/>}
            <div className={`TextBox ${imgPos}`}>
              {this.props.title && <h1>{this.props.title}</h1>}
              {this.props.text && <h3>{this.props.text}</h3>}
                {this.props.textlines &&
                  <div className="TextArea">
                    {this.props.textlines.map((e,i)=><p>{e}</p>)}
                  </div>
                }
            </div>
          </div>
        )
      case 'Doclink':
        return (
          <div className={cls}>
            <p>{this.props.name}</p>
            <Icon icon='download' size={16} color='#999999' onClick={()=>this.download(this.props.url)} />
            <Icon icon='open' size={20} color='#999999' onClick={()=>this.opentab(this.props.url)}/>
          </div>
        )
      case 'File':
        return (
          <div className={cls}>
            <p>{this.props.name}</p>
            <p>{this.props.size}</p>
          </div>
        )
      case 'Dialog':
        // console.log(this.props.text)
        // return (
        //   <Section Page CenterV CenterH cls={cls}>
        //     {this.props.title && <h2>{this.props.title}</h2>}
        //     {this.props.is_error && <Icon />}
        //     {this.props.text && <p className={`Message ${this.props.is_error ? "Error" : ""}`}>{this.props.text}</p>}
        //     {this.props.onOk && <Button type="action" L text={this.props.ok_text} onClick={this.onOk}/>}
        //     {this.props.onCancel && <Button type="action" L text={this.props.cancel_text} onClick={this.onCancel}/>}
        //   </Section>)
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
