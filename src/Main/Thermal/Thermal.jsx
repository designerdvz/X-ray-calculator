import React from 'react'
import s from './thermal.module.css'
import Modal from '../../Modal/Modal'
import ThermalGroupChoose from '../Thermal/ThermalGroupChoose/ThermalGroupChoose'

function Thermal() {
    let modalText = 
    'Необходимо вычислить значения проходящего тепла через стенки, для этого необходимо знать расход жидкости. Конструкция подводящей жидкость трубки может быть либо проточной, либо с системой трубок. Вычислите параметры и проверьте, подходят ли значения к вашей трубке.'
    return (
        <div className={s.wrapper}>
            <div className={s.content}>
                <Modal text={modalText} />
                <ThermalGroupChoose />
            </div>
        </div>
    )
}
export default Thermal
