import React, { Component } from 'react'
import Button from './Button'
import { PubSub } from '../js/pubsub'
import './Modal.css'


class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      close_outside: true,
      onOk: null,
      onCancel: null,
      content: null
    }
    PubSub.subscribe('MODAL', params=>this.open(params))
  }

  close1 = (e) => {
    e.preventDefault()
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    if(this.props.closeOutside) this.props.closeModal()
  }

  open = (params) => this.setState({
    show: true,
    close_outside: 'close_outside' in params ? params.close_outside : true,
    onOk: params.onOk || null,
    onCancel: params.onCancel || null,
    content: params.content || null
  })
  close = () => this.setState({show: false})
  clickInside = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }
  clickOutside = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if(this.state.close_outside) this.close()
  }
  onOk = () => {
    if(this.state.onOk) this.state.onOk()
    this.close()
  }
  onCancel = () => {
    if(this.state.onCancel) this.state.onCancel()
  }

  render() {
    if(!this.state.show) return null
    return(
      <div className="Backdrop" onClick={this.clickOutside}>
        <div className="Modal" onClick={this.clickInside}>
          {this.state.content}
          <div className="ButtonsBar">
            <Button type="Action" text="OK" onClick={this.onOk}/>
            {this.state.onCancel &&  <Button type="Danger" text="Cancel" onClick={this.onCancel}/>}
          </div>
        </div>
    </div>
    )
  }
}

export default Modal