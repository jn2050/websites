import React, { Component } from 'react'
//import Icon from './Icon'
import './Ranger.css'


class Ranger extends Component {
    constructor(props) {
        super(props)
        this.state = {
            start: 0,
            end: 0,
            nslots: 5,
        }
        this.ranger1 = React.createRef()
    }

    render() {
        let {start, end, nslots} = this.state
        let w = this.ranger1.current ? this.ranger1.current.offsetWidth : 0
        let w1 = w ? w/nslots : 0
        let slots = get_slots(start, end, nslots)
        return(
            <div ref={this.ranger1} className="Ranger">
                {w && slots.map(e=>
                    <div style={{width: w1}} className="Slot">
                        <div className="Dot"/>
                        <div className="Tooltip"><div className="TooltipText">{e}</div></div>
                    </div>)
                }
            </div>
        )
    }
}


const get_slots = (start, end, nslots) => {
    let slots = []
    for(let i=0; i<nslots; i++)
        slots.push(i*5)
    return slots
}

export default Ranger
