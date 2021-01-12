import React, { useState, useEffect } from 'react'
import Axios from "axios"

import '../css/Components.css'
import '../css/sidebarSchedule.css'

import logo from '../img/logo.svg'

export default () => {

    const [dataList, setDataList] = useState([])
    const [dataList2, setDataList2] = useState([])

    useEffect(() => {
        Axios.get("http://localhost:3001/api/userModel/get").then((response) => {
            setDataList(response.data)
        })
    }, [dataList2])

    // useEffect(() => {
    //     Axios.get("http://localhost:5500/getdata").then((response) => {
    //         setDataList(response.data)
    //     })
    // }, [dataList2])

    const removeData = (val) => {
        console.log(val)
        Axios.post("http://localhost:3001/api/userModel/remove", {del: val})
    }

    return (
        <div className="page-schedule" id="page-schedule">
            {/* <div className="side-bar-schedule">

                <div className="logo-titulo-sidebar-schedule">
                    <img className="logo" src={logo} alt="logo"/>
                    <strong className="titulo"></strong>
                </div>
                <button onClick={() => {window.location.pathname="/"}}
                        className="back-button-galery" >Voltar
                </button>
            </div> */}
            <>
                {dataList.map((val) => {
                    return (
                        console.log(val),
                        <div className="dinamic-buttons" key={val._id}>
                            <button onClick={() => {removeData(val._id)}}>
                                {val.name} | {val.date}
                            </button>
                        </div>
                    )
                })}
            </>
        </div>
    )
}