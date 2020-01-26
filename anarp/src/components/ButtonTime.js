import React, { Component } from 'react'
import Button from './Button'
import Confirm from './Confirm'
import './ButtonTime.css'
import * as d3 from 'd3'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { openModal } from '../js/actions'


class ButtonTime extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: this.props.text || null,
            selected: this.props.selected,
            set: false,
            ts: 0,
            timeStr: "",
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.selected==prevProps.selected)
            return
        this.setState({selected: this.props.selected})
    }

    setSelect = (v) => this.setState({ selected: v })

    onClick = ()  => {
        let ts = Date.now()
        let timeStr = d3.timeFormat("%H:%M:%S")(ts)
        this.setState({ts: ts/1000, timeStr: timeStr})
        this.props.openModal({
            show:       true,
            content:    <Confirm
                            title={"Confirm "+this.props.text}
                            message={"Time: "+timeStr}
                            onConfirm={this.onConfirm}
                            onCancel={this.onCancel}/>,

        })
    }

    onConfirm = () => {
        this.setState({
            text: `${this.props.text} : ${this.state.timeStr}`,
            set: true,
          })
        if(this.props.onClick)
            this.props.onClick(this.props.id, this.state.ts)
    }

    onCancel = () => null

    render() {
        return(
            <Button cls="ButtonTime" {...this.props} icon="time" text={this.state.text} onClick={this.onClick}/>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ openModal }, dispatch)
}

export default connect(null, mapDispatchToProps)(ButtonTime)
