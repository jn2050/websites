import React, { Component } from 'react'
import './Table.css'
import Button from './Button'
import Icon from './Icon'
import Tag from './Tag'
import Field from './Field'
import Select from './Select'
import Selector from './Selector'
import {wrequest, request, fetch_url, fetch_headers} from '../js/web'
import {formater} from '../js/util.js'
import Table2 from './Table'


class Table extends Component {
    constructor(props) {
        super(props)
        this.state = {
            meta: null,
            meta_tbl: null,
            data_all: null,
            data: null,
            mode: 'table',
            selected_i: null,
            filters: null,
            cols: null,
            COMPACT: false,
            SHOW_DETAIL: false,
            w: 0,
            expand: false,
            nrows: null,
            page: 0
        }
    }

    componentDidMount() {
        if('compact' in this.props) this.setState({COMPACT: true})
        this.set_meta()
    }

    componentDidUpdate(prevProps, prevState) {
        if(!this.state.meta_tbl && this.props.meta) {
            this.set_meta()
            return
        }
        if(this.props.url && this.props.tbl)
            if(this.props.url==prevProps.url && this.props.tbl==prevProps.tbl && this.props.filters==prevProps.filters) return
        if(this.props.data)
            if(JSON.stringify(this.props.data)===JSON.stringify(prevProps.data)) return
        this.set_meta()
    }

    set_meta = () => {
        if(!this.props.meta) return
        let meta_tbl
        if('tables' in this.props.meta) {
            if(!this.props.tbl) return
            if(!(this.props.tbl in this.props.meta.tables)) return
            meta_tbl = this.props.meta.tables[this.props.tbl].fields
        }
        else {
            meta_tbl = this.props.meta
        }
        this.setState({meta: this.props.meta, meta_tbl: meta_tbl, filters: this.props.filters}, this.get_data)
    }

    async get_data() {
        if(!this.state.meta_tbl) return
        // if(!this.props.url || !this.props.tbl) {
        //     this.setState({data_all: null, data: null, cols: null, w: null})
        //     return
        // }
        const h = document.getElementsByClassName('Table')[0].clientHeight
        const prows = Math.floor((h-200)/30)
        if(this.props.data) {
            let cols = this.props.cols || (this.props.data[0] ? Object.keys(this.props.data[0]) : [])
            let nrows = this.props.data.length
            this.data_update(this.props.data, cols, nrows, prows)
            return
        }
        let res = null
        const page = this.state.nrows===null ? 0 : this.state.page
        const offset = prows*page
        try {
            res = await wrequest(this.props.url, 'POST',
                {
                    tbl: this.props.tbl,
                    cols: this.props.cols || '*',
                    filters: this.state.filters,
                    offset: offset,
                    limit: prows
                }
            )
        }
        catch(err) {
            this.data_error(err)
        }
        if(res)
            this.data_update(res.data, res.cols, res.nrows, prows)
    }

    data_error = (msg) => {
        console.log(msg)
        this.setState({data_all: null, data: null, meta: null, cols: null,})
    }

    data_update = (data, cols, nrows, prows) => {
        const npages = Math.floor(nrows/prows)+1
        let meta_tbl = this.state.meta_tbl
        data = parse(data, cols, meta_tbl)
        let data_all = data ? data.slice() : []
        let w = get_table_w(cols, meta_tbl)
        this.setState({data_all: data_all, data: data, cols: cols, w: w, nrows: nrows, npages: npages })  //
    }

    onFilter = (event, e) => {
        this.setState({data: filter_data(this.state.data_all, e.fld, event.target.value)}) 
    }

    onClick = (e, row, fld) => {if(this.props.onClick) this.props.onClick(row, fld)}

    filter = () => this.setState({filter: !this.state.filter})
    expand = () => this.setState({expand: !this.state.expand})

    select_row = (i) => this.setState({selected_i: this.state.selected_i!=i ? i : null})
    open_record_page = (i) => this.setState({mode: 'record_page', selected_i: i})
    close_record_page = () => this.setState({mode: 'table'})
    open_detail = () =>  this.setState({SHOW_DETAIL: true})
    close_detail = () =>  this.setState({SHOW_DETAIL: false})
    onSetPage = (page) => this.setState({page: page, data: []}, this.get_data)

    render_filter() {
        return (
            <div className="Filter">
                 <div className="TRow">
                 {this.state.cols.map(e=>
                    <div className={`TData ${e.align}`} style={{width: get_field_w(e, this.state.meta)}}>
                        <input type="text" onChange={(event)=>this.onFilter(event,e)}/>
                    </div>
                )}
                 </div>
            </div>
        )
    }

    render_header() {
        let {cols, meta_tbl} = this.state
        return(
            <div className="TRow">
                <div className="Ctrls"/>
                {cols.map((col,i)=>
                    <div key={i} className={`TData ${get_align(col, meta_tbl)}`} style={{width: get_field_w(col, meta_tbl)}}>
                        <span>{get_name(col,meta_tbl)}</span>
                    </div>
                )}
            </div>
        )
    }

