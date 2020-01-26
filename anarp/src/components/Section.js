import React, { Component } from 'react'
import './Section.css'


const options = {
  'page': 'Page',
  'main': 'Main',
  'sidenav': 'SideNav',
  'sidepanel': 'SidePanel',
  'bar': 'Bar',
  'row': 'Row',
  'top': 'FlexTop',
  'center': 'FlexCenter',
  '': '',
}

class Section extends Component {

  render() {
    let cls = 'Section'
    Object.keys(this.props).forEach((key, _) => options.hasOwnProperty(key) ? cls += ` ${options[key]}` : null)
    if(this.props.cls) cls += ` ${this.props.cls}`
    return (
      <div className={cls} >
        {this.props.info && <div className="Info">{this.props.info}</div>}
        {this.props.error && <div className="Error">{this.props.error}</div>}
        {!this.props.info && !this.props.error && this.props.children}
      </div>
    )
  }
}

export default Section
