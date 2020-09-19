import React, { Component } from 'react'
import Progress from './Progress'
import Icon from './Icon'
import './Item.css'


class Item extends Component {

  constructor(props) {
    super(props)
    this.state = {
      onDrag: false,
      onDragOver: false,
    }
  }

  onDrag = (e,i) => {
  }

  onDragStart = (e,i) => {
    this.setState({onDrag: true})
    this.props.onDragStart(e,i)
  }

  onDragEnd = (e,i) => {
    this.setState({onDrag: false})
    this.props.onDragEnd(e,i)
  }

  onDragOver = (e,i) => {
    this.setState({onDragOver: true})
  }

  onDragEnter = (e,i) => {
  }

  onDragLeave = (e,i) => {
    this.setState({onDragOver: false})
  }

  onDrop = (e,i) => {
    this.props.onDrop(e,i)
    this.setState({onDragOver: false})
  }
  
  render() {
    let {id, icon, icon2, img, text, text2, p, drag} = this.props
    let progress = (p!=null && p!=undefined) ? true : false
    let {onDrag, onDragOver} = this.state
    let cls = `ItemItem ${onDrag?"onDrag":""} ${onDragOver?"onDragOver":""}`
    return(
      <div className={cls} draggable={true}
              onDrag={e => this.onDrag(e,id)}
              onDragOver={e => this.onDragOver(e,id)}
              onDragEnter={e => this.onDragEnter(e,id)}
              onDragLeave={e => this.onDragLeave(e,id)}
              onDrop={e => this.onDrop(e,id)}>
        {drag &&
          <div className="Edit" draggable={true}
                onDragStart={e => this.onDragStart(e,id)}
                onDragEnd={e => this.onDragEnd(e,id)}>
            <Icon icon="drag" size={24}/>
          </div>}
        {img && <img src={img}/>}
        {icon && !img && <Icon icon={icon} size={24}/>}
        {icon2!=null && !icon && !img && <span className="Icon2">{icon2}</span>}
        <span className="Text">{text}</span>
        <span className="Text2">{text2}</span>
        {progress && <Progress bottom p={p}/>}
        {/* {progress && <Progress pie p={p}/>}
        {progress && <Button cancel/>} */}
      </div>
    )
  }
}

export default Item
