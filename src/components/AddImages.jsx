import React, { useState, useEffect } from 'react'
import Axios from "axios"
import Edit from './Edit'

import '../css/AddImages.css'
import '../css/sidebarAddImages.css'
import '../css/editFormAddImages.css'

import logo from '../img/logo.svg'

export default () => {

    const [url, setUrl] = useState('')
    const [style, setStyle] = useState('')

    const addImages = () => {
        Axios.post("http://172.16.30.171:3001/api/imageModel/save", {url: url, style: style}).then(() => {
        window.location.pathname="/addimages"
       })        
    }

    return (
        <div className="page-addimages" id="page-addimages">
            <div className="side-bar-addimages">
                <div className="logo-titulo-sidebar-addimages">
                    <img className="logo" src={logo} alt="logo"/>
                    <strong className="titulo"></strong>
                </div>
                <div className="sidebar-addimages-buttons">
                    <button onClick={() => {window.location.pathname="/manager"}}
                            className="back-button-addimages" >Voltar
                    </button>
                </div>
            </div>
            <h1>Adicionar Imagens</h1>
            <div className="container-addimages">
                <div className="addimages-form">
                    <form action="/" method="get">
                        <div className="input-block-addimages">
                            <label htmlFor="URL">
                                URL da imagem
                            </label>
                            <input type="url" id="url" onChange={(e) => setUrl(e.target.value)}/>
                        </div>
                        <div className="input-block-addimages">
                            <label htmlFor="name">Estilo da Tattoo</label>
                            <input list="styles" onChange={(e) => { setStyle(e.target.value) }} required/>
                            <dataList id="styles">
                                <option value="Flash" />
                                <option value="Floral" />
                                <option value="Pontilhismo" />
                                <option value="lettering" />
                            </dataList>
                        </div>
                        <a  onClick={() => {
                                if ((url !== "") && (style !== "")) {
                                    addImages()
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
                    </form>
                </div>
            </div>
            
        </div>
    )
}