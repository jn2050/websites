import React, { Component } from 'react'
import './Progress.css'

class Progress extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const p =  Math.floor(Math.max(Math.min(100*this.props.p, 100),0))
        let css = { width: `${p}%` }

        if(this.props.bottom) return(
            <div className="Progress Bottom">
                {p!=0 && <div className="Base"><div className="Filler" style={css}/></div>}
                {p==0 && <div className="Base stripes animated reverse slower"/>}
            </div>)
        if(this.props.pie) return(
            <div className="Progress Bottom">
                <div class="progress-pie" data-value="50"></div>
            </div>)
        if(this.props.spin) return(
            <div className="Spin"><div></div><div></div><div></div><div></div></div>)
        return null
    }
}

export default Progress