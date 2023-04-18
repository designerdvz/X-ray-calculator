import s from './tubeThermal.module.css'
import Modal from '../../../Modal/Modal'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import thermalImg from '../../../images/Thermal.png'
import { calculate_Q1, calculate_Q2, setParametr } from '../../../store/thermal'
import cat from '../../../images/Cat.jpg'

const TubeSystem = () => {
    let { d2, d, r1, r2, tst, tzh, Q1, Q2, l1, l2 } = useSelector(
        (state) => state.thermal
    )

    const dispatch = useDispatch()
    let modalText = 'Расчёты необходимо произвести самостоятельно! '

    return (
        <div className={s.wrapper}>
            <div className={s.content}>
                <div className={s.OneColomn}>
                    <Modal text={modalText} src={cat}/>
                </div>
            </div>
        </div>
    )
}

export default TubeSystem
