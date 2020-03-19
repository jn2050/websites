import * as d3 from 'd3'

String.prototype.paddingLeft = function (paddingValue) {
   return String(paddingValue + this).slice(-paddingValue.length);
};


const formater = (F) => {
    switch(F) {
        case 'N':
            return formater_N
        case 'C':
            return formater_C
        case 'P':
            return formater_P
        case 'P2':
            return formater_P2
        case 'T':
            return formater_T
        case 'S':
            return formater_S
        default:
            return (e) => e
    }
}


const formater_N = (n) => {
    let commaFormat = d3.format(",")
    return commaFormat(n).replace(/,/g, ".")
}

const formater_C = (n) => {
    let commaFormat = d3.format(",.0f")
    if(n<1000000000)
        return '€'+commaFormat(n).replace(/,/g, ".")
    else
        return '€'+commaFormat(n/1000000).replace(/,/g, ".")+' M'
}

const formater_P2 = (n) => d3.format(",.2f")(n*100).replace(/,/g, ".")+'%'
const formater_P = (n) => d3.format(",.0f")(n*100).replace(/,/g, ".")+'%'

const pad = (s,n) => {
    if(s.length==n) return s
}

const formater_T = (n) => {
    let H = Math.floor(n/3600)
    let M = Math.floor((n-H*3600)/60)
    let S = Math.floor(n%60)
    H =  String(H).paddingLeft("00")
    M =  String(M).paddingLeft("00")
    S =  String(S).paddingLeft("00")
    return `${H}:${M}:${S}`
}


const formater_S = (s) => s


const mkWeeks = (year) => {
    return [
        { label: 'Maio 10' }
    ]
}


const flatten = (root) => {
    let nodes = []
    const recurse = (node) => {
        if (node.children) {
            nodes.push({label: node.label, leaf: false})
            node.children.forEach(recurse)
        }
        else {
            nodes.push({...node, leaf: true})
        }
    }
    root.forEach(e => recurse(e))
    return nodes
    //return {children: nodes};
}

const get_first_option = (options) => {
    let firstOption = null
    for(let i=0; i<options.length; i++)
        if(options[i].leaf) {
            firstOption = options[i]
            break
        }
    return firstOption
}

const check_email = (s) => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(s)


export { formater, mkWeeks, flatten, get_first_option, check_email }