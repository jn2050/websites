import React, { Component } from 'react'
import './Footer.css'
import Section from './components/Section'


class Footer extends Component {
    render() {
        return(
            <Section Footer>
                <Section Page>
                    <div>
                        <p>ANARP 2020</p>
                        <p>Onde estamos</p>
                        <p>Rua Professor Agostinho da Silva 34, 4250-017 Porto, Portugal</p>
                        <p>228 325 741</p>
                        <p>ass.cina@gmail.com</p>
                        <p>Facebook</p>
                    </div>
                    <div className="Copyright">
                        <p>Digital Logic ©2020</p>
                    </div>
                </Section>
            </Section>
        )
    }
}

export default Footer
