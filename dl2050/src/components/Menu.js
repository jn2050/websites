import React, { Component } from 'react'
import Button from './Button'
import Icon from './Icon'
import { Link } from 'react-router-dom'
import './Menu.css'


const TYPES = ['menu', 'icons', 'buttons', 'item', 'pulldown']
const SIZES = ['S', 'M', 'L', 'XL', 'pulldown']


class Menu extends Component {

  constructor(props) {
    super(props)
    this.container = React.createRef()
    this.state = {
      options: null,
      open: false,
      selected: 0,
      selected_e: null,
      filter: false,
    }
    this.type = this.findType().replace(/^\w/, c => c.toUpperCase())
    this.size = ''
    SIZES.forEach(e => {if(e in this.props) this.size = e})
  }

  findType = () => {
    if(this.props.type) return TYPES.includes(this.props.type) ? this.props.type : 'menu'
    TYPES.forEach(e => {if(e in this.props) this.type = e})
    return this.type || 'menu'
  }

  componentDidMount = () => {
    if(this.mode === 'dropdown' || this.mode === 'pulldown')
      document.addEventListener("mousedown", this.clickOutside)
    if(this.props.options) this.setState({options: this.props.options.slice()})
    this.setState({filter: this.props.options && this.props.options.length>2})
  }

  componentWillUnmount = () => {
    if(this.mode === 'dropdown' || this.mode === 'pulldown')
      document.removeEventListener("mousedown", this.clickOutside)
  }

  componentDidUpdate = (prevProps) => {
    if(JSON.stringify(this.props.options) === JSON.stringify(prevProps.options))
      return
  }

  clickOutside = event => {
    if(this.container.current && !this.container.current.contains(event.target))
      this.setState({open: false})
  }

  open = () => this.setState({open: !this.state.open})
  close = () => this.setState({open: false})

  select = (n) => {
    if(this.state.selected!=n)
      this.setState({selected: n, selected_e: this.state.options[n], open: false})
    this.close()
  }

  setSelect = (n) => {
    this.setState({selected: n})
  }

  onSelect = (n, e) => {
    this.close()
    this.setState({selected: n, selected_e: e, open: false})
    if(this.props.onSelect) this.props.onSelect(e)
  }

  onFilterChange = () => this.setState({options: this.props.options.filter(w => w.startsWith(this.refs.input.value))})

  clearFilter = () => {
    this.setState({options: this.props.options})
    this.refs.input.value = ''
    this.refs.input.focus()
  }


  getItem = (type, selected) => {
    if(type==='Menu' || type=='Pulldown')
      return (e,i)=>{
        let path = typeof e==='object' && 'path' in e ? e.path : false
        let text = typeof e==='string' ? e : e.text
        let cls = `${e.inactive?'Inactive':''} ${i==selected?' Selected':''}`
        if(path && !e.inactive)
          return <Link key={i} className={cls} to={path} onClick={()=>this.onSelect(i,e)}>{text}</Link>
        return <li className={cls} onClick={()=>this.onSelect(i,e)}>{text}</li>
      }
    if(type==='Buttons')
      return (e,i)=><Button text={e} selected={i==selected} onClick={e=>this.onSelect(i,e)}/>
    if(type==='Icons')
      return (e,i)=><Icon icon={e} selected={i==selected} onClick={e=>this.onSelect(i,e)}/>
    if(type==='Item')
      return (e,i)=>this.props.item(e,i)
  }

  render_pulldown = (item) =>
      <div className="Menu Pulldown" ref={this.container}>
        <Icon size={24} icon={this.props.icon} onClick={this.open}/>
        {this.state.open &&
          <div className="Options">
            {this.props.options.map((e,i)=><div className={`Wrapper`} id={i}>{item(e,i)}</div>)}
          </div>
        }
      </div>

  render() {
    if(!this.props.options) return null
    let item = this.getItem(this.type, this.state.selected)
    if(this.type==='Pulldown') return this.render_pulldown(item)
    return(
      <div className={`Menu ${this.props.vertical?'Vertical ':''} ${this.type} ${this.size}`}>
            {this.props.options.map((e,i)=><div key={i} className={`Wrapper`}>{item(e,i)}</div>)}
      </div>
    )
  }
}

export default Menu
