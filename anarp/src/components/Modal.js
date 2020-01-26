import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { closeModal } from '../js/actions'
import './Modal.css'


class Modal extends Component {
  constructor(props) {
    super(props)
    this.close = this.close.bind(this)
    this.state = {
      show: false,
      content: null,
      closeOutside: true,
      onOk: null,
      onCancel: null
    }
  }

  close(e) {
    e.preventDefault()
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    if(this.props.modalParams.closeOutside === false)
      return
    this.props.closeModal()
  }

  render() {
    if (this.props.modalParams==null || this.props.modalParams.show==null)
      return null
    return(
      <div className="backdrop" onClick={this.close} >
        <div className="modal" >
          {this.props.modalParams.content}
        </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    modalParams: state.state.modalParams,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ closeModal }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)