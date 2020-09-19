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
        this.options = this.props.options || {}
        this.draw()
    }

    draw() {
        if (this.props.data==null) return
        d.draw(this.refs.chartChart, this.props.data, this.options)
    }

    render() {
        const title = this.options ? this.options.title : null
        return (
            <div className={`Chart`}>
                {title && <div className={`ChartTile`} ref="chartTitle">{this.options.title}</div>}
                <div className={`ChartChart`} ref="chartChart"></div>
            </div>
        )
    }
}

export default Chart
