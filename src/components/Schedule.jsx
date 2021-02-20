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
    let myVar = []
    const [dateHour, setDateHour] = useState('')
    const [date, setDate] = useState('')
    const [hour, setHour] = useState('')
    const [name, setName] = useState('')
    const [body, setBody] = useState('')
    const [size, setSize] = useState('')
    const [dateList, setDateList] = useState('')
    const [message, setMessage] = useState('Ola, meu nome é ')

    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_LINK_API}/client/get`).then((response) => {
            let size = response.data.length
            for (let x = 0; x < size; x++) {
                myVar = [ ...myVar,
                    {backgroundColor:'#ff0202', start: response.data[x].dateHour, allDay: false}
                ]
            }
            setDateList(myVar)
        })
    }, [])

    function submitData() {
        Axios.post(`${process.env.REACT_APP_LINK_API}/client/save`, {name: name, hour: hour, date: date, dateHour: dateHour, body: body, size: size}).then(() => {
            window.location.pathname="/schedule"
        })
    }

    return (
        <div className="page-schedule" id="page-schedule">
            <div className="side-bar-schedule">
                <div className="logo-titulo-sidebar-schedule">
                    <img className="logo" src={logo} alt="logo"/>
                    <strong className="titulo">Dudink.Tattoo</strong>
                </div>
                <FullCalendar 
                     plugins={[ interactionPlugin, dayGridPlugin, listPlugin ]}
                     initialView="dayGridMonth"
                     events={dateList}
                      selectable="true"
                      dateClick={( e ) => {
                          console.log(e)
                          const clikedDate = e.date
                          const today = (new Date())
                          if (today > clikedDate) {
                            alert("Favor selecionar uma data coerente")            
                          } else {
                            setDate(e.dateStr)
                          }
                      }}
                />
                <label style={{ fontSize: 15, color: "red", fontStyle: "bold" }}>MÁXIMO 3 CLIENTES POR DIA!!!</label>
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
                            <span>Escolha a data clicando no calendário ao lado</span>
                        </label>
                        <textarea id="name" type="text" value={date} readOnly required/>
                    </div>
                    <div className="input-block">
                        <label htmlFor="name">Horário</label>
                        <input id="hour" type="time" min="15:00" max="20:30" onBlur={(e) => {
                            setHour(e.target.value)
                            setDateHour(date+"T"+e.target.value+":00")
                        }} required/>
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
                            setMessage(message + ", gostaria de tatuar o(a) meu(minha) " + e.target.value)
                            setBody(e.target.value)
                        }} required/>
                    </div>
                    <div className="input-block">
                        <label htmlFor="name">Tamanho do desenho (em cm)</label>
                        <input id="name" type="text" onBlur={(e) => { 
                            setMessage(message + ", em um tamanho de aproximadamente " + e.target.value + "cm, no dia " + date.toString() + ", às: " + hour.toString())
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
                        href={`https://api.whatsapp.com/send?1=pt_BR&phone=+5511911201820&text=${message}`} target="_blank"
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