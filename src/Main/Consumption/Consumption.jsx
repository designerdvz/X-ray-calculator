import React from 'react';
import s from  './consumption.module.css'
import Modal from "../../Modal/Modal";
import GroupChoose1 from "../Electric/FormControl";

function Consumption () {
    let modalText = "Тут краткая инструкция, что необходио выполнить в блоке расход жидкости."
    return (
        <div className={s.wrapper}>
            <div className={s.content}>
                <Modal text={modalText}/>

        </div>
        </div>
    )
}
export default Consumption;