
export const BACKSPACE = 8
export const ENTER = 13
const COMA = 44
const DOT = 46

// console.log(n.toLocaleString('pt'))
//str.replace(/[A-Z]/g, u => u.toLowerCase())

const DECIMAL_SEPARATOR = ','
const THOUSANDS_SEPARATOR = '.'
const CURRENCY_SYMBOL = '€'

const DECIMAL = DOT
const RE_DECIMAL_EU = /^-?\d{1,3}(?:\.\d{3})*(?:,\d+)?$/
const RE_DECIMAL_US = /^(?:(?:\d+(?:\.\d*)?|\.\d+)(?:[-+/*%]|$))+$/ig
let RE = /^(d+)\.(d+)/ig


const frmt_N = (n, decimals=0) => {
    if(n>=10e11) return n.toExponential()
    let s = n.toString(), s2=''
    let k = s.indexOf(".")
    if(k===-1) k = s.length
    for(let i=0; i<k ; i++) {
        s2 += (s[i])
        if(!((k-i-1)%3) && i!==k-1) s2 += THOUSANDS_SEPARATOR
    }
    if(decimals) {
        let s_decimal =  s.substring(k+1, k+1+decimals)
        s2 += DECIMAL_SEPARATOR + s_decimal
        for(let i=s_decimal.length; i<decimals; i++) s2 += '0'
    }
    return s2
}

export const frmt_B = (n) => {
    if(n>=Math.pow(1024,4)) return `${Math.round(10*n/Math.pow(1024,4))/10}TB`
    if(n>=Math.pow(1024,3)) return `${Math.round(10*n/Math.pow(1024,3))/10}GB`
    if(n>=Math.pow(1024,2)) return `${Math.round(10*n/Math.pow(1024,2))/10}MB`
    if(n>=1024) return `${Math.round(10*n/1024)/10}KB`
    return `${Math.round(n)}B`
}

export const frmt_K = (n) => {
    let n2, un
    if(n>=Math.pow(1000,4)) {n2 = n/Math.pow(1000,4); un='t' }
    else if(n>=Math.pow(1000,3)) {n2 = n/Math.pow(1000,3); un='b' }
    else if(n>=Math.pow(1000,2)) {n2 = n/Math.pow(1000,2); un='m' }
    else if(n>=1000) {n2 = n/1000; un='k' }
    else {n2 = n; un='' }
    if(n2>10)
        n2 = Math.round(n2)
    else
        n2 = Math.round(10*n2)/10
    return `${n2}${un}`
}

const frmt_P = (n, decimals=0) => `${frmt_N(100*n,decimals)}%`
const frmt_P2 = (n) => frmt_P(n,2)

const frmt_currency = (v, decimals=0) => `${CURRENCY_SYMBOL}${frmt_N(v,decimals)}`

const check_c_number = (c, v, digits=15, decimals=2) => {
    let s = ((v||'') + String.fromCharCode((c===COMA && DECIMAL===DOT)?DOT:c))
    if(s.length>digits) return false
    let m = s.match(/(\d+)/g)
    if(m.length===2 && m[1].length>decimals) return false
    return s.match(RE_DECIMAL_US)
}
const check_passwd = (v) => (v.length>=6) ? true : false
const check_passwd2 = (v, props) => v===props.match ? true : false
const check_key = (v) => (v.length===4) ? true : false
const check_email = (s) => /^[A-Z0-9._%+-]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/.test(s.toUpperCase())


export const TYPES = {
    text: {inputtype: 'text', placeholder: '', maxlen: 255, error_msg: ''},
    email: {inputtype: 'email', placeholder: 'Email', maxlen: 255, error_msg: 'Invalid email', check_f: check_email},
    password: {inputtype: 'password', placeholder: 'Password', maxlen: 255, error_msg: 'Minimum 6 characters', check_f: check_passwd},
    password1: {inputtype: 'password', placeholder: 'Password', maxlen: 255, error_msg: 'Minimum 6 characters', check_f: check_passwd},
    password2: {inputtype: 'password', placeholder: 'Password', maxlen: 255, error_msg: 'No match', check_f: check_passwd2},
    key: {inputtype: 'text', placeholder: 'Key', maxlen: 4, error_msg: '', check_f: check_key},
    enum: {inputtype: 'text', placeholder: '', maxlen: 15, error_msg: ''},
    number: {inputtype: 'number', placeholder: '', maxlen: 20, error_msg: '', digits: 15, check_c: check_c_number, frmt_f: frmt_N},
    number2: {inputtype: 'number', placeholder: '', maxlen: 20, error_msg: '', digits: 15, decimals: 2, check_c: check_c_number,},
    number_k: {inputtype: 'number', placeholder: '', maxlen: 20, error_msg: '', digits: 15, check_c: check_c_number, frmt_f: frmt_K},
    currency: {inputtype: 'number', placeholder: '', maxlen: 25, error_msg: '', frmt_f: frmt_currency,},
    currency2: {inputtype: 'number', placeholder: '', maxlen: 25, error_msg: '', frmt_f: frmt_currency,},
    percent: {inputtype: 'number', placeholder: '', maxlen: 20, error_msg: '', check_c: check_c_number, frmt_f: frmt_P },
    percent2: {inputtype: 'number', placeholder: '', maxlen: 20, error_msg: '', decimals: 2, check_c: check_c_number, frmt_f: frmt_P2 },
}

// const formater_P2 = (n) => d3.format(",.2f")(n*100).replace(/,/g, ".")+'%'
// const formater_P = (n) => d3.format(",.0f")(n*100).replace(/,/g, ".")+'%'

// const pad = (s,n) => {
//     if(s.length==n) return s
// }

// const formater_T = (n) => {
//     let H = Math.floor(n/3600)
//     let M = Math.floor((n-H*3600)/60)
//     let S = Math.floor(n%60)
//     H =  String(H).paddingLeft("00")
//     M =  String(M).paddingLeft("00")
//     S =  String(S).paddingLeft("00")
//     return `${H}:${M}:${S}`
// }

// const formater_S = (s) => s