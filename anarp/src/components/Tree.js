import React, { Component } from 'react'
import Button from './Button'
import Icon from './Icon'
import './Tree.css'


class Tree extends Component {

  constructor(props) {
    super(props)
    this.container = React.createRef()
    this.state = {
      node: null,
    }
  }

  componentDidMount = () => document.addEventListener("mousedown", this.clickOutside)
  componentWillUnmount = () => document.removeEventListener("mousedown", this.clickOutside)


  clickOutside = event => {
    if(this.container.current && !this.container.current.contains(event.target))
      this.setState({open: false})
  }

  onSelect = (node) => {
    this.setState({node: node})
    this.expand(node)
    if(this.props.onSelect) this.props.onSelect(node)
  }

  expand = (node) => node["expand"] = !node["expand"]


  render_node = (node) => {
    let hasChildren = node.hasOwnProperty('children') && node["children"].length > 0
    return (
      <div className="Node">
        <div className="Item" onClick={()=>this.onSelect(node)}>
          <span className="Value">{node.value}</span>
          {hasChildren && !node.expand && <Icon size={10} icon="delta-down" fill="red"/>}
          {hasChildren && node.expand && <Icon size={10} icon="delta-up" fill="red"/>}
        </div>
        {hasChildren && node.expand && node.children.map((e,i)=>this.render_node(e))}
      </div>
    )
  }

  render() {
    let cls = `Tree`
    return (
      <div className={cls}>
        {this.props.data && this.props.data.map((e)=>this.render_node(e))}
      </div>
    )
  }
}

export default Tree
