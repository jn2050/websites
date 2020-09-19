import React, { Component } from 'react'
import Item from './Item'


class Collection extends Component {

    constructor(props) {
        super(props)
        this.state = {
            items: [],
        }
    }

    componentDidMount = () => {
        this.setState({items: this.props.data})
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(JSON.stringify(prevProps.urls)===JSON.stringify(this.props.urls)) return
        if(!this.props.url && this.props.urls && this.props.urls.length)
            this.setState({url: this.props.urls[0]})
        this.setSchedulers()
    }

    onDragStart = (e,i) => {
        this.dragged_i = i
        e.dataTransfer.effectAllowed = "move"
        e.dataTransfer.setData("text/html", e.target.parentNode)
        e.dataTransfer.setDragImage(e.target.parentNode, 20, 20)
    }

    onDragEnd = (e,i) => {
        this.dragged_i = null
    }

    onDragOver = (e,i) => {
    }

    onDrop = (e,i) => {
        e.preventDefault()
        const idx = this.dragged_i
        if(idx===null || idx===i) return
        const {items} = this.state
        const item = items[idx]
        const items2 = idx<i
            ? [...items.slice(0,idx), ...items.slice(idx+1,i+1), item, ...items.slice(i+1)]
            : [...items.slice(0,i), item, ...items.slice(i,idx), ...items.slice(idx+1)]
        this.setState({items: items2})
    }
    
    render() {
        const {items} = this.state
        return (
            <div className="Collection">
                <div className="Bar"></div>
                {items && items.map((e,i)=>
                    <Item {...e} key={i} id={i} drag={true}
                        onDragStart={this.onDragStart} onDragEnd={this.onDragEnd} onDragOver={this.onDragOver} onDrop={this.onDrop}/>
                )}
            </div>
        )
    }
}
  
export default Collection