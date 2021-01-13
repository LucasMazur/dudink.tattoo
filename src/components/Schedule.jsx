import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import listPlugin from '@fullcalendar/list';
import Axios from "axios"

import '../css/schedule.css'
import '../css/sidebarSchedule.css'

import logo from '../img/logo.svg'
import whatsapp from '../img/whatsapp.svg'

export default () => {
    const [date, setDate] = useState('')
    const [name, setName] = useState('')
    const [body, setBody] = useState('')
    const [size, setSize] = useState('')
    const [data, setData] = useState('')
    const [dateList, setDateList] = useState('')
    const [message, setMessage] = useState('Ola, meu nome é ')

    useEffect(() => {
        Axios.get("http://172.16.30.171:3001/api/userModel/get").then((response) => {
            setData(response.data)
        })
    }, [dateList])

    function submitData() {
        console.log(name, date)    
        Axios.post("http://172.16.30.171:3001/api/userModel/save", {name: name, date: date, body: body, size: size})
    }

    return (
        <div className="page-schedule" id="page-schedule">
            <div className="side-bar-schedule">

                <div className="logo-titulo-sidebar-schedule">
                    <img className="logo" src={logo} alt="logo"/>
                    <strong className="titulo"></strong>
                </div>
                <FullCalendar 
                     plugins={[ interactionPlugin, dayGridPlugin, listPlugin ]}
                     initialView="dayGridMonth"
                     //events={}
                      selectable="true"
                      dateClick={( e ) => {
                          const clikedDate = e.date
                          const today = (new Date())
                          if (today > clikedDate) {
                            alert("Favor selecionar uma data coerente")            
                          } else {
                            setDate(e.dateStr)
                          }
                      }}
                />
                {/* <input type="date" id="date-pick" onChange={(e) => setDate(e.target.value)}/>         */}
                <button onClick={() => {window.location.pathname="/"}}
                        className="back-button-galery" >Voltar
                </button>
            </div>
            <div className="form">
                <form action="/" method="get">
                    <h1>Preencha seus dados</h1>
                    <div className="input-block">
                        <label htmlFor="date">
                            Data
                            <span>Escolha a data ao lado</span>
                        </label>
                        <textarea id="name" type="text" value={date} readOnly required/>
                    </div>
                    <div className="input-block">
                        <label htmlFor="name">Nome</label>
                        <input id="name" type="text" onBlur={(e) => { 
                            setMessage(message + e.target.value)
                            setName(e.target.value)
                        }} required/>
                    </div>
                    <div className="input-block">
                        <label htmlFor="name">Qual parte do corpo quer tatuar</label>
                        <input id="name" type="text" onBlur={(e) => { 
                            setMessage(message + ", gostaria de tatuar o meu " + e.target.value)
                            setBody(e.target.value)
                        }} required/>
                    </div>
                    <div className="input-block">
                        <label htmlFor="name">Tamanho do desenho (em cm)</label>
                        <input id="name" type="text" onBlur={(e) => { 
                            setMessage(message + ", em um tamanho de aproximadamente " + e.target.value + "cm, no dia " + date.toString())
                            setSize(e.target.value) 
                        }} required/>
                    </div>
                    <a  onClick={() => {
                        if ((name !== "") && (date !== "") && (body !== "") && (size !== "")) {
                            submitData()
                        } else {
                            alert('Favor Preencher todos os campos')                           
                        }
                        }}
                        href={`https://api.whatsapp.com/send?1=pt_BR&phone=+5511986867287&text=${message}`} target="_blank"
                        type="button"
                        className="primary-button">
                        <img src={whatsapp} alt="Chamar no whatsapp" />
                        Entrar em Contato
                    </a>
                </form>
            </div>
        </div>
    )
}