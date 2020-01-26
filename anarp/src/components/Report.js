import React, { Component } from 'react'
import Section from './Section'
import Chart from './Chart'
import Widget from './Widget'
import Select from './Select'
import Button from './Button'
import '../App.css'
import './Report.css'
import { getReport } from '../js/webapi'


const push2 = (v, o, f) => v.find(e=>f(e)==f(o))===undefined ? (v.push(o)!==-1) : false
const findNext = (v, o, f) => {let idx=v.findIndex(e=>f(e)==f(o));return idx<v.length-1?v[idx+1]:undefined}


const mkPercent = (data, sums, field) => {
  if(field.substring(field.length-2)==='_p')
    return
  let pField = field + '_p'
  let total = sums[field]
  if(pField in data[0])
    return
  for(let i=0; i<data.length; i++)
    data[i][pField] = data[i][field] / total
}


class Report extends Component {

  constructor(props) {
    super(props)
    this.state = {
        title: null,
        data: null, cols_d: null, drills_d: null,
        order: null, order0: null,
        sums: null,
        drills: null,
        gCols: null, sCols: null,
        gCol: null, sCol: null, sColFormat: null,
        error: null,
    }
    //var result = new Map(arr.map(i => [i.key, i.val]))
  }

  async getData(table, filter, gCols, drills, sCols) {
    //this.setState({error: 'Error connecting to Analytics service'})
    if(!table)
      return
    let response
    try {
      response = await getReport(table, filter, gCols, drills, sCols)
    } catch(err) {
      this.setState({error: 'Error connecting to Analytics service'})
      console.log(`Fetch error: ${response.error_msg}`)
    }
    if(!response || response.status !== 'OK') {
      if(response)
        console.log(`Fetch error: ${response.error_msg}`)
      this.setState({error: 'Error connecting to Analytics service'})
      return
    }
    let gCol = this.getColKey(response.result.drills_d, null, gCols[0])
    this.setState({
      data: response.result.data,
      cols_d: response.result.cols_d,
      drills_d: response.result.drills_d,
      sums: response.result.sums,
      gCol: gCol,
      sCol: sCols[0],
      error: null,
    })
    if(response.result.keep_order) {
      this.setState({order0: 2, order: 2})
      this.selectSort.setSelect(2)
    }
    else
      this.setState({order0: 0, order: 0})
      this.selectSort.setSelect(0)
  }

  sortData = (n, sCol) => {
    let data
    switch(n) {
      case 0: data = this.state.data.sort((e1,e2)=>e2[sCol]-e1[sCol]); break;
      case 1: data = this.state.data.sort((e1,e2)=>e1[sCol]-e2[sCol]); break;
      case 2: data = this.state.data.sort((e1,e2)=>e1['order']-e2['order']); break;
      case 3: data = this.state.data.sort((e1,e2)=>e2['order']-e1['order']); break;
    }
    this.setState({data: data, order: n})
  }

  getColKey = (drills_d, drills, key) => {
    let e = drills_d.find(o=>o.key==key)
    if(e === undefined)
      return key
    if(!drills)
      return e.drills[0]
    return e.drills[0]
  }

  getLabel = (key) => {
    let e = this.state.drills_d.find(o=>o.key==key)
    if(e !== undefined)
      return e.label
    e = this.state.cols_d.find(o=>o.key==key)
    if(e !== undefined)
      return e.label
    return 'BLANK'
  }

  getDrillCols = (col) => {
    for(let i=0; i<this.state.drills_d.length; i++)
      for(let i1=0; i1<this.state.drills_d[i].drills.length; i1++)
        if(col===this.state.drills_d[i].drills[i1])
          return this.state.drills_d[i].drills
    return null 
  }

  getDrillCol = (col) => {
    for(let i=0; i<this.state.drills_d.length; i++)
      for(let i1=0; i1<this.state.drills_d[i].drills.length; i1++)
        if(col===this.state.drills_d[i].drills[i1])
          return this.state.drills_d[i].key
    return null 
  }
 
  update(cfg) {
    if(!cfg || !cfg.table) {
      this.setState({data: null})
      return
    }
    this.setState({gCols: [],sCols: [],}, e=>
      this.setState({title: cfg.title ? cfg.title : cfg.label,gCols: cfg.gCols,sCols: cfg.sCols,}))
    this.getData(cfg.table, cfg.tfilter, [cfg.gCols[0]], null, cfg.sCols)
  }

