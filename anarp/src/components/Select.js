import React, { Component } from 'react'
import Card from './Card'
import Button from './Button'
import './Select.css'


const prepareOptions = (options) => (options && typeof options[0]==='string') ? options.map((e,i)=>({key:i, label: e})) : options

const defaultMenuItem = (props, i) => {
  let cls = props.cls ? 'MenuItem' : ''
  cls += (props.selected ? ' Selected' : '')
  return <li className={cls} onClick={()=>props.onSelect(i)}>{props.label}</li>
}

const defaulCardItem = (props, i) => {
  let cls = props.cls
  cls += (props.selected ? ' Selected' : '')
  return <Card {...props} className={cls} onClick={()=>props.onSelect(i)}/>
}


class Select extends Component {

  constructor(props) {
    super(props)
    this.container = React.createRef()
    this.state = {
      open: false,
      options: prepareOptions(this.props.options),
      value: 'default',
      selected: 0,
      selectedLabel: '',
      dropDownValue: this.props.title,
    }
    this.menuItem = this.props.menuItem || defaultMenuItem
    this.cardItem = this.props.cardItem || defaulCardItem
    const MODES = ['menu', 'icons', 'buttons', 'dropdown', 'pulldown', 'flat']
    this.mode = null
    MODES.forEach(e => {if(e in this.props) this.mode = e})
  }

  componentDidMount = () => {
    if(this.mode === 'dropdown' || this.mode === 'pulldown')
      document.addEventListener("mousedown", this.clickOutside)
    if(this.mode === 'flat')
      this.setState({selectedLabel: this.props.options[1].label}) // --> Find first leaf
    this.setState({options: prepareOptions(this.props.options)})
  }

  componentDidUpdate = (prevProps) => {
    if(JSON.stringify(this.props.options) === JSON.stringify(prevProps.options))
      return
    this.setState({options: prepareOptions(this.props.options)})
  }

  componentWillUnmount = () => document.removeEventListener("mousedown", this.clickOutside)

  clickOutside = event => {
    if(this.container.current && !this.container.current.contains(event.target))
      this.setState({open: false})
  }

  open = () => this.setState({open:!this.state.open})
  close = () => this.setState({open:false})

  select = (n) => {
    if(this.state.value!=this.state.options[n].label)
      this.setState({value: this.state.options[n].label, open: false})
    this.close()
  }

