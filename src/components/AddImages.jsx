import React, { useState, useEffect } from 'react'
import Axios from "axios"
import Edit from './Edit'

import '../css/AddImages.css'
import '../css/sidebarAddImages.css'
import '../css/editFormAddImages.css'

import logo from '../img/logo.svg'

export default () => {

    const [imageName, setImageName] = useState('')
    const [url, setUrl] = useState('')
    const [style, setStyle] = useState('')

    const addImages = () => {
        Axios.post("http://localhost:3001/api/themes/save", {theme: style})
        Axios.post("http://localhost:3001/api/images/save", {imageName: imageName, url: url, style: style}).then(() => {
            window.location.pathname="/addImages"
       })        
    }

    return (
        <div className="page-addimages" id="page-addimages">
            <div className="side-bar-addimages">
                <div className="logo-titulo-sidebar-addimages">
                    <img className="logo" src={logo} alt="logo"/>
                    <strong className="titulo">Dudink.Tattoo</strong>
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
                            <label htmlFor="imageName">
                                Nome da imagem
                            </label>
                            <input type="text" id="imageName" onChange={(e) => setImageName(e.target.value)}/>
                        </div>
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
                                <option value="Temática" />
                                <option value="Flash" />
                                <option value="Floral" />
                                <option value="Escrita" />
                            </dataList>
                        </div>
                        <a  onClick={() => {
                                if ((url !== "") && (style !== "") && (imageName !== "")) {
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