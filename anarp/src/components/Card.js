import React, { Component } from 'react'
import './Card.css'


class Card extends Component {

  onClick = () => this.props.onClick ? this.props.onClick() : null

  render() {
    let cls = 'Card' + (this.props.status==='inactive' ? ' Inactive' : '')
    return (
      <div className={cls} onClick={this.onClick}>
        <span className="CardLabel">{this.props.label}</span>
        <span className="CardStatus">{this.props.status}</span>
      </div>
    )
  }
}

export default Card
