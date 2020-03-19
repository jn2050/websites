import React, { Component } from 'react'
import './Table.css'
import Icon from './Icon'
import {formater} from '../js/util.js'


// https://www.postgresqltutorial.com/postgresql-fetch/


const parse_field = (v, defs) => {
    return formater(defs.format)(v)
}

const parse = (props) => {
    if(!props.meta) return null
    let headers = props.meta
    let rows = []
    props.data.forEach(row => {
        let row2 = {}
        headers.map( (e) => {
            let v = e.calc ? e.calc(row) : row[e.field]
            row2[e.field] = parse_field(v, e)
        })
        rows.push(row2)
    })
    return { headers: headers, rows: rows }
}

const get_el = (e, defs) => {
    if(defs.format!=='L') return <span>{e}</span>
    if(e==null) return <span></span>
    return <span class="Label" style={{background: defs.labels[e]}}>{e}</span>
}


class Table extends Component {
    constructor(props) {
        super(props)
        let data = parse(this.props)
        this.state = {
            data: data,
            w: data ? data.headers.reduce( (a,b) => a + (b['width'] || 0), 0) : 0
        }
        this.onClick = this.onClick.bind(this)
    }

    onClick = (e, row, field) => {if(this.props.onClick) this.props.onClick(row, field)}

    render_row(row, headers, f) {
        return(
            <div className="TRow">
                {headers.map( (el) => {
                    return(
                        <div className={`TData ${el.align}`} style={{width: el.width}} onClick={e=>this.onClick(e,row,el.field)}>
                            {f(row[el.field], el)}
                        </div>
                    )
                })}
            </div>
        )
    }

    render_rows_header() {
        return this.render_row(this.state.data.headers, this.state.data.headers, (row,e) => e.name)
    }

    render_rows_body() {
        return this.state.data.rows.map((row) =>
            this.render_row(row, this.state.data.headers, (row,e)=>get_el(row,e)) )
    }

    render_rows_footer() {
        return this.render_row(this.state.data.headers, this.state.data.headers, (_,e) => '')
    }

    render() {
        console.log(this.state.w)
        if(!this.state.data || !this.state.data.headers.length)
            return  <div className="Table"><Icon size={128} icon="empty"/></div>
        return(
            <div className="Table">
                <div className="TTable" style={{width: this.state.w+8}}>
                    <div className="THeader">
                        {this.render_rows_header()}
                    </div>
                    <div className="TBody">
                        {this.render_rows_body()}
                    </div>
                    <div className="TFooter">
                        {this.render_rows_footer()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Table
