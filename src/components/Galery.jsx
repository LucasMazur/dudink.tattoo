import React, { useState, useEffect } from 'react'
import Axios from "axios"

import '../css/sidebar.css'
import '../css/galery.css'

import logo from '../img/logo.svg'

import image1 from '../img/image1.jpg'
import image2 from '../img/image2.jpg'
import image3 from '../img/image4.png'

export default () => {
    
    const [list, setList] = useState ('Old School')

    const [image, setImage] = useState (image1)
    const teste = ''

    useEffect(() => {
        Axios.get("http://172.16.30.171:3001/api/imageModel/get").then((response) => {
            console.log(response.data[4].url)
            //teste = response.data[1].url
            setImage(response.data[4].url)
        })
        console.log(image)
    })

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
                <img src="https://photos.app.goo.gl/48FyjkSDLw4aAD2X8" alt=""/>
                <div className="images"
                    onClick={(e) => {
                        setImage(e.target.src)
                    }}>
                    <button type="button"
                        onClick={(e) => {
                            setImage(e.target.src)
                        }}>
                        <img src="https://lh3.googleusercontent.com/pw/ACtC-3fm5BXNpAtymGT3EyZDfhVx65VSdWFgQVqTGCGTOzm6m8T5XsyYBbbu6DE1B30T46bvOB9Yvk5BKXzdUFxMIw4g8MKk_4AskWSBKd71V1ElLzb2-vK_W6baai8q-qU8wTeLYjTY5LM8jTLWBhGCZkY=w405-h540-no?authuser=0" alt=""/>
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