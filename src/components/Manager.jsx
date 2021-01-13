import React, { useState, useEffect } from 'react'
import Axios from "axios"
import Edit from './Edit'

import '../css/AproveClients.css'
import '../css/sidebarManager.css'

import logo from '../img/logo.svg'
import check from '../img/check.svg'
import del from '../img/delete.svg'

export default () => {

    const [date, setDate] = useState('')
    const [name, setName] = useState('')
    const [body, setBody] = useState('')
    const [size, setSize] = useState('')

    let edit = 0
    const [dataList, setDataList] = useState([])
    const [dataList2, setDataList2] = useState([])

    useEffect(() => {
        Axios.get("http://172.16.30.171:3001/api/userModel/get").then((response) => {
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
        Axios.post("http://172.16.30.171:3001/api/userModel/remove", {del: val})
    }

    const updateData = (val) => {
        console.log(val)
        Axios.post("http://172.16.30.171:3001/api/userModel/update", {id: val})
    }

    const editData = (val) => {
        //console.log(val)
        setName(val.name)
        setDate(val.date)
        setBody(val.body)
        setSize(val.size)
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
            {/* <h1>Gerenciamento de agendamentos</h1> */}
            <div className="container">
                <div className="aproveClients">
                    {dataList.map((val) => {
                        return (
                            console.log(val),
                            <div className="dinamic-buttons" id="dinamic-buttons" key={val._id}>
                                <button className="client-button" onClick={() => {editData(val)}}>
                                    <button className="aprove-client" ><img src={check}/></button>
                                    {val.name}
                                    <button className="del-client" onClick={() => {removeData(val._id)}} ><img src={del}/></button> 
                                </button>
                            </div>
                        )
                    })}
                </div>
                <Edit name={name} date={date} body={body} size={size}  />
            </div>
            
        </div>
    )
}