import React, { useState, useEffect } from 'react'
import Axios from "axios"

import '../css/AproveClients.css'
import '../css/sidebarManager.css'

import logo from '../img/logo.svg'
import check from '../img/check.svg'
import del from '../img/delete.svg'

export default () => {

    const [dataList, setDataList] = useState([])
    const [dataList2, setDataList2] = useState([])

    useEffect(() => {
        Axios.get("http://192.168.100.39:3001/api/userModel/get").then((response) => {
            setDataList(response.data)
        })
    }, [dataList])

    // useEffect(() => {
    //     Axios.get("http://localhost:5500/getdata").then((response) => {
    //         setDataList(response.data)
    //     })
    // }, [dataList2])

    const removeData = (val) => {
        console.log(val)
        Axios.post("http://192.168.100.39:3001/api/userModel/remove", {del: val})
    }

    return (
        <div className="page-manager" id="page-manager">
            <div className="side-bar-manager">
                <div className="logo-titulo-sidebar-manager">
                    <img className="logo" src={logo} alt="logo"/>
                    <strong className="titulo"></strong>
                </div>
                <button onClick={() => {window.location.pathname="/"}}
                        className="back-button-manager" >Voltar
                </button>
            </div>
            <div className="aproveClients">
                {dataList.map((val) => {
                    return (
                        console.log(val),
                        <div className="dinamic-buttons" id="dinamic-buttons" key={val._id}>
                            <button className="client-button" onClick={() => {removeData(val._id)}}>
                                <button className="aprove-client" ><img src={check}/></button>
                                {val.name}
                                <button className="del-client" ><img src={del}/></button> 
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}