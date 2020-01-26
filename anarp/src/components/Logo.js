import React, { Component } from 'react'
import './Logo.css'


class Footer extends Component {
    render() {
        return(
            <div>
                <a href="/" style={{ textDecoration: 'none' }}>
                    {this.props.img &&
                        <img src={this.props.img} alt="Logo"/>
                    }
                    {!this.props.img &&
                        <div>
                            <span className="Title">{this.props.title}</span>
                            <span className="SubTitle">{this.props.subtitle}</span>
                        </div>
                    }
                </a>
            </div>
        )
    }
}

export default Footer
