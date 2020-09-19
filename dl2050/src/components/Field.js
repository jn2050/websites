import React, { Component } from 'react'
import Select from './Select'
import Icon from './Icon'
import './Field.css'
import {TYPES, BACKSPACE, ENTER} from '../js/field'

// data-type="currency"

/*
    <Field
        inner
        type=<type>  // TEXT, EMAIL, PASSWD, PASSWD2, CC, CCDATE, CCCVC, ENUM, SET, REF, DT, D, T, N, N1, N2, N3, N4, NK, NB, NS, P, P1, P2, P3, P4, NC, NC2, NC3, NC4
        size=<size>  // size in chars
        mode=<mode> // mode: "edit", "display", "editable"
        value=""
        match={match}
        placeholder="retype password"
        label=<label>
        labeltop labelbottom labelleft
        onChange={<func>}
        onDone={<func>}
    />
*/


class Field extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editable: false,
            edit: true,
            value: null,
            value0: null,
            fvalue: null,
            check: false,
            done: true
        }
    }

    componentDidMount() {
        this.parseProps()
        this.setState({check: this.check(this.state.value)})
    }

    componentDidUpdate() {
    }

    parseProps() {
        this.type = this.props.type || 'text'
        let type_props = this.type in TYPES ? TYPES[this.type] : {}
        this.inputtype = 'inputtype' in type_props ? type_props.inputtype : 'text'
        this.check_c = 'check_c' in type_props ? type_props.check_c : e=>e
        this.check_f = 'check_f' in type_props ? type_props.check_f : e=>e
        this.frmt_f = 'frmt_f' in type_props ? type_props.frmt_f : e=>e
        this.placeholder = 'placeholder' in type_props ? type_props.placeholder : ''
        this.maxlen = 'maxlen' in type_props ? type_props.maxlen : ''
        this.error_msg = 'error_msg' in type_props ? type_props.error_msg : 'Invalid field value'
        let edit = (this.props.mode==='display' || this.props.mode==='editable' ) ? false : true
        let editable = this.props.mode==='editable' ? true : false
        let value = this.props.value || '', fvalue = ''
        if(value && typeof(value)==='string' && this.inputtype==='number')
            value = Number(value.replace(/[^0-9,-]+/g,"").replace(',','.'))
        fvalue = this.frmt_f ? this.frmt_f(value) : value
        this.setState({
            editable: editable,
            value: value,
            fvalue: fvalue,
            edit: edit,
        })
    }

    onFocus = (e) => {
        this.setState({error: false})
    }

    onKeyDown = (e) => {
        let c = e.keyCode <=96 ? e.keyCode : e.keyCode-(48* Math.floor(e.keyCode/48))
        if(c===BACKSPACE) return
        if(c===ENTER) {
            e.preventDefault()
            e.stopPropagation()
            if(this.state.editable) this.onOk()
            this.onBlur(e)
            return
        }
        if(!this.check_c(c, this.state.value)) {
            e.preventDefault()
            return
        }
    }

    onChange = (e) => {
        const id = this.props.id || this.type
        const value = e.target.value
        const fvalue = this.frmt_f(value)
        this.setState({value: value, fvalue: fvalue, error: false, check: this.check(value)})
        if(this.props.onChange) setTimeout(() => this.props.onChange(id, value), 0)
    }

    onBlur = (e) => {
        if(this.state.editable && this.state.edit) {
            setTimeout(this.onTimeOutCancel, 5000)
            this.setState({timeout: true})
        }
        if(this.state.check)
            this.setState({done: true})
        else
            if(this.state.value && this.state.value.length)
                this.setState({error: true})
        if(this.props.onChange) this.props.onChange(this)
    }

    onFocus = (e) => this.setState({timeout: false})

    check = (v) => {
        if(!v) return false
        if(!('check_f' in TYPES[this.type])) return true
        return TYPES[this.type].check_f(v, this.props)
    }

    onEdit = () => {
        let value0 = this.state.value
        this.setState({edit: true, value0: value0}, ()=>this.refs.input.focus())
    }
    onOk = () => this.setState({edit: false})
    onCancel = () => {
        let value0 = this.state.value0
        let fvalue0 = this.frmt_f(value0)
        this.setState({edit: false, value: value0, fvalue: fvalue0, value0: null})
    }
    onTimeOutCancel = () => {
        if(this.state.editable && this.state.edit && this.state.timeout) this.onCancel()
    }

    clear = () => this.setState({value: ''})
    set = (v) => this.setState({value: v})
    focus = () => {
        if(this.refs.input) this.refs.input.focus()
    }

    render() {
        if(!this.type) return null
        const { editable, edit, value, fvalue, check, error } = this.state
        const select = this.type==='enum'
        const options = this.props.options
        let label = this.props.label
        let label_pos = 'NoLabel'
        if(label) {
            label_pos = 'LabelLeft'
            if('labeltop' in this.props) label_pos='LabelTop'
            if('labelbottom' in this.props) label_pos='LabelBottom'
        }
        let placeholder = this.props.placeholder || this.placeholder
        let cls = `Field ${this.props.row?"Row":""} ${this.props.compact?"Compact":""} ${label_pos} ${this.type} ${check?"Check":""}`
        return (
            <div className={cls}>
                {label && <p className="Label">{`${label}`}</p>}
                {edit && !select &&
                    <input
                        ref="input"
                        type={this.inputtype}
                        placeholder={placeholder}
                        value={value}
                        maxLength={this.maxlen}
                        onKeyDown={this.onKeyDown}
                        onChange={this.onChange}
                        onBlur={this.onBlur}
                        onFocus={this.onFocus}
                    />
                }
                {!edit && <span className="Value">{fvalue}</span>}
                {!edit && editable && <Icon icon="edit" size={12} onClick={this.onEdit}/>}
                {edit && editable && <Icon icon="ok" size={14} onClick={this.onOk}/>}
                {edit && editable && <Icon icon="cancel" size={14} onClick={this.onCancel}/>}
                {edit && !select && error ? <span className="FieldErrorMsg">{this.error_msg}</span> : null}
                {edit && select && <Select compact dropdown options={options}/>}
            </div>
        )
    }
}

Field.defaultProps = {
    type: 'text'
  }

export default Field
