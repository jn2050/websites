import React, { Component } from 'react'
import Section from './components/Section'
import Card from './components/Card'
import Button from './components/Button'
import Dropdown from './components/Dropdown'
import Select from './components/Select'
import Tree from './components/Tree'
import Table from './components/Table'
import { Link } from 'react-router-dom'
import './Test.css'


const tree_data = [
  {
    "id": 1,
    "value": "Value 1",
    "children": [
      {
        "id": 4,
        "value": "Value 1.1",
        "children": [
          {
            "id": 6,
            "value": "Value 1.1.1",
          }
        ]
      },
      {
        "id": 5,
        "value": "Value 1.2",
      },
    ]
  },
  {
    "id": 2,
    "value": "Value 2",
    "children": [
      {
        "id": 2,
        "value": "Value 2.1",
      }
    ]
  },
  {
    "id": 3,
    "value": "Value 3",
    "children": [
      {
        "id": 2,
        "value": "Value 3.1",
      }
    ]
  }
]


const labels = {
  'DB': '#4F5D31',
  'REVIEW': '#BA9942',
  'ONLINE': '#B76D68',
}

const table_meta = [
  {field: 'code', name: 'Code', width: 50, align: 'left', format: 'S'},
  {field: 'name', name: 'Name', width: 150, align: 'left', format: 'S'},
  {field: 'value', name: 'Value', width: 80, align: 'right', format: 'N'},
  {field: 'amount', name: 'Amount', width: 80, align: 'right', format: 'C'},
  {field: 'percentage', name: 'Percentage', width: 80, align: 'right', format: 'P'},
  {field: 'time', name: 'Time', width: 100, align: 'right', format: 'T'},
  {field: 'label', name: 'Label', width: 80, align: 'center', format: 'L', labels: labels},
]

const table_data = [
  {'code': 1, 'name': 'Name1', 'value': 1, 'amount': 1, 'percentage': 1, 'time': 10, 'label': 'DB'},
  {'code': 1, 'name': 'Name1', 'value': 1000, 'amount': 1000, 'percentage': 1, 'time': 10, 'label': 'REVIEW'},
  {'code': 1, 'name': 'Name1', 'value': 1, 'amount': 1, 'percentage': 1, 'time': 100, 'label': 'ONLINE'},
  {'code': 1, 'name': 'Name1', 'value': 1, 'amount': 1, 'percentage': 1, 'time': 1000, 'label': 'DB'},
  {'code': 1, 'name': 'Name1', 'value': 1, 'amount': 1, 'percentage': 1, 'time': 10, 'label': 'DB'},
  {'code': 1, 'name': 'Name1', 'value': 1000, 'amount': 1000, 'percentage': 1, 'time': 10, 'label': 'REVIEW'},
  {'code': 1, 'name': 'Name1', 'value': 1, 'amount': 1, 'percentage': 1, 'time': 100, 'label': 'ONLINE'},
  {'code': 1, 'name': 'Name1', 'value': 1, 'amount': 1, 'percentage': 1, 'time': 1000, 'label': 'DB'},
  {'code': 1, 'name': 'Name1', 'value': 1, 'amount': 1, 'percentage': 1, 'time': 10, 'label': 'DB'},
  {'code': 1, 'name': 'Name1', 'value': 1000, 'amount': 1000, 'percentage': 1, 'time': 10, 'label': 'REVIEW'},
  {'code': 1, 'name': 'Name1', 'value': 1, 'amount': 1, 'percentage': 1, 'time': 100, 'label': 'ONLINE'},
  {'code': 1, 'name': 'Name1', 'value': 1, 'amount': 1, 'percentage': 1, 'time': 1000, 'label': 'DB'},
  {'code': 1, 'name': 'Name1', 'value': 1, 'amount': 1, 'percentage': 1, 'time': 10, 'label': 'DB'},
  {'code': 1, 'name': 'Name1', 'value': 1000, 'amount': 1000, 'percentage': 1, 'time': 10, 'label': 'REVIEW'},
  {'code': 1, 'name': 'Name1', 'value': 1, 'amount': 1, 'percentage': 1, 'time': 100, 'label': 'ONLINE'},
  {'code': 1, 'name': 'Name1', 'value': 1, 'amount': 1, 'percentage': 1, 'time': 1000, 'label': 'DB'},
]


class Test extends Component {
  constructor(props) {
    super(props)
    this.state = {
      node: null,
    }
  }

  setValue = (node) => this.setState({node: node})

  render() {
    return (
      <Section Page CenterV cls="Test">
        <Section W100 CenterH>
          <Table meta={table_meta} data={table_data} onClick={this.onCLick}/>
        </Section>
        {/* <Section W100 CenterH>
          <Tree data={tree_data} onSelect={this.setValue}/>
          <p>{this.state.node ? this.state.node.value : ""}</p>
        </Section>
        <Section W100 CenterH>
          <Dropdown data={["aValue1", "abValue2", "bValue3", "cValue4", "dValue5", "eValue6"]} onSelect={this.setValue}/>
          <p>{this.state.value}</p>
        </Section>
        <Section W100 CenterH>
          <Button text="Button1" icon="download"/>
          <Button text="Button2"/>
          <Button icon="download"/>
        </Section>
        <Section W100 CenterH>
          <Select buttons options={["Button3", "Button4"]}/>
          <Select buttons vertical options={["Button5", "Button6"]}/>
          <Select icons options={["download", "upload"]}/>
        </Section> */}
      </Section>
    )
  }

}

export default Test