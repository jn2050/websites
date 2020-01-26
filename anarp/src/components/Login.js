import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Section from './Section'
import Field from './Field'
import { auth } from '../js/auth'
import './Login.css'


// https://levelup.gitconnected.com/using-jwt-in-your-react-redux-app-for-authorization-d31be51a50d2
// https://www.starlette.io/authentication/
// https://github.com/amitripshtos/starlette-jwt


class Login extends Component {
    constructor(props) {
        super(props)
        // states:
        //      'login', 'activate', 'set_password', 'recover_password', 'change_password', 'logout',
        //      'processing', 'error', 'redirect'
        this.state = {
            mode: null,
            email: '',
            password: '',
            password1: '',
            password2: '',
            activation_key: null,
            canSubmit: false,
            error: false,
            message: '',
            errorMsg: null,
        }
    }

    componentDidMount() {
        if(!navigator.onLine) {
            this.setState({ error: true, errorMsg: 'No internet connection', mode: 'error' })
            return
        }
        const url = new URL(window.location.href)
        const query = new URLSearchParams(window.location.search)
        const activation_key = query.get('activation_key')

        switch(url.pathname) {
            case '/login/set_password':
                this.setState({mode: 'set_password', activation_key: activation_key})
                break
            case '/login/recover_password':
                this.setState({mode: 'recover_password', activation_key: activation_key})
                break
            case '/login/change_password':
                this.setState({mode: 'change_password'})
                break
            case '/login/logout':
                this.setState({mode: 'logout'})
                break
            default:
                this.setState({mode: 'login'})
                break
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.mode === this.state.mode)
            return
        switch(this.state.mode) {
            case 'login':
                this.refs.email.refs.input.focus()
                this.refs.email.set(this.state.email)
                break
            case 'set_password':
            case 'recover_password':
                this.refs.password1.refs.input.focus()
                break
            case 'change_password':
                this.refs.password.refs.input.focus()
                break
            default:
                break
        }
    }

    onFieldChange = (n) => {
        switch(n) {
            case 0: this.setState({email: this.refs.email.state.content}); break
        }
        this.checkCanSubmit()
    }

    onFieldDone = (e) => {
        if(e.props.type==='email') {
            this.checkUser()
            this.refs.password.refs.input.focus()
        }
        if(e.props.type==='password1') {
            this.setState({match: this.refs.password1.state.content})
            this.refs.password2.refs.input.focus()
        }
    }

    clearError = (e) => {
        this.setState({error: false})
        this.checkCanSubmit()
    }

    checkCanSubmit = () => {
        let canSubmit = false
        switch(this.state.mode) {
            case '':
            case 'login':
                if(this.refs.email.state.check && this.refs.password.state.check)
                    canSubmit = true
                break
            case 'set_password':
            case 'recover_password':
                if(this.refs.password1.state.check && this.refs.password2.state.check)
                    canSubmit = true
                break
            case 'change_password':
                if(this.refs.password.state.check && this.refs.password1 && this.refs.password1.state.check 
                        && this.refs.password2 && this.refs.password2.state.check)
                    canSubmit = true
                break
        }
        this.setState({canSubmit: canSubmit})
    }

    checkUser = () => {
        console.log('checkUser')
        if(!this.refs.email.state.check)
            return
        const email = this.refs.email.state.content
        auth.checkUser(email)
            .then(
                res => {
                    if(res.result.user_status==='NOT_AUTHORIZED')
                        this.setState({mode: 'error', error: true, errorMsg: 'User not authorized'})
                    if(res.result.user_status==='WAITING_SET_PASSWORD')
                        this.setState({mode: 'activate'})
                    if(res.result.user_status==='SET_PASSWORD')
                        this.setState({mode: 'activate'})
                    if(res.result.user_status==='RECOVER_PASSWORD')
                        this.setState({mode: 'recover_password'})
                })
                .catch(() => this.setState({mode: 'error', error: true, errorMsg: 'Unable to access authentication server'}))
    }

    login = () => {
        if(!this.state.canSubmit)
            return false
        this.setState({ mode: 'processing' })
        const email = this.refs.email.state.content
        const password = this.refs.password.state.content
        auth.login(email, password)
            .then(
                res => {
                    if(res.status==='OK') {
                        if(res.result.user_status==='AUTHORIZED') {
                            localStorage.setItem('jwt_token', res.result.jwt_token)
                            if(this.props.onAuth)
                                this.props.onAuth(true)
                            this.setState({mode: 'redirect'})
                        }
                        else
                            this.setState({mode: 'error', error: true, errorMsg: 'Incorrect password'})
                    }
                    else
                        this.setState({mode: 'error', error: true, errorMsg: res.error_msg})
                })
            .catch(() => this.setState({mode: 'error', error: true, errorMsg: 'Unable to access authentication server'}))
    }

    set_password = () => {
        if(!this.state.canSubmit)
            return false
        this.setState({ mode: 'processing' })
        auth.set_password(this.refs.password1.state.content, this.state.activation_key)
            .then(
                res => {
                    if(res.status==='OK') {
                        if(res.result.user_status==='AUTHORIZED') {
                            localStorage.setItem('jwt_token', res.result.jwt_token)
                            if(this.props.onAuth)
                                this.props.onAuth(true)
                            window.location.href = '/'
                            //this.setState({mode: 'redirect'})
                        }
                        else
                            this.setState({mode: 'error', error: true, errorMsg: res.error_msg})
                    }
                    else
                        this.setState({mode: 'error', error: true, errorMsg: res.error_msg})
                })
            .catch(() => this.setState({mode: 'error', error: true, errorMsg: 'Unable to access authentication server'}))
    }