    render_rows() {
        let {data, cols, meta_tbl} = this.state
        let mode = 'editable' // 'display'
        return(
            data.map((row,i)=>
                <div className='TRowWraper' key={i}>
                    <div className={`TRow ${this.state.selected_i==i?"Selected":""}`} onClick={_=>this.select_row(i)}>
                        <div className="Ctrls">
                            {this.props.tbl2 && !this.state.SHOW_DETAIL && <Icon size={12} icon="plus" onClick={this.open_detail}/>}
                        </div>
                        {cols.map((col,i)=>
                            <div key={i+1} className={`TData ${get_align(col, meta_tbl)}`} style={{width: get_field_w(col, meta_tbl)}} onClick={e=>this.onClick(e,row,col)}>
                                <Field compact mode={mode} type={get_frmt(col,meta_tbl)}  value={row[col]}/>
                            </div>
                        )}
                    </div>
                    {this.state.SHOW_DETAIL && this.state.selected_i===i && this.props.tbl2 &&
                        <div className="TDetail">
                            <div className="Panel">
                                <Icon icon="up" onClick={this.close_detail}/>
                            </div>
                            <Table compact url={this.props.url} tbl={this.props.tbl2} filters={[{'k': 'InvoiceNo', 'v': row['invoiceno']}]}/>
                        </div>}
                </div>)
        )
    }

    render_footer() {
        return(
            <div className="TRow">
            </div>
        )
    }

    render_record_page(cls) {
        let {data, selected_i, cols, meta_tbl} = this.state
        let row = data[selected_i]
        return(
            <div className={cls}>
                <div className="TBar">
                    <Button icon="back" text="Back" onClick={()=>this.close_record_page()}/>
                    {/* <Icon size={20} icon="back" onClick={_=>this.setState({mode: 'table'})}/> */}
                </div>
                <div className="TPage">
                    {Object.keys(row).map((col,i)=><Field key={i} row ro type="text" label={col} value={row[col]}/>)}
                </div>
            </div>
        )
    }

    render_table(cls) {
        let {selected_i} = this.state
        //return <Select dropdown title="EXP" url="/api/get_tbl" tbl="tbl" id_col="tbl" desc_col="name"/>
        return(
            <div className={cls}>
                {!this.state.COMPACT &&
                    <div className="TBar">
                        {/* <Button icon="filter" text="Filter" onClick={this.filter}/> */}
                        <Select dropdown title="Tables" url="/api/get_tbl" tbl="tbls" id_col="tbl" desc_col="name"/>
                        {/* {this.props.selects && this.props.selects.map(e=>
                            <Select dropdown title={e}  url="/api/get_tbl" tbl="tbl" id_col="tbl" desc_col="name"/>)} */}
                        {selected_i!=null && <Button icon="record" text="Page" onClick={()=>this.open_record_page(selected_i)}/>}
                        {/* <Icon size={14} icon="filter" onClick={this.filter}/> */}
                    </div>
                }
                <div className="PadTop"></div>
                <div className="PadLeft"></div>
                <div className="TScroll">
                    <div className="TTable" style={{width: this.state.w+8}}>
                        <div className="THeader">
                            {this.render_header()}
                        </div>
                        {this.state.filter && this.render_filter()}
                        <div className="TBody">
                            {this.render_rows()}
                        </div>
                        <div className="TFooter">
                            {this.render_footer()}
                        </div>
                    </div>
                </div>
                <div className="PadRight"></div>
                <div className="PadBottom">
                    <Selector npages={this.state.npages} onSetPage={this.onSetPage}/>
                </div>
            </div>
        )
    }

    render() {
        let cls = `Table ${this.props.cls ? this.props.cls : ""}`
        if(!this.state.cols || !this.state.data || !this.state.meta)
            return  <div className={cls}><Icon size={128} icon="empty-table" fill="#999999"/></div>
        if(this.state.mode==='record_page' && this.state.selected_i!=null) return this.render_record_page(cls)
        return this.render_table(cls)
    }
}

export default Table


const parse = (data, cols, meta_tbl) => {
    if(!cols) return null
    let rows = []
    data.forEach(row => {
        let row2 = {}
        cols.map(col=> {
            if(!(col in meta_tbl)) {
                console.log(`Parse ERROR: ${col} not in meta_tbl`)
                return
            }
            let e = meta_tbl[col]
            let v = e.calc ? e.calc(row) : row[col]
            row2[col] = parse_fld(v, e)
        })
        rows.push(row2)
    })
    return rows
}

const parse_fld = (v, defs) => {
    return formater(defs.frmt)(v)
}

const filter_data = (data, fld, v) => {
    return data.filter(w => String(w[fld]).startsWith(v))
}

const get_el = (e, defs) => {
    if(e==null) return <span></span>
    if(defs.hasOwnProperty('item')) return defs.item(e)
    if(defs.tags) return <Tag text={e} background={defs.tags[e]}/>
    return <span>{e}</span>
}

const get_table_w = (cols, meta_tbl) => cols ? cols.reduce( (a,b) => a + get_field_w(b, meta_tbl), 0) : 0

const get_field_w = (col, meta_tbl) => {
    if(!(col in meta_tbl)) return 100
    let {type, size} = meta_tbl[col]
    if(!size || size==='undefined' || size==='None') return 100
    if(size>0) return Math.max(Math.min(size, 400), 100)
    if(['I', 'F', 'C'].includes(type)) return 100
    if(['P'].includes(type)) return 100
    if(['D'].includes(type)) return 100
    if(['T'].includes(type)) return 150
    return Math.max(Math.min(size, 250), 100)
}

const get_name = (col, meta_tbl)  => (col in meta_tbl && meta_tbl[col].name) ? meta_tbl[col].name : col
const get_frmt = (col, meta_tbl)  => (col in meta_tbl && meta_tbl[col].frmt) ? meta_tbl[col].frmt : 'S'

const get_align = (col, meta_tbl)  => {
    if(!(col in meta_tbl)) return 'L'
    return (!meta_tbl[col].align || !['L', 'C', 'R'].includes(meta_tbl[col].align)) ? 'L' : meta_tbl[col].align
}