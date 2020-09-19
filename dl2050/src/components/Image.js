import React, { Component } from 'react'
import './Image.css'
import Icon from './Icon'

/*
    <Image grid ... urls={this.state.urls1}/>
    <Image selector ... urls={this.state.urls1}/>
    <Image url={this.state.urls1[0]}/>
    
    Image options: expand left right urls
*/


class Image extends Component {

    constructor(props) {
        super(props)
        this.state = {
            url: null,
            urls: null,
            idx: 0,
            expanded: false,
            closed: false
        }
        this.setSchedulers()
    }

    componentDidMount = () => {
        if(this.props.url)
            this.setState({url: this.props.url})
    }

    componentDidUpdate = (prevProps, prevState) => {
        //console.log(this.props.url.length )
        //if(this.state.url && this.props.url!=this.state.url && JSON.stringify(prevProps.urls)==JSON.stringify(this.props.urls)) return
        if(this.props.url===this.state.url) return
        let url = this.props.url // ? this.props.urls[0] : this.props.url
        this.setState({url: url})
        this.setSchedulers()
    }

    setSchedulers = () => {
        if(!this.props.urls) return
        if(!this.props.auto || this.props.auto<0) return
        setTimeout(()=>this.autoChange(1000*this.props.auto), 1000*this.props.auto)
    }

    autoChange = (t) => {
        this.onRight()
        setTimeout(()=>this.autoChange(t), t)
    }

    onLeft = (e) => {
        if(!this.props.urls) return
        const idx = this.state.idx>0 ? this.state.idx-1 : this.props.urls.length-1
        this.setState({url: this.props.urls[idx], idx: idx})
        if(this.props.onLeft) this.props.onLeft(e)
    }

    onRight = (e) => {
        if(!this.props.urls) return
        const idx = this.state.idx<this.props.urls.length-1 ? this.state.idx+1 : 0
        this.setState({url: this.props.urls[idx], idx: idx})
        if(e && this.props.onRight) this.props.onRight(e)
    }

    onSelect = (url, idx) => {
        this.setState({url: url, idx: idx})
        if(this.props.onSelect) this.props.onSelect(url, idx)
    }

    onClose = () => {
        this.setState({closed: true})
        if(this.props.onClose) this.props.onClose()
    }

    expand = () => this.setState({expanded: !this.state.expanded})


    render_grid() {
        return(
            <div className={`ImageGridContainer ${this.state.expanded ? " Expand" : ""}`}>
                <div className="Bar">
                    {!this.state.expanded && <Icon size={14} icon="expand" onClick={this.expand}/>}
                    {this.state.expanded && <Icon size={20} icon="normal" onClick={this.expand}/>}
                </div>
                <div className="Images">
                    {this.props.urls && this.props.urls.map((url,i) =>
                        <img src={url} onClick={_=>this.onSelect(url,i)}/>
                    )}
                </div>
            </div>
        )
    }
    

    render() {
        let cls = `ImageContainer ${this.props.box?'Box':''}`
        if(this.props.grid)
            return this.render_grid()
        if(!this.state.url)
            return (
                <div className={cls}>
                    <div className="Image Empty"><Icon icon='empty' size={64}/></div>
                </div>
            )
        return (
            <div className={`${cls} ${this.state.expanded ? " Expand" : ""}`}>
                <div className="Image">
                    <img src={this.state.url}/>
                    {!this.state.expanded && (this.props.left || this.props.close) &&
                        <div className='LeftPanel'>
                            {this.props.left && <Icon icon='left' size={32} color='#FFFFFF' onClick={this.onLeft} />}
                            {this.props.close && <Icon icon='close' size={32} color='#FFFFFF' onClick={this.onClose} />}
                        </div>
                    }
                    {!this.state.expanded && (this.props.right || this.props.expand || this.props.download) &&
                        <div className='RightPanel'>
                            {this.props.right && <Icon icon='right' size={32} color='#FFFFFF' onClick={this.onRight} />}
                            {this.props.expand && <Icon icon='expand' size={32} color='#FFFFFF' onClick={this.expand} />}
                            {this.props.download && <Icon icon='download' size={32} color='#FFFFFF' onClick={this.onDownload} />}
                        </div>
                    }
                    {this.state.expanded && <Icon icon='normal' size={32} color='#555555' onClick={this.expand} />}
                </div>
                {this.props.selector &&
                    <div className="ImageSelector">
                        {this.props.urls.map((e,i) =>
                            <img src={e} onClick={_=>this.onSelect(this.props.urls[i],i)}/>
                        )}
                    </div>
                } 
            </div>
        )
    }
}
  
export default Image