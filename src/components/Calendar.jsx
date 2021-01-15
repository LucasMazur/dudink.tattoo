import React, { useState, useEffect } from 'react'
import Axios from "axios"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import listPlugin from '@fullcalendar/list';

import '../css/Calendar.css'

export default () => {
    let myVar = []

    const [dateList, setDateList] = useState()
    const [dateList2, setDateList2] = useState()
    const [calendarView, setCalendarView] = useState('dayGridMonth')

    const changeView = () => {
        setCalendarView('listWeek')
    }

    useEffect(() => {
        Axios.get("http://172.16.30.171:3001/api/userModel/get").then((response) => {
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
            <h1>Meus Agendamentos</h1>
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
                    //dateClick={( e ) => {testeVariable()}}
                />
            </div>
        </div>
    )
}