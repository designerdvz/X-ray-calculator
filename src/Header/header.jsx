import React from 'react'
import './header.css'
import NavBar from '../NavBar/NavBar'

function Header() {
    return (
        <div className={'header_wrapper'}>
            <div className={'header_default'}>
                Расчёт характеристик рентгеновской трубки
            </div>
            <NavBar />
        </div>
    )
}
export default Header
