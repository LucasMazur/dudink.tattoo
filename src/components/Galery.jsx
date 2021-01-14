import React, { useState } from 'react'

import '../css/sidebar.css'
import '../css/galery.css'

import logo from '../img/logo.svg'

import image1 from '../img/image1.jpg'
import image2 from '../img/image2.jpg'
import image3 from '../img/image4.png'

export default () => {
    
    const [list, setList] = useState ('Old School')

    const [image, setImage] = useState (image1)

    return (
        <div className="page-galery" id="page-galery">
            <div className="side-bar">
                <div className="logo-titulo-sidebar">
                    <img className="logo" src={logo} alt="logo"/>
                    <strong className="titulo"></strong>
                </div>   
                <ul>
                    <li onClick={(e) => { 
                        setList(e.target.textContent)}}>
                        Old School</li>
                    <li onClick={(e) => { 
                        setList(e.target.textContent)}}>
                        Letterings</li>
                    <li onClick={(e) => { 
                        setList(e.target.textContent)}}>
                        Realist</li>
                    <li onClick={(e) => { 
                        setList(e.target.textContent)}}>
                        Tribals</li>
                    <li onClick={(e) => { 
                        setList(e.target.textContent)}}>
                        Maoris</li>
                </ul>
                <button onClick={() => {window.location.pathname="/"}}
                        className="back-button-galery" >Voltar
                </button>
            </div>
            <div className="galery">
                <h1>{list}</h1>
                <img src={image} alt=""/>
                <div className="images"
                    onClick={(e) => {
                        setImage(e.target.src)
                    }}>
                    <button type="button"
                        onClick={(e) => {
                            setImage(e.target.src)
                        }}>
                        <img src={image1} alt=""/>
                    </button>
                    <button type="button"
                        onClick={(e) => {
                            setImage(e.target.src)
                        }}>
                        <img src={image2} alt=""/>
                    </button>
                    <button type="button"
                        onClick={(e) => {
                            setImage(e.target.src)
                        }}>
                        <img src={image3} alt=""/>
                    </button>
                </div>
            </div>
        </div>
    )
}