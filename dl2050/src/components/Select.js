import React, { Component } from 'react'
import Item from './Item'
import Icon from './Icon'
import './Select.css'
import {request} from '../js/web'

const TYPES = ['dropdown', 'grid', 'list']

const is_obj = (e) => e!==null && typeof e==='object'
const get_desc = (e,c) => is_obj(e) ? e[c] : e


class Select extends Component {

  constructor(props) {
    super(props)
    this.container = React.createRef()
    this.state = {
      items: null,
      items0: null,
      open: false,
      selected: 0,
      value: null,
      filter: true,
    }
  }

  componentDidMount = () => {
    this.size = ''
    this.type = this.findType().replace(/^\w/, c => c.toUpperCase())
    if(this.type==='Dropdown') document.addEventListener("mousedown", this.clickOutside)
    this.get_data()
  }

  componentWillUnmount = () => {
    if(this.type==='Dropdown') document.removeEventListener("mousedown", this.clickOutside)
  }

  componentDidUpdate = (prevProps) => {
    if(this.props.url && this.props.url===prevProps.url) return
    let items1 = this.props.items || []
    let items2 = this.state.items || []
    if(JSON.stringify(items1)===JSON.stringify(items2)) return
    this.get_data()
  }

  item0 = (e,i,selected) => {
    let text, text2, icon2, p=null
    if(this.props.url) {
      text = is_obj(e) ? e[this.props.desc_col] : e
      text2 = is_obj(e) ? e[this.props.id_col] : ''
      icon2 = ''
    }
    if(this.props.items) {
      text = is_obj(e) ? e.text : e
      text2 = is_obj(e) ? e.text2 : ''
      icon2 = is_obj(e) ? e.icon2 : ''
      p = (is_obj(e) &&  'p' in e) ? e.p : null
    }
    return <Item img={e.img} icon2={i} text={text} text2={text2} p={p} onClick={e=>this.onSelect(i,e)}/>
  }

  findType = () => {
    if(this.props.type) return TYPES.includes(this.props.type) ? this.props.type : 'dropdown'
    TYPES.forEach(e => {if(e in this.props) this.type = e})
    return this.type || 'menu'
  }

  get_data = () => {
    if(!this.props.url) {
        let items = this.props.items || []
        this.setState({items: items.slice(), items0: items.slice()})
        return
    }
    if(!this.props.url || !this.props.tbl || !this.props.id_col  || !this.props.desc_col) return
    request(this.props.url, 'POST',
        {
            tbl: this.props.tbl,
            cols: [this.props.id_col, this.props.desc_col]
        },
        res => this.setState({items: res.result.data.slice(), items0: res.result.data.slice()}),
        (error) => console.log(error)
    )
  }

  clickOutside = event => {
    if(this.container.current && !this.container.current.contains(event.target))
      this.setState({open: false})
  }

  open = () => this.setState({open: !this.state.open})
  close = () => this.setState({open: false})

  select = (n) => {
    if(this.state.selected!=n)
      this.setState({selected: n, value: this.state.items[n], open: false})
    this.close()
  }

  setSelect = (n) => {
    this.setState({selected: n})
  }

  onSelect = (n, e) => {
    this.close()
    this.setState({selected: n, value: e, open: false})
    if(this.props.onSelect) this.props.onSelect(e)
  }

  onFilterChange = () => this.setState({items: this.state.items.filter(w =>
    is_obj(w)
      ? w[this.props.desc_col].toUpperCase().startsWith(this.refs.input.value.toUpperCase())
      : w.toUpperCase().startsWith(this.refs.input.value.toUpperCase()))
  })

  clearFilter = () => {
    let items0 = this.state.items0
    this.setState({items: items0, value: null})
    this.refs.input.value = ''
    this.refs.input.focus()
  }

  render_dropdown(cls, title, items, item) {
    let value = this.state.value
    let desc = get_desc(value, this.props.desc_col)
    return (
      <div className={`${cls} ${this.props.compact?'Compact ':''} ${this.state.open ? "Open" : ""}`} ref={this.container}>
        {title && <p className="Title">{title}</p>}
        <div className="Choice" onClick={this.open}>
          {value && <span>{desc}</span>}
          {!value && <span className="Placeholder">Select</span>}
          <Icon size={12} icon="down" onClick={this.open}/>
        </div>
        {this.state.open &&
          <div className="Options">
            {this.state.filter &&
              <div className="Filter">
                <input ref="input" value={desc} type="text" placeholder="Filter" onChange={this.onFilterChange}/>
                <Icon size={15} icon="close" onClick={this.clearFilter}/>
              </div>
            }
            {items.map((e,i)=>
              <li onClick={()=>this.onSelect(i,e)}>{get_desc(e, this.props.desc_col)}</li>
            )}
          </div>
        }
      </div>
    )
  }

  render_grid(cls, title, items, item) {
    return(
      <div className={cls}>
        {title && <div className="Bar">
          <h2>{title}</h2>
        </div>}
        {items!=null && items.map((e,i)=>
          <div key={i} className={`Wrapper`}>{item(e,i)}</div>
          // <Item {...e} key={i} id={i}
          // drag={true}
          // onDragStart={this.onDragStart}
          // onDragEnd={this.onDragEnd}
          // onDragOver={this.onDragOver}
          // onDrop={this.onDrop}/>
        )}
        </div>
    )
  }

  render_list(cls, items, item) {
    return(
        null
    )
  }

  render() {
    let items = this.state.items || []
    let item = this.props.item || this.item0
    let cls = `Select ${this.type} ${this.props.box?'Box':''}`
    let title = this.props.title
    if(this.type==='Dropdown') return this.render_dropdown(cls, title, items, item)
    if(this.type==='Grid') return this.render_grid(cls, title, items, item)
    if(this.type==='List') return this.render_grid(cls, title, items, item)
    return null
  }
}

export default Select
