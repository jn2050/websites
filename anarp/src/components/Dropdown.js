import React, { Component } from 'react'
import Button from './Button'
import Icon from './Icon'
import './Dropdown.css'


class Dropdown extends Component {

  constructor(props) {
    super(props)
    this.container = React.createRef()
    this.state = {
      data: this.props.data.slice(),
      open: false,
      filter: true,
      value: null,
    }
  }

  componentDidMount = () => document.addEventListener("mousedown", this.clickOutside)
  componentWillUnmount = () => document.removeEventListener("mousedown", this.clickOutside)


  clickOutside = event => {
    if(this.container.current && !this.container.current.contains(event.target))
      this.setState({open: false})
  }

  open = () => this.setState({open: !this.state.open})
  close = () => this.setState({open: false})

  onSelect = (v) => {
    this.setState({value: v, open: false})
    this.close()
    if(this.props.onSelect) this.props.onSelect(v)
  }

  clearFilter = () => {
    this.refs.input.value = ''
    this.refs.input.focus()
  }

  onChange = () => this.setState({data: this.props.data.filter(w => w.startsWith(this.refs.input.value))})

  render() {
    let cls = `Dropdown ${this.state.open ? "Open" : ""}`
    return (
      <div className={cls} ref={this.container}>
        <div className="Choice" onClick={this.open}>
          {this.state.value && <span>{this.state.value}</span>}
          {!this.state.value && <span className="Placeholder">Select</span>}
          <Icon size={12} icon="download" onClick={this.open}/>
        </div>
        {this.state.open &&
          <div className="Options">
            <div className="Filter">
              {this.state.filter && <input ref="input" type="text" placeholder="Filter" onChange={this.onChange}/>}
              {!this.state.filter && <span className="Placeholder">Filter</span>}
              {this.state.filter && <Icon size={15} icon="close" onClick={this.clearFilter}/>}
            </div>
            {this.state.data.map((e,i)=><li onClick={()=>this.onSelect(e)}>{e}</li>)}
          </div>
        }
      </div>
    )
  }
}

export default Dropdown
