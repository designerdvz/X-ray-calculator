import React from "react";
import s from './withTwo.module.css'
import {useRef} from "react";
import Modal from "../../../Modal/Modal";
import TwoImg from "../../../images/WithTwo.png";
import {Tooltip} from "@mui/material";

function WithTwo () {
    let modalText = "Задача раздела об электрической прочности рентгеновской трубки- оценить способность прибора обеспечивать стабильную работу при приложении к электродам заданного высокого напряжения. Необходимо вычислить геометрические параметры: межэлектродное расстояние, а также, исходя из выбора конструктивной группы, могут потребоваться вычисления и других параметров, таких как расстояние электрод-баллон, внутренний диаметр анодного узла, диаметр катодного узла. Все размеры вычисляются исходя из выбранных параметров: приложенного напряжения, материала мишени и конструктивной группы."

    let d = 0
    let D2 = 0
    let D1 = 0
    let U = 0
    let C = 33
    let K = 0.6

    const dInput = useRef(0)
    const D1Input = useRef(0)

    function showInputU(event) {
        U = (event.target.value)
    }

    function showInputC(event) {
        C = (event.target.value)
    }

    function showInputK(event) {
        K = (event.target.value)
    }
    function showInputD2(event) {
        D2 = (event.target.value)
    }


    return (
        <div className={s.wrapper}>
            <div className={s.content}>
                <div className={s.OneColomn}>
                    <Modal text = {modalText}/>
                    <b>Выбрана группа с двумя межэлектродными промежутками </b>
                    <img className={s.caseImg} src={TwoImg}/>
                    <b>Введите начальные значения:</b>
                    <div className={s.item}>
                        U, кВ
                        <input type="number" onInput={showInputU}/>
                    </div>
                    <div className={s.item}>
                        D2, мм
                        <input type="number" onInput={showInputD2}/>
                    </div>
                    <div className={s.item}>
                        Коэффициенты, которые были определены исходя из выбора <br/>
                        конструктивной группы и являются постоянными, при желании можно изменить:
                    </div>
                    <div className={s.item}>
                        <Tooltip  describeChild title="C - Коэффициент, зависящий от конфигурации электродов, формы кривой напряжения и некоторых других факторов">
                            <div>  C, кВ/мм^2 </div>
                        </Tooltip>
                        <input type="number" onInput={showInputC} defaultValue={33}/>
                    </div>
                    <div className={s.item}>
                        <Tooltip  describeChild title="К - Коэффициент, зависящий от конфигурации электродов, формы кривой напряжения и некоторых других факторов">
                            <div> K </div>
                        </Tooltip>
                        <input type="number" onInput={showInputK} defaultValue={0.6} step="0.1"/>
                    </div>
                    <button onClick={() => {
                        let d1 = U / C;
                        let d2 = 1 / K;
                        d = Math.pow(d1, d2);
                        D1 = D2 * Math.exp((2*U)/(30*D2))
                        dInput.current.value = d
                        D1Input.current.value = D1
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
                        d,мм
                        <input type="number" ref={dInput} step="0.1"/>
                    </div>
                    <div className={s.item}>
                        D1,мм
                        <input type="number" ref={D1Input} step="0.1"/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default WithTwo;