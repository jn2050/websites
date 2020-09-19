import React, { Component } from 'react'
import './Confirm.css'


class Confirm extends Component {
    render() {
        return(
            <div className="Confirm">
                <h2>{this.props.title}</h2>
                <p>{this.props.message}</p>
                <button onClick={this.props.onConfirm}>Confirm</button>
                <button onClick={this.props.onCancel}>Cancel</button>
          </div>
        )
    }
}

export default Confirm
