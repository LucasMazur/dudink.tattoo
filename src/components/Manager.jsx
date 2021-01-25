import React, { useState, useEffect } from 'react'
import Axios from "axios"
import Edit from './Edit'

import '../css/AproveClients.css'
import '../css/sidebarManager.css'

import logo from '../img/logo.svg'

export default () => {

    const [date, setDate] = useState('')
    const [name, setName] = useState('')
    const [body, setBody] = useState('')
    const [size, setSize] = useState('')
    const [id, setId] = useState('')

    const [dataList, setDataList] = useState([])
    const [dataList2, setDataList2] = useState([])

    useEffect(() => {
        Axios.get("http://localhost:3001/api/client/get").then((response) => {
            setDataList(response.data)
        })
    }, [])

    const editData = (val) => {
        setName(val.name)
        setDate(val.date)
        setBody(val.body)
        setSize(val.size)
        setId(val._id)
    }

    return (
        <div className="page-manager" id="page-manager">
            <div className="side-bar-manager">
                <div className="logo-titulo-sidebar-manager">
                    <img className="logo" src={logo} alt="logo"/>
                    <strong className="titulo">Dudink.Tattoo</strong>
                </div>
                <div className="sidebar-manager-buttons">
                    <button onClick={() => {window.location.pathname="/"}}
                            className="back-button-manager" >Voltar
                    </button>
                    <button onClick={() => {window.location.pathname="/calendar"}}
                        className="back-button-manager">Calendario
                    </button>
                    <button onClick={() => {window.location.pathname="/addImages"}}
                        className="back-button-manager">Imagens
                    </button>
                </div>
            </div>
            <h1>Gerenciamento de Agendamentos</h1>
            <div className="container">
                <div className="aproveClients">
                    {dataList.map((val) => {
                        return (
                            <div className="dinamic-buttons" id="dinamic-buttons" key={val._id}>
                                <button className="client-button" onClick={() => {editData(val)}}>
                                    {val.name}
                                </button>
                            </div>
                        )
                    })}
                </div>
                <Edit name={name} date={date} body={body} size={size} id={id}  />
            </div>
            
        </div>
    )
}