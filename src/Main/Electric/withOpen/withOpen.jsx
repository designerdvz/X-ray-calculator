import React from "react";
import s from './withOpen.module.css'
import {useRef} from "react";
import Modal from "../../../Modal/Modal";
import openImg from "../../../images/WithOpen.png";
import {Tooltip} from "@mui/material";
import { useSelector, useDispatch } from 'react-redux'
import {calculate_d, calculate_r, setParametr} from "../../../store/electricWithOpenSlice";

function WithOpen () {
    let modalText = "Задача раздела об электрической прочности рентгеновской трубки- оценить способность прибора обеспечивать стабильную работу при приложении к электродам заданного высокого напряжения. Необходимо вычислить геометрические параметры: межэлектродное расстояние, а также, исходя из выбора конструктивной группы, могут потребоваться вычисления и других параметров, таких как расстояние электрод-баллон, внутренний диаметр анодного узла, диаметр катодного узла. Все размеры вычисляются исходя из выбранных параметров: приложенного напряжения, материала мишени и конструктивной группы."
    const {d, r, U, B, C, K} = useSelector((state) => state.electric_withOpen)
    const dispatch = useDispatch()

    return (
        <div className={s.wrapper}>
            <div className={s.content}>
                <div className={s.OneColomn}>
                    <Modal text={modalText}/>
                    <b>Выбрана группа с открытым полым пространством </b>
                    <img className={s.openImg} src={openImg}/>
                    <b>Введите начальные значения:</b>
                    <div className={s.item}>
                        <span id={s.labelU}>U, кВ</span>
                        <input type="number" step="1" min="1" max="100" value={U} onChange={(event) => dispatch(setParametr({parametr: 'U', ref: event.target.value}))} />
                    </div>
                    <div className={s.item}>
                        Коэффициенты, которые были определены исходя из выбора <br/>
                        конструктивной группы и являются постоянными, при желании можно изменить:
                    </div>
                    <div className={s.item}>
                        <Tooltip  describeChild title="C - Коэффициент, зависящий от конфигурации электродов, формы кривой напряжения и некоторых других факторов">
                            <span>C, кВ/мм^2</span>
                        </Tooltip>
                        <input type="number" value={C} onChange={(event) => dispatch(setParametr({parametr: 'C', ref: event.target.value}))}/>
                    </div>
                    <div className={s.item}>
                        <Tooltip  describeChild title="К - Коэффициент, зависящий от конфигурации электродов, формы кривой напряжения и некоторых других факторов">
                            <span>K</span>
                        </Tooltip>
                        <input type="number" step={'0.1'} value={K} onChange={(event) => dispatch(setParametr({parametr: 'K', ref: event.target.value}))}/>
                    </div>
                    <div className={s.item}>
                        <Tooltip  describeChild title="B - Коэффициент, зависящий от конфигурации электродов, формы кривой напряжения и некоторых других факторов">
                            <span>B, мм/кВ</span>
                        </Tooltip>
                        <input type="number" step={'0.1'} value={B} onChange={(event) => dispatch(setParametr({parametr: 'B', ref: event.target.value}))}/>
                    </div>
                    <button className={s.button1} onClick={() => {
                        let d1 = U/C;
                        let d2 = 1/K;
                        dispatch(calculate_d({d1,d2}))
                        dispatch(calculate_r({B,U}))
                    }}> Вычислить
                    </button>
                </div>
                <div className={s.TwoColomn}>
                    <div className={s.resultsItem}>
                        <b>Результат вычисления:</b>
                    </div>
                    <div className={s.item}>
                        Рассчитано межэлектродное расстояние
                    </div>
                    <div className={s.item}>
                        <span> d,мм</span>
                        <input type="number" value={d} disabled />
                    </div>
                    <div className={s.item}>
                        <span>rэб,мм</span>
                        <input type="number" value={r} disabled />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default WithOpen;