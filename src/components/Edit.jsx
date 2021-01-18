import React, { useState } from 'react'
import Axios from "axios"

import '../css/editForm.css'

export default (props) => {

    const [date, setDate] = useState('0')
    const [name, setName] = useState('0')
    const [body, setBody] = useState('0')
    const [size, setSize] = useState('0')
    const id = props.id

    const updateData = (val) => {
        Axios.post("http://172.16.30.171:3001/api/userModel/update", {name: name, date: date, body, size:size, id: id}).then(() => {
        window.location.pathname="/manager"
       })        
    }

    const removeData = (val) => {
        Axios.post("http://172.16.30.171:3001/api/userModel/remove", {del: val}).then(() => {
            window.location.pathname="/manager"
        })
    }

    return (
        <div className="edit-form">
            <form action="/" method="get">
                <div className="input-block-edit">
                    <label htmlFor="date">
                        Data
                        <span>Escolha a data ao lado</span>
                    </label>
                    <input type="date" id="date-pick" defaultValue={props.date} onChange={(e) => setDate(e.target.value)}/>
                </div>
                <div className="input-block-edit">
                    <label htmlFor="name">Nome</label>
                    <input id="name" type="text" defaultValue={props.name} onBlur={(e) => {setName(e.target.value)}} required/>
                </div>
                <div className="input-block-edit">
                    <label htmlFor="name">Qual parte do corpo quer tatuar</label>
                    <input id="name" type="text" defaultValue={props.body} onBlur={(e) => { setBody(e.target.value) }} required/>
                </div>
                <div className="input-block-edit">
                    <label htmlFor="name">Tamanho do desenho (em cm)</label>
                    <input id="name" type="text" defaultValue={props.size} onBlur={(e) => { setSize(e.target.value) }} required/>
                </div>
                <a  onClick={() => {
                        if ((name !== "") && (date !== "") && (body !== "") && (size !== "")) {
                            updateData()
                        } else {
                            alert('Favor Preencher todos os campos')                           
                        }
                }
                    }
                    type="button"
                    className="primary-button"
                    >
                    Salvar
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