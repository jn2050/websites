import React, { Component } from 'react'
import Icon from './Icon'
import '../App.css'
import './Widget.css'
import { widget_pie, widget_barh } from '../js/d.js'
import { formater } from '../js/util.js'
import { frmt_K } from '../js/field.js'

class Widget extends Component {

    constructor(props) {
        super(props)
    this.state = {
        missed: false,
        ts0: this.props.ts
    }
    if(this.props.timeout!=null)
        setTimeout( () => this.timeOutHandler(), 1000*this.props.timeout)
    }

    componentDidMount(prevProps) {
        if(!this.render_widget)
            return
        this.render_widget()
    }

    componentDidUpdate(prevProps) {
        if(!this.render_widget)
            return
        this.render_widget()
    }

    timeOutHandler = () => {
        if(new Date()/1000-this.state.ts0 > this.props.timeout)
            this.setState({missed: true})
    }

    componentDidUpdate = (prevProps) => {
        if(this.props.timeout==null)
            return
        if(this.props.ts === this.state.ts0)
            return
        this.setState({missed: false, ts0: this.props.ts})
        setTimeout( ()=>this.timeOutHandler(), 1000*this.props.timeout)
    }

    render_title = () => this.props.title ? <span className="Title">{this.props.title}</span> : null

    render_label(l) {
        let label = l || this.props.label || null
        if(!label)
            return null
        return <span className="Label">{label}</span>
    }

    render_value(c, v, f, i, s, l) {
        if(v==null || typeof(v)=='undefined')
            return null
        let format = f || 'S'
        let icon = i || null
        let prefix = format == 'C' ? '€' : null
        let sufix = format == 'P' ? '%' : null
        let value = formater(format)(v)
        let sign = s || false
        let sign_icon = sign ? (v > 0 ? <Icon icon='delta-up' size={16}/> : <Icon icon='delta-down' size={16}/>) : null
        let sign_cls = sign ? (v > 0 ? 'Up' : 'Down') : ''
        value = prefix ? value.substring(1) : value
        value = sufix ? value.substring(0, value.length-1) : value
        return(
            <div className={`${c} ${sign_cls}`}>
                {l && this.render_label(l)}
                {icon && <Icon icon={icon} size={32}/>}
                {sufix && <span className="Sufix">{sufix}</span>}
                <span className="Value">{value}</span>
                {prefix && <span className="Prefix">{prefix}</span>}
                {sign && sign_icon}
            </div>
        )
    }

    renderCompact(cls) {
        return(
            <div className={cls} onClick={this.props.onClick}>
                <div className='LabelRow'>
                    {this.render_label()}
                </div>
                <div className='ValueRow'>
                    {this.render_value('ValueDiv', this.props.value, this.props.format, this.props.icon)}
                </div>
            </div>
        )
    }

    renderList(cls) {
        let data = this.props.data || []
        return(
            <div className={cls} >
                <div className='LabelRow'>
                    {this.render_label()}
                </div>
                {data.map( e =>
                    <div className='ValueRow'>
                        {this.render_value('ValueDiv', e.value, this.props.format, null, null, e.label)}
                    </div>)}
            </div>
        )
    }

    renderPie(cls) {
        this.render_widget = () => widget_pie(this.refs.svg, this.props.data, 1.0)
        return(
            <div className={cls}>
                <div className='LabelRow'>{this.render_title()}</div>
                <div ref="svg" className={`Chart`}></div>
            </div>
        )
    }

    renderBarH(cls) {
        if('data' in this.props)
            this.render_widget = () => widget_barh(this.refs.svg, this.props.data, null)
        else
            this.render_widget = () => widget_barh(this.refs.svg, this.props.data1, this.props.data2)
        return(
            <div className={cls}>
                <div className='LabelRow'>{this.render_label()}</div>
                <div className={`Chart`}><div ref="svg"></div></div>
            </div>
        )
    }

