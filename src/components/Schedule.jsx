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
    const [date, setDate] = useState('')
    const [hour, setHour] = useState('')
    const [name, setName] = useState('')
    const [body, setBody] = useState('')
    const [size, setSize] = useState('')
    const [dateList, setDateList] = useState('')
    const [message, setMessage] = useState('Ola, meu nome é ')

    useEffect(() => {
        Axios.get("http://localhost:3001/api/client/get").then((response) => {
            let size = response.data.length
            for (let x = 0; x < size; x++) {
                myVar = [ ...myVar,
                    {backgroundColor:'#ff0202', date:response.data[x].date}
                ]
            }
            setDateList(myVar)
        })
    }, [])

    function submitData() {
        Axios.post("http://localhost:3001/api/userModel/save", {name: name, date: date, body: body, size: size}).then(() => {
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
                        <label htmlFor="name">Horário</label>
                        <input id="hour" type="time" onBlur={(e) => { 
                            setDate(date+"T"+e.target.value+":00")
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
                            setMessage(message + ", gostaria de tatuar o meu " + e.target.value)
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