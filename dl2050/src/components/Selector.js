import React, { useState } from 'react'
import Icon from './Icon'
import './Selector.css'


const onleft = (props, page, setPage) => {
    if(page<1) return
    const new_page = page-1
    setPage(new_page)
    if(props.onSetPage) props.onSetPage(new_page)
}

const onright = (props, page, setPage) => {
    if(page>=props.npages-1) return
    const new_page = page+1
    setPage(new_page)
    if(props.onSetPage) props.onSetPage(new_page)
}



function Selector(props) {
    const [page, setPage] = useState(0)
  
    return (
      <div className="Selector">
        <div className="Container">
          <div className='IconContainer' onClick={()=>onleft(props, page, setPage)}>
              <Icon size={12} icon='left' fill='#555555'/>
          </div>
          <div className='TextContainer'>
            <span>{page+1}</span>
            <span>/</span>
            <span>{props.npages}</span>
          </div>
          <div className='IconContainer' onClick={()=>onright(props, page, setPage)}>
              <Icon size={12} icon='right' fill="#555555"/>
          </div>
        </div>
      </div>
    )
  }

  export default Selector