import * as d3 from 'd3'
import { formater } from './util.js'
import { chart_bar } from './d3/bar.js'
import { chart_hbar } from './d3/hbar.js'
import * as pie from './d3/pie.js'
import { chart_line, chart_area } from './d3/line.js'
import { chart_colormap } from './d3/colormap.js'
import { chart_geo } from './d3/geo.js'
import { WIDGET_COLORS, EU, draw_icon_legend } from './d3/dutils.js'

// import SVGDefs from '../assets/svg.js'
// import Distritos from '../assets/distritos.json'

export const chart_pie = pie.chart_pie
export const widget_pie = pie.widget_pie

export const widget_barh = null

const default_options = {
  type: "line",
  title: null,
  title2: null,
  x_axis: false,
  y_axis: false,
  legend: false,
  margin: {top: 10, bottom: 5, left: 20, right: 20},
  x_window: null,
  xformat: 'N',
  xtick: true,
  yformat: 'N',
  ytick: null,
  xcol: "x",
  ycols: [],
  ycol: "y",
  zcol: "y",
  min: null,
  max: null
}


export const draw = (node, data, opt) => {
  opt.margin = Object.assign({}, default_options.margin, opt.margin)
  if(opt.type === 'hbar')
    opt.margin.left = 100
  opt = Object.assign({}, default_options, opt)
  opt.legend = opt.legend ? true : false
  if(typeof data === "undefined")
    return null
  if(!data || !(data instanceof Array) || data.length === 0)
      return null
  if(!data[0].hasOwnProperty(opt.xcol))
    return
  opt.w0 = node.clientWidth
  opt.h0 = node.clientHeight-5
  calcs(data, opt)
  opt.format = EU().format(",.0f")
  opt.xformat = formater(opt.xformat)
  opt.yformat = formater(opt.yformat)
  d3.select(node).selectAll('svg').remove()
  //let svg = d3.select(node).append('svg').attr('width', '100%').attr('height', '100%')
  
  switch(opt.type) {
    case 'bar':
      chart_bar(node, data, opt)
      break
    case 'hbar':
      opt.h0 = opt.xlen*30+35
      chart_hbar(node, data, opt)
      break
    case 'pie':
      chart_pie(node, data, opt)
      break
    case 'line':
      chart_line(node, data, opt)
      break
    case 'area':
      chart_area(node, data, opt)
      break
    case 'geo':
      let svg = d3.select(node).append('svg').attr('width', '100%').attr('height', '100%')
      chart_geo(svg, data, opt)
      break
    case 'colormap':
      chart_colormap(node, data, opt)
      break
    default:
      break
  }
}

const calcs = (data, opt) => {
  opt.ypad1 = opt.title2 ? 20 : opt.title ? 60 : 0
  opt.ypad2 = opt.legend ? 30 : 0
  opt.ypad2 += opt.x_axis ? 25 : 0
  opt.h = opt.h0-opt.margin.top-opt.margin.bottom-opt.ypad1-opt.ypad2
  opt.xvals = data.map(d=>d[opt.xcol])
  opt.yvals = data.map(d=>d[opt.ycol])
  opt.ylen = Array.from(new Set(opt.yvals)).length
  opt.w = opt.w0-opt.margin.left-opt.margin.right
  opt.xmin = d3.min(data, d=>d[opt.xcol])
  opt.xmax = opt.x_window ? opt.xmin + opt.x_window : d3.max(data, d=>d[opt.xcol])
  opt.xlen = opt.x_window ? opt.x_window : Array.from(new Set(opt.xvals)).length
  opt.ymin = opt.min ? opt.min : d3.min(data, d=>d[opt.ycol])
  opt.ymax = opt.max ? opt.max : d3.max(data, d=>d[opt.ycol])
}

Number.prototype.pad = function(size) {
  let s = String(this)
  while (s.length < (size || 2)) {s = '0' + s;}
  return s
}