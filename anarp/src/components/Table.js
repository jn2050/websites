import React, { Component } from 'react'
import Spin from './Spin'
import './Table.css'
import {formater} from '../js/util.js'


const parse = (props) => {
    if(props.data==null || props.data.length===0 || props.options==null)
        return null
    let headers = props.options
    let rows = []
    props.data.forEach(row => {
        let row2 = {}
        headers.map( (e) => {
            let v
            if(e.calc!=null)
                v = e.calc(row)
            else
                v = row[e.field]
            row2[e.field] = parse_field(v, e)
        })
        rows.push(row2)
    })
    return {
        headers: headers,
        rows: rows
    }
}


const parse_field = (v, defs) => {
    return formater(defs.format)(v)
}

const get_el = (e, defs) => {
    if(defs.format!=='L')
        return <span>{e}</span>
    if(e==null)
        return <span></span>
    return <span class="Label" style={{background: defs.labels[e][1]}}>{defs.labels[e][0]}</span>
}


class Table extends Component {
    constructor(props) {
        super(props)
        let data = parse(this.props)
        this.state = {
            data: data,
            w: '100%'
        }
        this.onClick = this.onClick.bind(this)
    }

    componentDidUpdate(prevProps) {
        let len1 = this.props.data==null ? 0 : this.props.data.legth
        let len2 = prevProps.data==null ? 0 : prevProps.data.legth
        if(this.props.data==null && prevProps.data==null)
            return
        if(len1===len2)
            return
        let data = parse(this.props)
        this.setState({
            data: data,
            w: data ? data.headers.reduce( (a,b) => a + (b['width'] || 0), 0) : 0
        })
    }

    onClick(e, row, field) {
        this.props.onClick(row, field)
    }

    render_row(row, headers, f) {
        return(
            <div className="TRow">
                {headers.map( (el) => {
                    return(
                        <div className={`TData ${el.align}`}
                            style={{width: el.width}}
                            onClick={e => this.onClick(e, row, el.field)} >
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
        return this.state.data.rows.map( (row) => 
            this.render_row(row, this.state.data.headers, (row,e) => get_el(row,e)) )
    }

    render_rows_footer() {
        return this.render_row(this.state.data.headers, this.state.data.headers, (_,e) => '')
    }

    render() {
        if(this.state.data==null)
            return <div className="Table"><Spin msg="Downloading data" /></div>
        let w = this.state.w + 10
        return(
            <div className="Table">
                <div className="TTable" style={{width: w}} >
                    <div className="THeader" style={{width: w}} >
                        {this.render_rows_header()}
                    </div>
                    <div className="TBody" style={{width: w}} >
                        {this.render_rows_body()}
                    </div>
                    <div className="TFooter" style={{width: w}} >
                        {this.render_rows_footer()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Table
