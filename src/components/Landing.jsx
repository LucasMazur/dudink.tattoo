import React from 'react'

import '../css/landing.css'

import logo from '../img/logo.svg'
import insta from  '../img/insta.png'

export default () => {
    return (
        <div className="page-landing" id="page-landing">
            <header className="landing animate-up">
                <aside>
                    <a href="https://www.instagram.com/dudink.tattoo/" target="_blank">
                        <img src={insta} alt=""/>
                    </a>
                </aside>
                <hr/>
                <div className="header-container">
                    <div className="logo-titulo">
                        <img className="logo" src={logo} alt="logo"/>
                        <strong className="titulo"></strong>
                    </div>                    
                    <button onClick={() => {window.location.pathname="/galery"}}
                            className="landing-button galery-button">Visite a galeria</button>
                    <button onClick={() => {window.location.pathname="/schedule"}}
                            className="landing-button schedule-button">Agende um horário</button>
                </div>
            </header>
        </div>
    )
}