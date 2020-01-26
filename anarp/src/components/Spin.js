import React, { Component } from 'react'
import Spinner from 'react-spinkit'
import './Spin.css'

// http://kyleamathews.github.io/react-spinkit/


class Spin extends Component {
  render() {
      return (
        <div className={`Spin ${this.props.size}`} >
          <Spinner className="Spinner" name="ball-clip-rotate" fadeIn="none" color="coral" />
          {this.props.msg && <div className="Message">{this.props.msg}</div>}
        </div>
      )
  }
}

export default Spin
