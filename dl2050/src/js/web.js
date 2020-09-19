
//const HOST = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 'localhost': 'rest'
const HOST = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 'www.test.com': 'rest'
const URL = `http://${HOST}`
//console.log(process.env.NODE_ENV, URL)

const fetch_url = (url) => `${URL}${url}`

const fetch_headers = () => { 
  const headers = {'Content-Type': 'application/json', 'Accept': 'application/json'}
  const jwt_token = localStorage.getItem('jwt_token')
  if(jwt_token) headers['Authorization'] = `Bearer ${jwt_token}`
  return headers
}

const upload = (file, onload, onerror, onabort, onprogress) => {
  const url = `${URL}/upload`
  let xhr = new XMLHttpRequest()
  xhr.addEventListener('load', () => {
    file.fname = xhr.getResponseHeader("X-FILENAME").split("/").pop()
    file.res = xhr.response
    onload(file)
  })
  //xhr.upload.onload =  onload
  xhr.upload.onerror = onerror
  xhr.upload.onabort = onabort
  xhr.upload.onprogress = ()=>onprogress(file)
  xhr.open("POST", url)
  xhr.send(file)
  return xhr
  }

const request = (url0, method, payload, f1, f2) => {
  const url = fetch_url(url0)
  const headers = fetch_headers()
  let options = {
    method: method,
    headers: headers
  }
  if(method==='POST') options['body'] = JSON.stringify(payload)
  fetch(url, options)
  .then(res => res.json())
  .then(
    res => {
      if(res.status==='OK') f1(res)
      else f2(res.error_msg)
    },
    (error) => {
      console.log(`WEB request ${url} error: ${error}`)
      if(f2) f2(error)
    }
  )
}

const wrequest = async (relative_url, method, payload) => {
  const url = fetch_url(relative_url)
  const headers = fetch_headers()
  let options = {
    method: method,
    headers: headers
  }
  if(method==='POST') options['body'] = JSON.stringify(payload)
  try {
    let res = await fetch(url, options)
    res = await res.json()
    if(res.status==='OK')
      return res.result
    throw res.error_msg
  }
  catch(err) {
    console.log(err)
    throw err
  }
}

const smart_pool = async (jid, f1, f2, eta) => {
  eta = eta || 100
  try {
    let res = await wrequest("/api/get_job", 'POST', {'jid': jid})
    if(res['jstatus']!=2) {
      console.log(eta, res['eta'])
      setTimeout(smart_pool, eta*2, jid, f1, f2, eta*2)
      return
    }
    f1(res)
  }
  catch(err) {f2(err)}
}

export { upload, wrequest, request, smart_pool, fetch_url, fetch_headers }