import React, { useState } from 'react'
import Axios from "axios"

import '../css/editForm.css'

export default (props) => {

    const [date, setDate] = useState('0')
    const [dateF, setDateF] = useState('0')
    const [hour, setHour] = useState('0')
    const [name, setName] = useState('0')
    const [nameF, setNameF] = useState('0')
    const [body, setBody] = useState('0')
    const [size, setSize] = useState('0')
    const [price, setPrice] = useState('0')
    const id = props.id

    const updateData = (val) => {
        Axios.post(`${process.env.REACT_APP_LINK_DEV}/client/update`, {name: name, date: date, hour:hour, body: body, size:size, id: id}).then(() => {
        window.location.pathname="/manager"
       })        
    }

    const removeData = (id) => {
        Axios.post(`${process.env.REACT_APP_LINK_DEV}/client/remove`, {del: id}).then(() => {
            window.location.pathname="/manager"
        })
    }

    const finishClient = (id) => {
        Axios.post(`${process.env.REACT_APP_LINK_DEV}/finish/save`, {name: nameF, price: price, date: dateF}).then(() => {
            window.location.pathname="/manager"
        }).then(() => {removeData(id)})
    }

    return (
        <div className="edit-form">
            <form action="/" method="get">
                <div className="input-block-edit">
                    <label htmlFor="date">
                        Data
                        <span>Escolha a data ao lado</span>
                    </label>
                    <input type="date" id="date-pick" defaultValue={props.date} onChange={(e) => {
                        setDate(e.target.value)       
                    }}/>
                </div>
                <div className="input-block-edit">
                    <label htmlFor="hout">
                        Horário
                    </label>
                    <input type="time" id="hour" min="15:00" max="20:30" defaultValue={props.hour} onChange={(e) => {
                        setHour(e.target.value)
                    }}/>
                </div>
                <div className="input-block-edit">
                    <label htmlFor="name">Nome</label>
                    <input id="name" type="text" defaultValue={props.name} onBlur={(e) => {setName(e.target.value)}} required/>
                </div>
                <div className="input-block-edit">
                    <label htmlFor="body">Qual parte do corpo quer tatuar</label>
                    <input id="body" type="text" defaultValue={props.body} onBlur={(e) => { setBody(e.target.value) }} required/>
                </div>
                <div className="input-block-edit">
                    <label htmlFor="size">Tamanho do desenho (em cm)</label>
                    <input id="size" type="text" defaultValue={props.size} onBlur={(e) => { setSize(e.target.value) }} required/>
                </div>
                <div className="input-block-edit">
                    <label htmlFor="price">Valor</label>
                    <input id="price" type="text" onBlur={(e) => { 
                        setPrice(e.target.value)
                        setNameF(props.name)
                        setDateF(props.date)
                    }} required/>
                </div>
                <a  onClick={() => {
                        if ((name !== "") && (date !== "") && (body !== "") && (size !== "")) {
                            updateData()
                        } else {
                            alert('Favor Preencher todos os campos')                           
                        }
                }}
                    type="button"
                    className="primary-button"
                    >
                    Salvar
                </a>
                <a  onClick={() => {
                    if ((price === "0") && (name !== "") && (date !== "")) {
                        alert('Favor preencher o valor da Tattoo')
                    } else {
                        finishClient(id)                                             
                    }
                }}
                    type="button"
                    className="primary-button-finish"
                    >
                    Concluir
                </a>
                <a  onClick={() => {removeData(id)}}
                    type="button"
                    className="primary-button-delete"
                    >
                    Excluir
                </a>
            </form>
        </div>
    )
}