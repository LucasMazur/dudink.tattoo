import React, { useState, useEffect } from 'react'
import Axios from "axios"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import listPlugin from '@fullcalendar/list';

export default () => {
    let myVar2 = []

    const [dateList, setDateList] = useState()
    const [dateList2, setDateList2] = useState()

    const testeVariable = () => {
        console.log(dateList)
    }

    useEffect(() => {
        Axios.get(" https://dudink-tattoo-back.herokuapp.com/api/userModel/get").then((response) => {
            let size = response.data.length
            for (let x = 0; x < size; x++) {
                myVar2 = [ ...myVar2,
                    {title: response.data[x].name, date:response.data[x].date}
                ]
            }
            setDateList(myVar2)
        })
    }, [dateList2])

    return (
        <FullCalendar
            plugins={[ interactionPlugin, dayGridPlugin, listPlugin ]}
            initialView="dayGridMonth"
            events={dateList}
            dateClick={( e ) => {testeVariable()}}
        />
    )
}