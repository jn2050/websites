import React, { Component } from 'react'
import './Website.css'
import Section from './components/Section'
import Card from './components/Card'
import Select from './components/Select'
import Dropdown from './components/Dropdown'
import Button from './components/Button'
import { Link } from 'react-router-dom'


const scroll_to = (id) => window.scrollTo(0, document.querySelector(id).offsetTop)


export const webpage_anarp = (props) => {
  return(
    <Section Page cls="Website">
      <Section W100 CenterH title={props.title} img={props.image} text={props.text}></Section>
      <Section W100 CenterH title="Unidades">
        <Link to="/forum"><Card type="Small" img="images/forum1.jpeg" title="Fórum"/></Link>
        <Link to="/cina"><Card type="Small" img="images/cina1.jpeg" title="Cina"/></Link>
      </Section>
      <Section W100 CenterH title="Documentos">
        {props.documents && props.documents.map(documents=>
          <Section w="350px" CenterH subtitle={documents.group}>
            {documents.items && documents.items.map(item=> <Card type="Doclink" {...item}/>)}
          </Section>)
        }
      </Section>
    </Section>
  )
}

export const webpage_forum = (props) => {
  let menu = Array.from(props.sections, s => s.title)
  return(
    <Section Page cls="Website">
      <Section W100 CenterH title={props.title} img={props.image} text={props.text}></Section>
        <Section W100 h="150px" CenterH id="Menu">
          {menu && <Select menu XL noselect options={menu} onSelect={i=>scroll_to(`#ID_${i}`)}/>}
          {/* {menu && menu.map((e,i)=> <Button size="L" text={e} onClick={()=>scroll_to(`#ID_${i}`)}/>) } */}
        </Section>
        {props.sections && props.sections.map((section,i)=> {
          return(
            <Section W100 CenterH id={`ID_${i}`} title={section.title} back>
              {section.cards && section.cards.map(card=> 
                <Card type="Normal" img={card.img} title={card.title} text={card.text}/>
              )}
            </Section>
          )
        })}
    </Section>
  )
}


export const webpage_cina = (props) => {
  return(
    <Section Page cls="Website">
      <Section W100 CenterH title={props.title} img={props.image} text={props.text}></Section>
        {props.sections && props.sections.map(section=> {
          return(
            <Section W100 CenterH title={section.title}>
              {section.cards && section.cards.map(card=> 
                <Card type="Normal" img={card.img} title={card.title} text={card.text}/>
              )}
            </Section>
          )
        })}
    </Section>
  )
}
