import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './Chart.css'
import * as d from '../js/d.js'


class Chart extends Component {
    constructor(props) {
        super(props)
        this.state = { containerId: "" }
        this.svg = null
        this.chart = null
    }

    componentDidMount() {
        this.setState({containerId: ReactDOM.findDOMNode(this).parentNode.getAttribute("id")})
        //console.log(this.refs.chartTitle)
    }

    componentDidUpdate(prevProps) {
        this.draw()
    }

    draw() {
        if (this.props.options==null || this.props.data==null)
            return
        d.draw(this.refs.chartChart, this.props.data, this.props.options)
    }

    render() {
        return (
            <div className={`Chart`}>
                {this.props.options.title && <div className={`ChartTile`} ref="chartTitle">{this.props.options.title}</div>}
                <div className={`ChartChart`} ref="chartChart"></div>
            </div>
        )
    }
}

export default Chart
