import React, { Component } from 'react'
import './File.css'
import Select from './Select'
import Image from './Image'
import Icon from './Icon'
import Button from './Button'
import {upload} from '../js/web'
import {frmt_K} from '../js/field.js'


// <File xml [image | one] onUpload/>


const array_update = (array, key_c, key, val_c, val) => {
    let n = array.findIndex(e=>e[key_c]===key)
    if(n===-1) return array
    array[n][val_c] = val
    return array
}


const get_text = (n1, n2) => {
    if(n1+n2===1) {
        if(n1===1) return 'File uploaded'
        if(n2===1) return 'File upload canceled'
    }
    if(n1===0) return `${n2} files with upload canceled`
    if(n2===0) return `${n1} files uploaded`
    return `${n1} files uploaded, ${n2} files with upload canceled`
}


class File extends Component {

    constructor(props) {
        super(props)
        this.state = {
            files: [],
            uploading: false,
            done: false,
            files_to_upload: 0,
            files_uploaded: 0,
            files_canceled: 0
        }
    }

    componentDidMount = () => {}

    getfiles = (filelist) => {
        let files = this.state.files
        let reader = null
        let k = this.state.files.length
        let max = this.props.max || 64
        if(this.props.one) max = 1
        for(let i=0; i<filelist.length; i++) {
            let file = filelist[i]
            let is_image = file.type.startsWith("image")
            if(this.props.image && !is_image) continue
            if(this.props.xml && file.type!='text/xml') continue
            if(k>=max) continue
            if(files.findIndex(e=>e.name===file.name)!=-1) continue
            if(is_image) {
                reader = new FileReader()
                reader.onloadend = e=>this.onLoadImage(e, reader, file)
                reader.readAsDataURL(file)
            }
            file.text = file.name.replace(/\.[^/.]+$/, "")
            file.text2 = frmt_K(file.size)
            file.icon2 = file.name.split('.').pop()
            file.p = null
            file.uploaded = false
            file.canceled = false
            file.is_image = is_image
            file.url = null
            files.push(file)
            k++
        }
        this.setState({files: files, files_to_upload: files.length})
    }

    onLoadImage = (e, reader, file) => {
        let n = this.state.files.findIndex(e=>e.name===file.name)
        if(n==-1) return
        let files = this.state.files
        files[n].url = reader.result
        this.setState({files: files, url: files[0].url})
    }

    onDragEnter = (e) => {
        e.stopPropagation()
        e.preventDefault()
    }

    onDragOver = (e) => {
        e.stopPropagation()
        e.preventDefault()
    }

    onDrop = (e) => {
        e.stopPropagation()
        e.preventDefault()
        this.getfiles(e.dataTransfer.files)
    }

    onSelect = (e) => {
        e.stopPropagation()
        e.preventDefault()
        this.getfiles(e.target.files)
    }

    load = (e) => {
        e.stopPropagation()
        e.preventDefault()
        const input = this.refs.input
        if(input) input.click()
    }

    clear = () => {
        this.setState({files: [], done: false, files_to_upload: 0, files_uploaded: 0, files_canceled: 0})
        if(this.props.onClear) this.props.onClear()
    }

    onClose = (e) => {
        this.setState({file: null})
        this.refs.input.value = ''
        if(this.props.onClose) this.props.onClose()
    }

    onload = (e, file) => {
        let files = array_update(this.state.files, 'name', file.name, 'uploaded', true)
        this.setState({files: files}, this.check_done)
        file.p = null
        if(this.props.onUpload) this.props.onUpload(file)
    }
    onerror = e => null
    onabort = e => null
    onprogress = (e, file) => this.setState({files: array_update(this.state.files, 'name', file.name, 'p', e.loaded/e.total)})
    abort = (xhr) => xhr.abort()

    check_done = () => {
        let n1=0, n2=0
        this.state.files.forEach(file => {
            if(file.uploaded) n1+=1
            if(file.canceled) n2+=1
        })
        let done = (n1+n2)===this.state.files_to_upload
        if(done) this.setState({done: true, uploading: false, files_to_upload: 0, files_uploaded: n1, files_canceled: n2})
    }

    onUpload = () => {
        let files = this.state.files
        if(!files || !files.length) return
        this.setState({done: false, uploading: true, files_uploaded: 0, files_canceled:0})
        setTimeout(()=>this.do_upload(files), 0.01)
    }

    do_upload = (files) => {
        let files2 = []
        files.forEach(file => {
            if(!file.xhr) {
                let xhr = upload(file, e=>this.onload(e,file), this.onerror, this.onabort, e=>this.onprogress(e,file))
                file['xhr'] = xhr
                file['p'] = 0.
                files2.push(file)
            }
        })
        this.setState({files: files2})
    }

    onDone = () => this.setState({files: [], done: false, uploading: false, files_to_upload: 0, files_uploaded: 0, files_canceled: 0})

    render() {
        let {image, xml, one} = this.props
        let {files, done, uploading, files_to_upload, files_uploaded, files_canceled} = this.state
        let empty = !files.length
        let btype = files_to_upload ? 'action' : 'inactive'
        let result_text = done ? get_text(files_uploaded, files_canceled) : ''
        let cls = `Section File ${this.props.box?"Box":""} ${empty?"Empty":""}`
        let showImagezone = image && one && !empty
        let showDropzone = !done && !showImagezone
        let showInfozone = !done && !(image && one) && !empty
        let showResultzone = done && !(image && one)
        return (
            <div className={cls} onDrop={this.onDrop}>
                {showDropzone &&
                    <div className='Dropzone' onClick={this.load}>
                        {/* <Icon icon='upload' size={128}/> */}
                        <Icon icon='file-pdf' size={30}/>
                        <p>Drop file here or click to select</p>
                    </div>
                }
                <input type="file" ref="input" onChange={this.onSelect} />
                {showInfozone &&
                    <div className="Infozone">
                        <Select grid items={files}/>
                    </div>
                }
                {showResultzone &&
                    <div className="Resultzone">
                        <p>{result_text}</p>
                    </div>
                }
                {showImagezone &&
                    <div className="Imagezone">
                        <Image url={this.state.files[0].url}/>
                    </div>
                }
                {!done && !uploading && <Button type={btype} L text="Upload" onClick={this.onUpload}/>}
                {!done && !uploading && files.length>0 && <Button link clear text="Clear" onClick={this.clear}/>}
                {done && <Button type="inactive" L text="Uploaded" onClick={this.onDone}/>}
                {done && <Button link clear text="Clear" onClick={this.clear}/>}
            </div>
        )
    }

}
  
export default File
