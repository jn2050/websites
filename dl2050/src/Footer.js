import React, { Component } from 'react'
import Section from './components/Section'
// import Icon from './components/Icon'
import './Footer.css'


class Footer extends Component {
    render() {
        return(
            <Section Footer>
                <Section Page>
                    {/* <p className="Title">OLAP - OnLine Analytical Processing</p> */}
                    {/* <div className="Address">
                        <h3>Address</h3>
                        <p>Centro Empresarial da Lionesa, Pavilhão C27</p>
                        <p>Rua da Lionesa</p>
                        <p>4465-671 Leça do Balio</p>
                        <p>Porto, Portugal</p>
                    </div>
                    <div className="Contacts">
                        <h3>Contacts</h3>
                        <p>info@dlogic.io</p>
                    </div>
                    <div className="Follow">
                        <h3>Follow Us</h3>
                        <Icon/>
                        <Icon/>
                    </div>
                    <div className="Copyright">
                        <p>Digital Logic ©2020</p>
                    </div> */}
                </Section>
            </Section>
        )
    }
}

export default Footer