    change_password = () => {
        if(!this.state.canSubmit)
            return false
        this.setState({ mode: 'processing' })
        auth.change_password(this.state.email, this.refs.password.state.content, this.refs.password1.state.content)
            .then(
                res => {
                    if(res.status==='OK') {
                        if(res.result.user_status==='OK')
                            this.setState({mode: 'message', message: 'Password changed'})
                        else {
                            this.setState({mode: 'error', error: true, errorMsg: 'Password incorrect'})
                        }
                    }
                    else
                        this.setState({mode: 'error', error: true, errorMsg: res.error_msg})
                })
            .catch(() => this.setState({mode: 'error', error: true, errorMsg: 'Unable to access authentication server'}))
    }

    logOut = () => {
        localStorage.removeItem('jwt_token')
        if(this.props.onAuth)
            this.props.onAuth(false)
        window.location.href = '/'
        //this.setState({mode: 'redirect'})
    }

    ok = () => this.setState({mode: 'redirect', message: ''})
    cancel = () => this.setState({mode: 'redirect'})
    retry = () => {
        if(!navigator.onLine) {
            this.setState({ error: true, errorMsg: 'No internet connection', mode: 'error' })
            return
        }
        this.setState({mode: 'login', error: false, errrorMsg: '', message: ''})
    }


    render() {
        const { mode, canSubmit, error, message, errorMsg, match } = this.state
        const buttonClass = (canSubmit ? '' : 'Disabled')
        let title
        switch(mode) {
            case 'login': title = 'Login'; break
            case 'activate': title = 'Account Activation'; break
            case 'set_password': title = 'Set new password'; break
            case 'change_password': title = 'Change password'; break
            case 'recover_password':
            case 'rrecover_password_req': title = 'Recover password'; break
            case 'processing': title = 'Processing'; break
            case 'error': title = ''; break
            case 'logout': title = 'Logout'; break
            default: title = ''
        }
        switch(mode) {
            case 'login': return (
                <Section page center>
                    <div className="Login" onClick={this.clearError}>
                        <h2>{title}</h2>
                        <Field ref="email" id={0} type="email" label="Email"
                            onFieldChange={this.onFieldChange} onDone={this.onFieldDone} default={this.state.email}/>
                        <Field ref="password" id={1} type="password" label="Password"
                            onFieldChange={this.onFieldChange} onDone={this.onFieldDone} />
                        {!error && <span className="Recover"
                            onClick={()=>this.setState({mode: 'recover_password'})}>Recover password</span>}
                        {error ?
                            <span className="ErrorMsg" onClick={this.clearError}>{errorMsg}</span> :
                            <button onClick={this.login} className={buttonClass}>Login</button>}
                    </div>
                </Section>)
            case 'activate': return (
                <Section page center>
                    <div className="Login">
                        <h2>{title}</h2>
                        {!error && <div className="MainMsg"><p>Follow link in email sent to your inbox</p></div>}
                        {error && <div className="ErrorMsg"><p>Email not in authorization list</p></div>}
                    </div>
                </Section>)
            case 'set_password':
            case 'recover_password': return (
                <Section page center>
                    <div className="Login" onClick={this.clearError}>
                        <h2>{title}</h2>
                        <Field ref="password1" id={2} type="password1" label="New password"
                            onFieldChange={this.onFieldChange} onDone={this.onFieldDone} />
                        <Field ref="password2" id={3} type="password2" label="Retype new password"
                            match={match} onFieldChange={this.onFieldChange} onDone={this.onFieldDone} />
                        {error ?
                            <span className="ErrorMsg" onClick={this.clearError}>{errorMsg}</span> :
                            <button onClick={this.set_password} className={buttonClass}>Set</button>}
                    </div>
                </Section>)
            case 'change_password': return (
                <Section page center>
                    <div className="Login" onClick={this.clearError}>
                        <h2>{title}</h2>
                        <Field ref="password" id={4} type="password" label="Current password"
                            onFieldChange={this.onFieldChange} onDone={this.onFieldDone} />
                        <Field ref="password1" id={5} type="password1" label="New password"
                            onFieldChange={this.onFieldChange} onDone={this.onFieldDone} />
                        <Field ref="password2" id={6} type="password2" label="Retype new password"
                            match={match} onFieldChange={this.onFieldChange} onDone={this.onFieldDone} />
                        {error ?
                            <span className="ErrorMsg" onClick={this.clearError}>{errorMsg}</span> :
                            <button onClick={this.change_password} className={buttonClass}>Change</button>}
                    </div>
                </Section>)
            case 'logout': return (
                <Section page center>
                    <div className="Login">
                        <h2>{title}</h2>
                        <div className="MainMsg">Click to logout</div>
                        <button className="OK" onClick={this.logOut}>Logout</button>
                        <button onClick={this.cancel}>Cancel</button>
                    </div>
                </Section>)
            case 'processing': return (
                <Section page center>
                    <div className="Login">
                        <h2>{title}</h2>
                        <div className="MainMsg">Connecting to authentication service</div>
                    </div>
                </Section>)
            case 'message': return (
                <Section page center>
                    <div className="Login">
                        <h2>{title}</h2>
                        <span className="MainMsg">{message}</span>
                        <button onClick={this.ok}>OK</button>
                    </div>
                </Section>)
            case 'error': return (
                <Section page center>
                    <div className="Login">
                        <h2>{title}</h2>
                        <span className="ErrorMsg" onClick={this.clearError}>{errorMsg}</span>
                        <button onClick={this.retry}>RETRY</button>
                    </div>
                </Section>)
            case 'redirect': return (
                <Redirect to={`/`}/>
            )
            default: return null
        }
    }
}

export default Login
