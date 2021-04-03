import React, { useState, useEffect } from 'react'
import Axios from "axios"

import '../css/sidebar.css'
import '../css/galery.css'

import logo from '../img/logo.svg'

export default () => {
    
    const [list, setList] = useState ([])
    const [title, setTitle] = useState ('')

    const [image, setImage] = useState ([])
    const [imageUrl, setImageUrl] = useState ('')

    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_LINK_DEV}/themes/get`).then((response) => {
            setList(response.data)
            setTitle(response.data[0].theme)
        })

        Axios.post(`${process.env.REACT_APP_LINK_DEV}/images/get`, {style: "temática"}).then((response) => {
            setImage(response.data)
            setImageUrl(response.data[0].url)
        })
    }, [])

    const updateImages = (val) => {
        Axios.post(`${process.env.REACT_APP_LINK_DEV}/images/get`, {style: val}).then((response) => {
            setImage(response.data)
            setImageUrl(response.data[0].url)
        })
    }

    return (
        <div className="page-galery" id="page-galery">
            <div className="side-bar">
                <div className="logo-titulo-sidebar">
                    <img className="logo" src={logo} alt="logo"/>
                    <strong className="titulo">Dudink.Tattoo</strong>
                </div>  
                <ul>
                    {list.map((val) => {
                        return (
                            <li key={val._id}
                                onClick={(e) => {
                                    setTitle(e.target.innerHTML)
                                    updateImages(e.target.innerHTML)
                                }}>
                                {val.theme}
                            </li>
                        )
                    })}
                </ul>
                <button onClick={() => {window.location.pathname="/"}}
                        className="back-button-galery" >Voltar
                </button>
            </div>
            <div className="galery">
                <h1>{title}</h1>
                <img src={imageUrl} alt=""/>
                <div className="images">
                    {image.map((val) => {
                        return (
                            <button type="button" key={val._id}
                                onClick={(e) => {
                                    setImageUrl(e.target.src)
                                }}>
                                <img src={val.url} />
                            </button>
                        )                        
                    })}
                </div>
            </div>
        </div>
    )
}