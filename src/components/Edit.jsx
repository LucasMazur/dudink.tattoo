import React, { useState, useEffect } from 'react'
import Axios from "axios"

import '../css/editForm.css'

import whatsapp from '../img/whatsapp.svg'

export default (props) => {
    console.log(props)
    const [date, setDate] = useState('')
    const [name, setName] = useState('')
    const [body, setBody] = useState('')
    const [size, setSize] = useState('')
    const [data, setData] = useState('')
    const [dateList, setDateList] = useState('')
    const [message, setMessage] = useState('Ola, meu nome é ')

    const updateData = (val) => {
        console.log(val)
        Axios.post("https://dudink-tattoo-back.herokuapp.com/api/userModel/update", {id: val})
    }

    return (
        <div className="edit-form">
            <form action="/" method="get">
                <div className="input-block-edit">
                    <label htmlFor="date">
                        Data
                        <span>Escolha a data ao lado</span>
                    </label>
                    <textarea id="name" type="text" value={props.date} readOnly required/>
                </div>
                <div className="input-block-edit">
                    <label htmlFor="name">Nome</label>
                    <input id="name" type="text" value={props.name} onBlur={(e) => { 
                        setMessage(message + e.target.value)
                        setName(e.target.value)
                    }} required/>
                </div>
                <div className="input-block-edit">
                    <label htmlFor="name">Qual parte do corpo quer tatuar</label>
                    <input id="name" type="text" value={props.body} onBlur={(e) => { 
                        setMessage(message + ", gostaria de tatuar o meu " + e.target.value)
                        setBody(e.target.value)
                    }} required/>
                </div>
                <div className="input-block-edit">
                    <label htmlFor="name">Tamanho do desenho (em cm)</label>
                    <input id="name" type="text" value={props.size} onBlur={(e) => { 
                        setMessage(message + ", em um tamanho de aproximadamente " + e.target.value + "cm, no dia " + date.toString())
                        setSize(e.target.value) 
                    }} required/>
                </div>
                <a  onClick={() => {
                    if ((name !== "") && (date !== "") && (body !== "") && (size !== "")) {
                        console.log("ok")
                    } else {
                        alert('Favor Preencher todos os campos')                           
                    }
                    }}
                    type="button"
                    className="primary-button">
                    Salvar
                </a>
            </form>
        </div>
    )
}