import React, { Component } from 'react'
import Section from './Section'
import './Form.css'


class Form extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {}

    render() {
        return (
            <Section White cls="Form">
                {this.props.children}
            </Section>
        )
    }
}

export default Form
