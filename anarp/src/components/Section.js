import React, { Component } from 'react'
import Icon from './Icon'


const SPECIAL_TYPES = ["App", "AppContent", "Header", "Footer", "Page", "Main", "W100", "Row", "Box", "CenterH", "CenterV"]

class Section extends Component {

  render() {
    let cls = "Section"
    Object.keys(this.props).forEach((key, _) => SPECIAL_TYPES.indexOf(key)!=-1 ? cls += ` ${key}` : null)
    if(this.props.cls) cls += ` ${this.props.cls}`
    let id = this.props.id || null
    let css = {}
    if(this.props.w) css['width']=this.props.w
    if(this.props.h) css['height']=this.props.h
    return (
      <div className={cls} style={css}>
        {id && <div id={id}></div>}
        {this.props.img && <img className="SectionImage" src={this.props.img}/>}
        {this.props.title && <h2>{this.props.title}</h2>}
        {this.props.subtitle && <h3>{this.props.subtitle}</h3>}
        {this.props.text && this.props.text.split("\n").map(p=><p>{p}</p>)}
        {this.props.children}
        {this.props.back && <a className="SectionBack" href="#Menu"><Icon icon='top' size={64} color='#777777'/></a>}
      </div>
    )
  }
}

export default Section