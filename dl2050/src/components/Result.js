import React, { Component } from 'react'
import './Result.css'
import Icon from './Icon'
import Button from './Button'
import Progress from './Progress'


class Result extends Component {

    constructor(props) {
        super(props)
        this.state = {
            step: "action",
            p: 0.1,
        }
        setTimeout(()=>this.setState({step: 'processing', p: 0}), 2000)
        this.test_progress()
    }

    componentDidMount = () => {}

    test_progress = () => {
        this.setState({p: this.state.p+.01})
        if(this.state.p>1) return
        setTimeout(this.test_progress, 100)
    }

    onAction = () => this.setState({step: 'request'})
  
    render() {
        return (
            <div className="Result">
                {this.state.step==='action' && <Button text="GO" onClick={this.onAction}/>}
                {this.state.step==='request' &&  <Progress p={0} msg="Requesting service"/> }
                {this.state.step==='processing' &&  <Progress p={this.state.p}/> }
            </div>
        )
    }
}
  
export default Result