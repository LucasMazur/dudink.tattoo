import React, { useState, useEffect } from 'react'
import Axios from "axios"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import listPlugin from '@fullcalendar/list';

import '../css/sidebarCalendar.css'
import '../css/Calendar.css'

import logo from '../img/logo.svg'

export default () => {
    let myVar = []

    const [dateList, setDateList] = useState()
    const [dateList2, setDateList2] = useState()
    const [calendarView, setCalendarView] = useState('dayGridMonth')

    const changeView = () => {
        setCalendarView('listWeek')
    }

    useEffect(() => {
        Axios.get("http://localhost:3001/api/client/get").then((response) => {
            let size = response.data.length
            for (let x = 0; x < size; x++) {
                myVar = [ ...myVar,
                    {title: response.data[x].name, start: response.data[x].date, allDay: false}
                ]
            }
            setDateList(myVar)
        })
    }, [dateList2])

    return (
        <div className="main-container">
            <div className="side-bar-calendar">
                <div className="logo-titulo-sidebar-calendar">
                    <img className="logo" src={logo} alt="logo"/>
                    <strong className="titulo">Dudink.Tattoo</strong>
                </div>
                <div className="sidebar-calendar-buttons">
                    <button onClick={() => {window.location.pathname="/manager"}}
                            className="back-button-calendar" >Voltar
                    </button>
                </div>
            </div>
            <div className="container-calendar">
                <div className="main-container-header">
                    <h1 className="calendar-h1" >Meus Agendamentos</h1>
                </div>
                <div className="calendar-container">
                    <FullCalendar
                        plugins={[ interactionPlugin, dayGridPlugin, listPlugin ]}
                        initialView='dayGridMonth'
                        headerToolbar={{
                                left: 'prev,next today',
                                center: 'title',
                                right: 'dayGridMonth,dayGridWeek,dayGridDay,listWeek'
                            }
                        }
                        events={dateList}
                    />
                </div>
            </div>
        </div>
    )
}