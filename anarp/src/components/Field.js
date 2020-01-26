import React, { Component } from 'react'
import './Field.css'
import { check_email } from '../js/util'


class Field extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: this.props.default,
            check: false,
            error: false,
            done: true
        }
    }

    componentDidMount() {
        this.errorMsg = this.getErrorMsg()
        this.inputType = this.props.type
        if(this.inputType==='password1' || this.inputType==='password2')
            this.inputType='password'
        this.setState({check: this.check(this.state.content)})
    }

    getErrorMsg = () => {
        if(this.props.errorMsg)
            return this.props.errorMsg
        switch(this.props.type) {
            case 'email': return 'Invalid email'
            case 'password':
            case 'password1':
                return 'Minimum 6 characters'
            case 'password2':
                return 'No match'
            default: return 'Invalid value'
        }
    }

    onFocus = (e) => {
        this.setState({error: false})
    }

    onChange = (e) => {
        this.setState({content: e.target.value, error: false})
        this.setState({check: this.check(e.target.value)})
        if(this.props.onFieldChange)
            setTimeout(()=>this.props.onFieldChange(this.props.id),0)
    }

    onBlur = (e) => {
        if(!this.state.content)
            return
        if(this.state.check)
            this.setState({done: true})
        else
            if(this.state.content.length)
                this.setState({error: true})
        if(this.props.onDone)
            this.props.onDone(this)
    }

    onKeyDown = (e) => {
        if(e.key === 'Enter' && this.props.onDone) {
            e.preventDefault()
            e.stopPropagation()
            this.props.onDone(this)
        }
    }

    clear = () => this.setState({content: ''})
    set = (v) => this.setState({content: v})

    check = (v) => {
        if(!v) return false
        switch(this.props.type) {
            case 'email': return check_email(v)
            case 'password':
            case 'password1':
                if(v.length>=6) return true; else return false
            case 'password2':
                if(v===this.props.match) return true; else return false
            default:
                return true
        }
    }

    render() {
        const { errorMsg, inputType } = this
        const { error, content, check } = this.state
        const { label, type } = this.props
        const cls = `Field` + (check ? ' Check'  : '')
        return (
            <div className={cls}>
                <input ref="input" type={inputType} placeholder={label} value={content}
                    onFocus={this.onFocus} onChange={this.onChange} onBlur={this.onBlur} onKeyDown={this.onKeyDown}/>
                {error ? <span className="FieldErrorMsg">{errorMsg}</span> : null}
            </div>
        )
    }
}

export default Field