  setGCol = (idx) => {
    this.getData(this.props.table, this.props.filter, [this.props.gCols[idx]], null, this.props.sCols)
    this.setState({gCol: this.props.gCols[idx], drills: null})
  }

  setSCol = (n) => {
    this.setState({sCol: this.props.sCols[n]})
    this.sortData(this.state.order0, this.props.sCols[n])
  }

  drillDown = (key, value) => {
    if(!this.state.drills_d) return
    let drillCols = this.getDrillCols(this.state.gCol)
    if(!drillCols || drillCols.length<2) return
    if(key===drillCols[drillCols.length-1]) return
    let drills = this.state.drills ? this.state.drills.slice() : []
    let nextKey = findNext(drillCols, key,  e=>e.key)
    if(!push2(drills, {key: key, value: value}, e=>e.key)) return
    this.setState({drills: drills})
    this.getData(this.props.table, this.props.filter, [nextKey], drills, this.props.sCols)
  }

  drillUp = (level) => {
    //if(level!=this.state.drills.length-1) return
    let drills = this.state.drills.slice()
    let key = drills.pop().key
    if(!drills.length) {
      key = this.getDrillCol(key)
      drills = null
    }
    this.setState({drills: drills})
    this.getData(this.props.table, this.props.filter, [key], drills, this.props.sCols)
  }

  setValPercent = (n) => {
    if(n==0 && this.state.sCol.substring(this.state.sCol.length-2)==='_p') {
      this.setState({ sCol: this.state.sCol.substring(0, this.state.sCol.length-2) })
    }
    else {
      mkPercent(this.state.data, this.state.sums, this.state.sCol)
      if(this.state.sCol.substring(this.state.sCol.length-2)!=='_p')
        this.setState({ sCol: this.state.sCol+'_p' })
    }
  }

  sortCatVal = (n) => this.sortData(n, this.state.sCol)
  
  render() {
    if(!this.state.data || !this.state.cols_d)
      return  <Section size={`w80 H80`} error={this.state.error} />

    let sColFormat
    if(this.state.sCol.substring(this.state.sCol.length-2) === '_p')
      sColFormat = 'P'
    else
      sColFormat = this.state.cols_d ? this.state.cols_d.find(o=>o.key==this.state.sCol).format : 'T'

    let total = this.state.sCol ? this.state.sums[this.state.sCol] : 0
    if(this.state.sCol.substring(this.state.sCol.length-2)==='_p')
      total = 1
    let sCols = this.state.sCols.map( e => this.getLabel(e))
    let filters = this.state.drills ? this.state.drills.map(e => {return {label: this.getLabel(e.key), value: e.value}}) : null

    return (
      <Section cls='Report'>

        <Section bar>
          {this.state.gCols && <Select menu options={this.state.gCols.map(e=>this.getLabel(e))} onSelect={this.setGCol} />}
        </Section>

        <Section cls="ReportMain">

          <Section cls="ReportHeader">
            <Section row><h2>{this.state.title}</h2></Section>
            {filters &&
              <Section row><h3>Filters:</h3>{filters.map((e,i)=>
                <Widget type="Compact" {...e} onClick={e=>this.drillUp(i)}/>)}
              </Section>}
          </Section>

          <Section cls="ReportChart" error={this.state.error}>
            {filters && <Button  icon="up" iconsize={24} cls="Up" onClick={this.drillUp}/>}
            <Chart  data={this.state.data}
                    options={{
                        type: 'hbar',
                        xcol: this.state.gCol,
                        ycols: [this.state.sCol],
                        yformat: sColFormat,
                        onClick: this.drillDown }}/>
          </Section>

          <Section cls="ReportRightPanel" top>
              <Select menu vertical options={sCols} onSelect={n=>this.setSCol(n)}/>
              <Section row center>
                <Select icons={["sort-value-down", "sort-value-up", "sort-cat-down", "sort-cat-up"]}
                  onSelect={n=>this.sortCatVal(n)} ref={selectSort=>this.selectSort=selectSort}/>
              </Section>
              <Section row center>
                <Select icons={["numeric", "percent"]}
                  onSelect={n=>this.setValPercent(n)} ref={selectValPercent=>this.selectValPercent=selectValPercent}/>
              </Section>
          </Section>

          <Section cls="ReportFooter">
            <Widget type="Compact" label="Total" format={sColFormat} value={total}/>
          </Section>

        </Section>

      </Section>
    )
  }
}

export default Report
