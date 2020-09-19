import React, { Component } from 'react'
import Button from './Button'
import Icon from './Icon'
import './Tree.css'


class Tree extends Component {

  constructor(props) {
    super(props)
    this.container = React.createRef()
    this.state = {
      data: null,
      node: null,
      selected_node: null,
      selected_id: null,
    }
  }

  componentDidMount = () => {
    document.addEventListener("mousedown", this.clickOutside)
    if(!this.props.data || !this.props.data.length) return
    let data = ('id' in this.props.data[0]) ? this.props.data : mk_tree_keys(this.props.data)
    this.setState({data: data})
  }

  componentWillUnmount = () => document.removeEventListener("mousedown", this.clickOutside)

  componentDidUpdate(prevProps, prevState) {
  }

  clickOutside = event => {
    if(this.container.current && !this.container.current.contains(event.target))
      this.setState({open: false})
  }

  selectFirst = (node) => {
  }

  onSelect = (node) => {
    this.setState({selected_node: node, selected_id: node.id})
    this.expand(node)
    if(this.props.onSelect) this.props.onSelect(node)
  }

  expand = (node) => node["expand"] = !node["expand"]


  render_node = (node, level) => {
    let hasChildren = node.hasOwnProperty('children') && node["children"].length > 0
    let L = (level+1)<=3 ? `L${level+1}` : 'L3'
    let selected = (!('children' in node)) && (node.id === this.state.selected_id)
    return (
      <div className={`Node ${L} ${selected?"Selected  ":""} ${node.inactive?"Inactive ":""}`}>
        <div className="Item" onClick={()=>this.onSelect(node)}>
          <div className="TextBox"><span>{node.text}</span></div>
          {hasChildren && !node.expand && <Icon size={10} icon="right"/>}
          {hasChildren && node.expand && <Icon size={10} icon="down"/>}
        </div>
        {hasChildren && node.expand && node.children.map((e,i)=>this.render_node(e, level+1))}
      </div>
    )
  }

  render() {
    return (
      <div className={`Tree ${this.props.cls ? this.props.cls : ""}`}>
        <div className="Container">
        {this.state.data && this.state.data.map((e)=>this.render_node(e, 0, ''))}
        </div>
      </div>
    )
  }
}

export default Tree


const mk_tree_keys = (data, id) => {
  id = id || 1
  data.map(e=>{
    e.id = id++
    if(e.children) e.children.map(e1=>e1.id = id++)
  })
  return data
}
