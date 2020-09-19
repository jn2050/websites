import React, { Component } from 'react'
import Icon from './Icon'


const TYPES = ['App', 'Header',  'Footer', 'Page', 'WebPage', 'Main',
               'Sidenav', 'Sidepanel', 'White', 'W100', 'Row',  'Bar', 'Box',
               'MaxWidth', 'CenterH', 'CenterV']

class Section extends Component {

  render() {
    let cls = "Section"
    //Object.keys(this.props).forEach((key, _) => TYPES.indexOf(key)!==-1 ? cls += ` ${key}` : null)
    Object.keys(this.props).forEach((key, _) => (TYPES.indexOf(key)!==-1 && this.props[key])? cls += ` ${key}` : null)
    if(this.props.cls) cls += ` ${this.props.cls}`
    let id = this.props.id || null
    let style = {}
    if(this.props.backgroundColor) style['backgroundColor'] = this.props.backgroundColor
    if(this.props.w) style['width']=this.props.w
    if(this.props.h) style['height']=this.props.h
    if('error' in this.props)
      return <div className="Section Error"><h2>System error</h2><p>{this.props.error}</p></div>
    return(
      <div className={cls} style={style}>
        {id && <div id={id}></div>}
        {this.props.img && <img className="SectionImage" src={this.props.img} alt=""/>}
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