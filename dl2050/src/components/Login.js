import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Section from './Section'
import Form from './Form'
import Field from './Field'
import Button from './Button'
import Logo from './Logo'
import { request } from '../js/web'
import './Login.css'

// https://www.starlette.io/authentication/
// https://github.com/amitripshtos/starlette-jwt
// https://levelup.gitconnected.com/using-jwt-in-your-react-redux-app-for-authorization-d31be51a50d2


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mode: 'login',
            message: "",
            email: null,
            password: null,
            password1: '',
            password2: '',
            ukey: null,
            canSubmit: false,
            error: false,
            errorMsg: null,
        }
    }

    componentDidMount() {
        this.check_path()
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.mode === this.state.mode) return
        if(this.state.mode==='register') return
        if(this.state.mode==='message') return
        if(this.state.mode==='logout') return
        switch(this.state.mode) {
            case 'login': if(this.refs.email) this.refs.email.focus(); break
            // case 'set_password': if(this.refs.password1) this.refs.password1.refs.input.focus(); break;
            // case 'change_password': if(this.refs.password) this.refs.password.refs.input.focus(); break;
            default: break;
        }
        this.check_path()
    }

    check_path = () => {
        const url = new URL(window.location.href)
        const query = new URLSearchParams(window.location.search)
        const ukey = query.get('ukey')
        switch(url.pathname) {
            //case '/login': this.setState({mode: 'login'}); break
            case '/login/set_passwd': console.log('IN'); this.setState({mode: 'set_password', ukey: ukey}); break
            case '/login/change_passwd': this.setState({mode: 'change_password'}); break
            case '/login/logout': this.setState({mode: 'logout'}); break
            default: break
        }
    }

    change_mode = (mode) => {
        this.setState({
            mode: mode, message: '',
            email: null, password: null, password1: '', password2: '', ukey: null,
            canSubmit: false, error: false,})
        if(this.refs.email) this.refs.email.clear()
        if(this.refs.password) this.refs.password.clear()
        if(this.refs.password1) this.refs.password1.clear()
        if(this.refs.password2) this.refs.password2.clear()
    }

    message = (title, text, action_text, next_mode, is_error) => {
        const message = {title: title, text: text, action_text: action_text, next_mode: next_mode, is_error: is_error}
        this.setState({mode: 'message', message: message})
        if(this.refs.button1) this.refs.button1.refs.button.focus()
    }

    okMessage = () => {
        const next_mode = (this.state.message && this.state.message.next_mode) ? this.state.message.next_mode : 'redirect'
        this.change_mode(next_mode)
    }

    onFieldChange = (id, v) => {
        if(id==='password1') this.setState({match: v})
        this.setState({canSubmit: this.checkCanSubmit()})
    }

    onFieldDone = (e) => {
        if(this.state.mode=='login' && e.props.type==='email') {
            this.checkUser()
            this.refs.password.refs.input.focus()
        }
        if(!this.checkCanSubmit()) return
        if(e.props.type==='password1') {
            this.setState({match: this.refs.password1.state.value})
            this.refs.password2.refs.input.focus()
        }
        if(e.props.type==='password' || e.props.type==='password2' || (this.state.mode=='register' && e.props.type==='email') || e.props.type==='key')
            this.refs.button1.refs.button.focus()
        if(this.state.mode=='change_password') {
            if(e.props.type==='password') this.refs.password1.refs.input.focus()
            if(e.props.type==='password1') this.refs.password2.refs.input.focus()
            if(e.props.type==='password2') this.refs.button1.refs.button.focus()
        }
    }

    clearError = (e) => {
        this.setState({error: false, canSubmit: this.checkCanSubmit()})
    }

    checkCanSubmit = () => {
        const mode = this.state.mode
        if(mode==='' || mode==='login')
            if(this.refs.email.state.check && this.refs.password.state.check) return true
        if(mode==='register')
            if(this.refs.email.state.check) return true
        if(mode==='set_password')
            if(this.refs.password1.state.check && this.refs.password2.state.check) return true
        if(mode==='change_password')
            if(this.refs.password.state.check && this.refs.password1.state.check && this.refs.password2.state.check) return true
        return false
    }

    checkUser = () => {
        if(!this.refs.email.state.check) return false
        request(
            '/api/auth/check_user', 'POST',
            {'email': this.refs.email.state.value},
            res => {
                if(res.status==='OK') {
                    if(res.result.user_status==='NOT_REGISTERED')
                        this.message('User not registered', '', 'Retry', 'login', true)
                    if(res.result.user_status==='SUSPENDED')
                        this.message('User suspended', '', 'Exit', 'redirect', true)
                    if(res.result.user_status==='WAIT_SET_PASSWD')
                        this.message('Password not set', 'Check your inbox', 'Set Password', 'set_password', true)
                }
                else {
                    console.log(res.error_msg)
                    this.message('Authentication service error', 'Retry', 'set_password', true)
                }
            },
            (error) => {
                console.log(error)
                this.message('Login', 'Authentication service error', 'Retry', 'login', true)
            })
    }

    register = () => {
        if(!this.state.canSubmit) return false
        this.message('Processing', 'Connecting to authentication service', null,  null, false)
        localStorage.removeItem('jwt_token')
        request(
            '/api/auth/register', 'POST',
            {'email': this.refs.email.state.value},
            res => {
                if(res.status==='OK') {
                    if(res.result.user_status==='WAIT_SET_PASSWD')
                        this.message('Check your email', 'Follow the link on the email to set the password', 'OK', 'set_password', null)
                    if(res.result.user_status==='ALREADY_REGISTERED')
                        this.message('User already registered', '', 'Login', 'login', true)
                    if(res.result.user_status==='SERVICE_ERROR')
                        this.message('Authentication service error', '', 'Retry', 'register', true)
                }
                else {
                    console.log(res.error_msg)
                    this.message('Authentication service error', '', 'Retry', 'register', true)
                }
            },
            (error) => {
                console.log(error)
                this.message('Authentication service error', '', 'Retry', 'register', true)
            })
    }

    set_password = () => {
        if(!this.state.canSubmit) return false
        this.message('Processing', 'Connecting to authentication service', null,  null, false)
        localStorage.removeItem('jwt_token')
        request(
            '/api/auth/set_password', 'POST',
            {
                'ukey': this.state.ukey || this.refs.ukey.state.value,
                'passwd': this.refs.password1.state.value
            },
            res => {
                if(res.status==='OK') {
                    if(res.result.user_status==='AUTHORIZED') {
                        localStorage.setItem('jwt_token', res.result.jwt_token)
                        if(this.props.onAuth) this.props.onAuth(true)
                        this.setState({mode: 'redirect'})
                        //this.message('Password set', 'Your account is active', 'OK', 'redirect', false)
                    }
                    if(res.result.user_status==='KEY_ERROR')
                        this.message('Invalid activation key', '', 'Retry', 'set_password', true)
                    if(res.result.user_status==='KEY_EXPIRED')
                        this.message('Activation key expired', 'Check you inbox for new key', 'OK', 'set_password', true)
                    if(res.result.user_status==='SERVICE_ERROR')
                        this.message('Authentication service error', '', 'Retry', 'register', true)
                }
                else {
                    console.log(res.error_msg)
                    this.message('Authentication service error', 'Retry', 'set_password', true)
                }
            },
            (error) => {
                console.log(error)
                this.message('Authentication service error', '', 'Retry', 'set_password', true)
            })
    }

    login = () => {
        if(!this.state.canSubmit) return false
        this.setState({ mode: 'processing' })
        request(
            '/api/auth/login', 'POST',
            {
                'email': this.refs.email.state.value,
                'passwd': this.refs.password.state.value
            },
            res => {
                if(res.status==='OK') {
                    if(res.result.user_status==='AUTHORIZED') {
                        localStorage.setItem('jwt_token', res.result.jwt_token)
                        if(this.props.onAuth) this.props.onAuth(true)
                        this.setState({mode: 'redirect'})
                    }
                    if(res.result.user_status==='NOT_REGISTERED')
                        this.message('User not registered', '', 'Retry', 'login', true)
                    if(res.result.user_status==='WAIT_SET_PASSWD')
                        this.message('Password not set', 'Check your inbox', 'Set Password', 'set_password', true)
                    if(res.result.user_status==='SUSPENDED')
                        this.message('User suspended', '', 'Exit', 'redirect', true)
                    if(res.result.user_status==='WRONG_PASSWD')
                        this.message('Incorrect password', '', 'Retry', 'login', true)
                }
                else {
                    console.log(res.error_msg)
                    this.message('Authentication service error', '', 'Retry', 'login', true)
                }
            },
            (error) => {
                console.log(error)
                this.message('Authentication service error', '', 'Retry', 'login', true)
            })
    }

    change_password = () => {
        if(!this.state.canSubmit) return false
        this.setState({ mode: 'processing' })
        request(
            '/api/auth/change_passwd', 'POST',
            {
                'passwd': this.refs.password.state.value,
                'new_passwd': this.refs.password1.state.value
            },
            res => {
                if(res.status==='OK') {
                    if(res.result.user_status==='PASSWORD_CHANGED')
                        this.message('Password changed', '', 'OK', 'redirect', false)
                    if(res.result.user_status==='NOT_AUTHENTICATED')
                        this.message('Not authenticated', '', 'Login', 'login', true)
                    if(res.result.user_status==='WRONG_PASSWD')
                        this.message('Incorrect password', '', 'Retry', 'change_password', true)
                }
                else {
                    console.log(res.error_msg)
                    this.message('Authentication service error', '', 'Retry', 'change_password', true)
                }
            },
            (error) => {
                console.log(error)
                this.message('Authentication service error', '', 'Retry', 'change_password', true)
            })
    }

    logOut = () => {
        localStorage.removeItem('jwt_token')
        if(this.props.onAuth) this.props.onAuth(false)
        this.setState({mode: 'redirect'})
    }

    cancel = () => this.setState({mode: 'redirect'})


    render_mode() {
        let { mode, canSubmit, error, match, ukey } = this.state
        const button_type = canSubmit ? "action" : "inactive"
        const cls_err = (this.state.message && this.state.message.is_error) ? "Err" : ""

        switch(mode) {
            case 'register': return <>
                <Form>
                    <Field row ref="email" type="email" onChange={this.onFieldChange} onDone={this.onFieldDone}/>
                </Form>
                {!error && <Button ref="button1" type={button_type} L text="Register" onClick={this.register}/>}
                {!error && <p className="Link1" onClick={()=>this.change_mode('login')}>Already a user? Login</p>}
            </>
            case 'set_password': return <>
                <Form>
                    {!ukey && <Field row ref="ukey" type="text" ro={ukey} placeholder="key"/>}
                    <Field row ref="password1" type="password1" placeholder="password" onChange={this.onFieldChange} onDone={this.onFieldDone}/>
                    <Field row ref="password2" type="password2" placeholder="retype password" match={match} onChange={this.onFieldChange} onDone={this.onFieldDone} />
                </Form>
                {!error && <Button ref="button1" type={button_type} L text="Set password" onClick={this.set_password}/>}
            </>
            case 'login': return <>
                <Form>
                    <Field row ref="email" id={0} type="email" onChange={this.onFieldChange} default={this.state.email} onDone={this.onFieldDone}/>
                    <Field row ref="password" id={1} type="password" onChange={this.onFieldChange} onDone={this.onFieldDone} />
                </Form>
                {!error && <Button ref="button1" type={button_type} L text="Login" onClick={this.login}/>}
                {!error && <p className="Link1" onClick={()=>this.change_mode('register')}>Not a user? Register</p>}
                {!error && <p className="Link2" onClick={()=>this.setState({mode: 'recover_password'})}>Recover password</p>}
            </>
            case 'change_password': return <>
                <Form>
                    <Field row ref="password" type="password" placeholder="current password" onChange={this.onFieldChange} onDone={this.onFieldDone} />
                    <Field row ref="password1" type="password1" placeholder="new password" onChange={this.onFieldChange} onDone={this.onFieldDone} />
                    <Field row ref="password2" type="password2" placeholder="retype password" match={match} onChange={this.onFieldChange} onDone={this.onFieldDone} />
                </Form>
                {!error && <Button ref="button1" type={button_type} L text="Change password" onClick={this.change_password}/>}
                {!error && <p className="Link1 Cancel" onClick={this.cancel}>Cancel</p>}
            </>
            case 'logout': return <>
                <div className="MessageBox">
                </div>
                {!error && <Button ref="button1" action L text="Logout" onClick={this.logOut}/>}
                {!error && <p className="Link1 Cancel" onClick={this.cancel}>Cancel</p>}
            </>
            case 'message': return <>
                <div className="MessageBox">
                    <h2  className={cls_err}>{this.state.message.title}</h2>
                    <p className={cls_err}>{this.state.message.text}</p>
                </div>
                {this.state.message.action_text && <Button ref="button1" action L text={this.state.message.action_text} onClick={this.okMessage}/>}
            </>
            default: return null
        }
    }


    render() {
        if(this.state.mode==='redirect') return(<Redirect to={`/`}/>)
        return(
            <Section Page CenterH>
                <Section White cls="Login" onClick={this.clearError}>
                    <div className="LogoContainer"><Logo/></div>
                    {this.render_mode()}
                </Section>
            </Section>
        )
    }
}

export default Login
