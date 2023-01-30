import React, {useRef, useState} from "react";
import s from './withCase.module.css'
import Modal from "../../../Modal/Modal";
import caseImg from "../../../images/WithCase.png"
import {Tooltip} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {calculate_d} from "../../../store/electricWithCase";
import {setParametr} from "../../../store/electricWithCase";

function WithCase() {
    let modalText = "Задача раздела об электрической прочности рентгеновской трубки- оценить способность прибора обеспечивать стабильную работу при приложении к электродам заданного высокого напряжения. Необходимо вычислить геометрические параметры: межэлектродное расстояние, а также, исходя из выбора конструктивной группы, могут потребоваться вычисления и других параметров, таких как расстояние электрод-баллон, внутренний диаметр анодного узла, диаметр катодного узла. Все размеры вычисляются исходя из выбранных параметров: приложенного напряжения, материала мишени и конструктивной группы."

    const dispatch = useDispatch()

    const {d, U, C, K} = useSelector((state) => state.electric_withCase)

    return (
        <div className={s.wrapper}>
            <div className={s.content}>
                <div className={s.OneColomn}>
                    <Modal text={modalText}/>
                    <b>Выбрана группа с чехлом на аноде</b>
                    <img className={s.caseImg} src={caseImg}/>
                    <b>Введите начальные значения:</b>
                    <div className={s.item}>
                        <span>U, кВ</span>
                        <input type="number" value={U} onChange={(event) => dispatch(setParametr({parametr: 'U', ref: event.target.value}))} />
                    </div>
                    <div className={s.item}>
                        Коэффициенты, которые были определены исходя из выбора <br/>
                        конструктивной группы и являются постоянными, при желании можно изменить:
                    </div>
                    <div className={s.item}>
                        <Tooltip describeChild title="С - Коэффициент, зависящий от конфигурации электродов, формы кривой напряжения и некоторых других факторов">
                            <span>C, кВ/мм^2 </span>
                        </Tooltip>
                        <input type="number" value={C} step="0.1" onChange={(event) => dispatch(setParametr({parametr: 'C', ref: event.target.value}))}/>
                    </div>
                    <div className={s.item}>
                        <Tooltip  describeChild title="К - Коэффициент, зависящий от конфигурации электродов, формы кривой напряжения и некоторых других факторов">
                            <span>K</span>
                        </Tooltip>
                        <input type="number" value={K} step="0.1" onChange={(event) => dispatch(setParametr({parametr: 'K', ref: event.target.value}))}/>
                    </div>
                    <button className={s.button1} onClick={() => {
                        let d1 = U/C;
                        let d2 = 1/K;
                        dispatch(calculate_d({d1,d2}))
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
                        <span>d,мм</span>
                        <input type="number" value={d} disabled />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WithCase;