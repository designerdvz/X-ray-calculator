import React, {useState} from 'react';
import s from './NavBar.module.css';
import {NavLink} from "react-router-dom";


function NavBar() {
   const activeLink = ({isActive}) => isActive ? s.active : '';

    return (
        <div className={s.navBar}>
            <div className={s.content}>
                <div  className={s.item}>
                    <NavLink className={activeLink} to="/electric"> Электрическая прочность</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink  className={activeLink} to="/themperature"> Температура </NavLink>
                </div>
                <div className={s.item}>
                    <NavLink  className={activeLink} to="/thermal"> Тепловой режим</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink className={activeLink} to="/consumption"> Спектр излучения</NavLink>
                </div>
            </div>
        </div>
    )
}
export default NavBar;