    renderDetail(cls) {
        let icon = this.props.icon ? <Icon icon={this.props.icon} size={32}/> : null
        let data = this.props.data ? this.props.data.reverse() : []
        let data2 = this.props.data2 ? this.props.data2.reverse() : []
        if(this.props.icon==='up') cls += ' Up'
        if(this.props.icon==='down') cls += ' Down'
        return(
            <div className={cls} >
                <div className='LabelRow'>
                    {this.render_label()}
                </div>
                {icon}
                <div className='ValueRow'>
                    {this.render_value('ValueDiv', this.props.value, this.props.format)}
                </div>
                <div className='Details'>
                    {data.map( e =>
                        <div className='ValueRow'>
                            {this.render_value('ValueDiv', e.value, this.props.format, null, null, e.label)}
                        </div>)}
                </div>
                <div className='Details'>
                    {data2.map( e =>
                        <div className='ValueRow'>
                            {this.render_value('ValueDiv', e.value, this.props.format, null, null, e.label)}
                        </div>)}
                </div>
            </div>
        )
    }

    renderPercent(cls) {
        return(
            <div className={cls} >
                <div className='LabelRow'>
                    {this.render_label()}
                </div>
                <div className='ValueRow'>
                    {this.render_value('ValueDiv', this.props.value, this.props.format, this.props.icon)}
                </div>
            </div>
        )
    }

    renderIcon2(cls) {
        let icon1 = this.props.icon1 ? <Icon icon={this.props.icon1} size={32}/> : null
        let icon2 = this.props.icon2 ? <Icon icon={this.props.icon2} size={32}/> : null
        return(
            <div className={cls} >
                <div className='LabelRow'>
                    {this.render_label()}
                </div>
                <div className='ValueRow'>
                    {this.render_value('ValueDiv', this.props.value1, this.props.format, this.props.icon1)}
                </div>
                <div className='ValueRow'>
                    {this.render_value('ValueDiv', this.props.value2, this.props.format, this.props.icon2)}
                </div>
            </div>
        )
    }

    renderLarge(cls) {
        let delta = this.props.delta || null
        let deltap = delta ? this.props.delta/this.props.value : null
        return(
            <div className={cls} >
                <div className='LabelRow'>
                    {this.render_label()}
                </div>
                <div className='ValueRow'>
                    {this.render_value('ValueDiv', this.props.value, this.props.format, this.props.icon)}
                </div>
                <div className="DeltaRow">
                    {this.render_value('DeltaDiv', delta, this.props.format, null, true)}
                    {this.render_value('DeltaPDiv', deltap, 'P2', null, true)}
                </div>
            </div>
        )
    }

    renderNumber(cls) {
        let s = frmt_K(this.props.value)
        let s1=s, s2='', s3='', s4=''
        let k = s.indexOf(".")
        if(k!=-1) {
            s1 = s.substr(0,1)
            s2 = s[1]
            s3 = s[2]
            s4 = s[3]
        }
        console.log(s, s1, s2, s3, s4)
        return(
            <div className={cls} >
                <div className='LabelRow'>
                    {this.render_label()}
                </div>
                <div className='ValueRow'>
                    <span className="Value1">{s1}</span>
                    <span className="Value2">{s2}</span>
                    <span className="Value3">{s3}</span>
                    <span className="Value4">{s4}</span>
                </div>
            </div>
        )
    }

    render() {
        let type = this.props.type || 'Single'
        let cls = `Widget ${type}`
        switch(type) {
            case 'Compact': return this.renderCompact(cls)
            case 'List': return this.renderList(cls)
            case 'Pie': return this.renderPie(cls)
            case 'BarH':
            case 'BarH2': return this.renderBarH(cls)
            case 'Detail': return this.renderDetail(cls)
            case 'Percent': return this.renderPercent(cls)
            case 'Icon2': return this.renderIcon2(cls)
            case 'Large': return this.renderLarge(cls)
            case 'Number':
            default:
                return this.renderNumber(cls)
        }
    }
}

export default Widget


//let cls = this.state.missed ? 'Alert' : ''
// if(this.state.missed)
//     v = '--'