  setSelect = (id) => {
    if(!this.state.options) return
    let n = this.state.options.findIndex(e=>e.id===id)
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

  onSelectFlat = (e) => {
    if(!e.leaf)
      return
    else
      this.setState({selectedLabel: e.label})
    if(this.props.onSelect)
      this.props.onSelect(e)
  }

  item = (e) => {
    let folder = 'leaf' in e && e.leaf===false
    let icon = folder ? 'selector-right' : null
    let cls = folder ? 'SelectFolder': 'SelectItem'
    if(e.label === this.state.selectedLabel)
      cls += ' Selected'
    return (
      <div className={`SelectRow ${cls}`} onClick={()=>this.onSelectFlat(e)}>
        {icon && <Button icon={icon} iconsize={8}/>}
        <li>{e.label}</li>
      </div>
    )
  }

  render() {
    if(!this.state.options)
      return null
    let cls
    switch(this.mode) {
      case 'menu':
          cls = this.props.vertical ? 'Select Menu Vertical' : 'Select Menu'
          cls += this.props.underline ? ' Underline' : ''
          cls += this.props.left ? ' Left' : ''
          return(
            <div className={cls}>
                  {this.state.options.map ( (e,i) => {
                    let selected = i==this.state.selected
                    let props = {...e, selected: selected, onSelect: ()=>this.onSelect(i)}
                    return this.menuItem(props, i)
                  })}
            </div>
          )
      case 'icons':
        return(
          <div className="Select Icons" >
            <div className='Group'>
              {this.state.options.map ((e,i) =>
                <Button icon={e.label} iconsize={20} id={i} selected={i==this.state.selected} onClick={e=>this.onSelect(i)}/>
              )}
            </div>
          </div>
        )
      case 'buttons':
          return(
            <div className="Select Buttons">
              {this.state.options.map ((e,i) =>
                  <Button text={e.label} id={i} selected={i==this.state.selected} onClick={e=>this.onSelect(i)}/>
              )}
            </div>
          )
      case 'dropdown':
        return (
          <div className="Select DropDown" ref={this.container}>
            {this.props.label && <span className="Label">{this.props.label}</span>}
            <div className="Filter">
              <div className="Value" onClick={this.open}>
                {this.state.options[this.state.selected].label}
              </div>
              <div className="Control" onClick={this.open}>
                <Button iconsize={12} icon="selector-down" onClick={this.open}/>
              </div>
            </div>
            {this.state.open && this.props.options &&
              <div className="Options">
                {this.state.options.map(
                  (e,i)=><li onClick={()=>this.select(i)}>{e.label}</li>)}
              </div>
            }
          </div>
        )
      case 'pulldown':
        return (
          <div className="Select PullDown" ref={this.container}>
            <div className="PullDownButton">
              <Button iconsize={24} icon={this.props.icon} onClick={this.open}/>
            </div>
            {this.state.open && this.props.options &&
              <div className="Options">
                {this.state.options.map((e,i) => {
                  let props = {...e, onSelect: ()=>this.onSelect(i)}
                  return this.menuItem(props, i)
                })}
              </div>
            }
          </div>
        )
      case 'flat':
        return (
          <div className="Select Flat">
            {this.props.title && <h2>{this.props.title}</h2>}
            <div className="List">
              {this.state.options.map((e)=>this.item(e))}
            </div>
          </div>)
      default:
        return null
    }
  }
}

export default Select


const build_idxs = (menu) => {
  if(!menu) return []
  let keys = []
  for(let idx1=0; idx1<menu.length; idx1++)
      if('menu' in menu[idx1])
          for(let idx2=0; idx2<menu[idx1].menu.length; idx2++)
              keys.push({'idx1': idx1, 'idx2': idx2})
      else
          keys.push({'idx1': idx1, 'idx2': null})
  return keys
}


const find = (idxs, idx1, idx2) => idxs.findIndex( e => (e.idx1===idx1 && e.idx2===idx2) )


// class SideNav extends Component {
//   constructor(props) {
//       super(props)
//       this.state = {
//           idx: 0,
//           idx1: 0,
//           idx2: null,
//           selectedLabel1: this.props.config ? this.props.config[0].label : null,
//           selectedLabel2: null,
//       }
//       this.onClick1 = this.onClick1.bind(this)
//       this.onClick2 = this.onClick2.bind(this)
//       this.nav = this.nav.bind(this)
//       this.menu = this.props.config
//       this.idxs = build_idxs(this.props.config)
//   }

//   componentDidMount() {
//       //this.setState({idx1: 0, idx2: 0, selectedLabel1: this.menu[0].label, selectedLabel2: this.menu[0].menu[0].label})
//       //this.props.onAction(this.menu[0].menu[0])
//   }

//   nav_firt() {
//       let label1 = this.menu[0].label
//       let label2 = this.menu[0].menu[0].label
//       this.setState({idx1: 0, idx2: 0, selectedLabel1: label1, selectedLabel2: label2})
//       this.props.onAction(this.menu[0].menu[0])
//   }

//   nav(id) {
//       let label1, label2
//       let idx = find(this.idxs, this.state.idx1, this.state.idx2)
//       if(id===0)
//           idx = idx > 0 ? idx-1 : this.idxs.length-1
//       if(id===1)
//           idx = idx < this.idxs.length-1 ? idx+1 : 0
//       let idx1 = this.idxs[idx].idx1
//       let idx2 = this.idxs[idx].idx2
//       label1 = this.menu[idx1].label
//       if(idx2==null) {
//           this.setState({idx1: idx1, idx2: null, selectedLabel1: label1, selectedLabel2: null})
//           this.props.onAction(this.menu[idx1])
//       } else {
//           label2 = this.menu[idx1].menu[idx2].label
//           this.setState({idx1: idx1, idx2: idx2, selectedLabel1: label1, selectedLabel2: label2})
//           this.props.onAction(this.menu[idx1].menu[idx2])
//       }
//   }

//   onClick1(label) {
//       const idx1 = this.menu.findIndex(e => e.label===label)
//       this.setState({ idx1: idx1, idx2: null, selectedLabel1: label })
//       if('menu' in this.menu[idx1]) {
//           this.setState({idx1: idx1, selectedLabel2: null})
//           this.props.onAction(null)
//           return
//       }
//       this.props.onAction(this.menu[idx1])
//   }

//   onClick2(label) {
//       const idx2 = this.menu[this.state.idx1].menu.findIndex(e => e.label===label)
//       this.setState({ idx2: idx2, selectedLabel2: label })
//       this.props.onAction(this.menu[this.state.idx1].menu[idx2])
//   }

//   render_col1() {
//       if(!this.props.config) return null
//       let className
//       return(
//           this.props.config.map((e) => {
//               className = e.label===this.state.selectedLabel1 ? className='selected' : ''
//               return(<li className={className} onClick={_ => this.onClick1(e.label)}>{e.label}</li>)
//           })
//       )
//   }

//   render_col2() {
//       if(!this.props.config) return null
//       let className
//       const idx1 = this.state.idx1
//       if(idx1==null || !('menu' in this.props.config[idx1]))
//           return undefined
//       return(
//           this.props.config[idx1].menu.map((e) => {
//               className = e.label===this.state.selectedLabel2 ? className='selected' : ''
//               return(<li className={className} onClick={_ => this.onClick2(e.label)}>{e.label}</li>)
//       })
//       )
//   }

//   render() {
//       return (
//           <Section cls="SideNav" size={`W200 H100`}>
//               <h2>{this.props.title}</h2>
//               <ol className="Col1">
//                   {this.render_col1()}
//               </ol>
//               <ol className="Col2">
//                   {this.render_col2()}
//               </ol>
//           </Section>
//       )
//   }
// }

// export default SideNav
