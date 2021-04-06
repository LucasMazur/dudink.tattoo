import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import listPlugin from '@fullcalendar/list';
import ptLocale from '@fullcalendar/core/locales/pt';
import Axios from "axios"
import { Link } from 'react-router-dom'

import '../css/landing.css'

import logo from '../img/logo.svg'
import insta from  '../img/insta.png'

export default () => {
    
    let myVar = []
    const [dateList, setDateList] = useState('')
    const [date, setDate] = useState('Nenhuma data selecionada')

    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_LINK_DEV}/client/get`).then((response) => {
            let size = response.data.length
            for (let x = 0; x < size; x++) {
                myVar = [ ...myVar,
                    {backgroundColor:'#ff0202', start: response.data[x].dateHour}
                ]
            }
            setDateList(myVar)
        })
    }, [])

    return (
        <div className="page-landing" id="page-landing">
            <header className="landing animate-up">
                <aside>
                    <a href="https://www.instagram.com/dudink.tattoo/" target="_blank">
                        <img src={insta} alt=""/>
                    </a>
                </aside>
                {/* <hr/> */}
                <div className="header-container">
                    <div className="logo-titulo">
                        <img className="logo" src={logo} alt="logo"/>
                        <strong className="titulo">Dudink.Tattoo</strong>
                    </div>
                    <div className="schedule-container">
                        <FullCalendar
                            locale={ptLocale}
                            plugins={[ interactionPlugin, dayGridPlugin, listPlugin ]}
                            initialView="dayGridMonth"
                            headerToolbar={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,dayGridWeek,dayGridDay,listWeek' }}
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
                        {/* <button onClick={() => {window.location.pathname="/galery"}}
                                className="landing-button galery-button">Visite a galeria
                        </button> */}
                        <div className="date-label">
                            <h2>Data selecionada: {date}</h2>
                            <Link to={`/schedule${date}`}>
                                <button className="landing-button">Agende um horário </button>  
                            </Link>
                        </div>                        
                    </div>
                </div>
            </header>
        </div>
    )
}