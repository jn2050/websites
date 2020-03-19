import React, { Component } from 'react'
import Button from './Button'
import Icon from './Icon'
import './Select.css'


const MODES = ['menu', 'icons', 'buttons', 'dropdown', 'pulldown']
const SIZES = ['S', 'M', 'L', 'XL', 'pulldown']


const defaultItem = (props, i) => {
  let cls = (props.selected ? ' Selected' : '')
  return <li className={cls} onClick={()=>props.onSelect(i)}>{props.item.text}</li>
}


class Select extends Component {

  constructor(props) {
    super(props)
    this.container = React.createRef()
    this.state = {
      open: false,
      value: 'default',
      selected: 0,
      dropDownValue: this.props.title,
    }
    this.item = this.props.item || defaultItem
    this.mode = null
    MODES.forEach(e => {if(e in this.props) this.mode = e})
    this.size = null
    SIZES.forEach(e => {if(e in this.props) this.size = e})
  }

  componentDidMount = () => {
    if(this.mode === 'dropdown' || this.mode === 'pulldown')
      document.addEventListener("mousedown", this.clickOutside)
  }

  componentWillUnmount = () => document.removeEventListener("mousedown", this.clickOutside)

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
    if(this.state.value!=this.state.options[n].label)
      this.setState({value: this.state.options[n].label, open: false})
    this.close()
  }

  setSelect = (id) => {
    let n = this.props.options.findIndex(e=>e.id===id)
    this.setState({selected: n})
  }

  onClick = (e) => {
    this.setState({dropDownValue: e.currentTarget.textContent})
  }

  onSelect = (n) => {
    this.close()
    this.setState({selected: n})
    if(this.props.onSelect)
      this.props.onSelect(n)
  }

  render() {
    if(!this.props.options) return null
    let cls = `Select ${this.props.vertical ? " Vertical " : ""}`
    switch(this.mode) {
      case 'menu':
          cls += `Menu ${this.size}`
          return(
            <div className={cls}>
                  {this.props.options.map ( (e,i) => {
                    let props = {
                      item: e,
                      selected: i==this.state.selected & !this.props.noselect, onSelect: ()=>this.onSelect(i),
                      onSelect: this.props.onSelect
                    }
                    return this.item(props, i)
                  })}
            </div>
          )
      case 'buttons':
        cls += 'Buttons'
        return(
          <div className={cls}>
            {this.props.options.map ((e,i) =>
                <Button id={i} text={e} selected={i==this.state.selected} onClick={e=>this.onSelect(i)}/>
            )}
          </div>
        )
      case 'icons':
        cls += 'Icons'
        return(
          <div className={cls}>
              {this.props.options.map ((e,i) =>
                <Button id={i} icon={e} selected={i==this.state.selected} onClick={e=>this.onSelect(i)}/>
              )}
          </div>
        )
      case 'pulldown':
        cls += 'Pulldown'
        return (
          <div className={cls} ref={this.container}>
            <Icon iconsize={24} icon={this.props.icon} onClick={this.open}/>
            {this.state.open && this.props.options &&
              <div className="Options">
                {this.props.options.map((e,i) => {
                  let props = {
                    item: e,
                    onSelect: ()=>this.onSelect(i)
                  }
                  return this.item(props, i)
                })}
              </div>
            }
          </div>
        )
    }
  }
}

export default Select
