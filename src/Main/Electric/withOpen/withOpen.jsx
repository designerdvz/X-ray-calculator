import React from "react";
import s from './withOpen.module.css'
import {useRef} from "react";
import Modal from "../../../Modal/Modal";
import openImg from "../../../images/WithOpen.png";

function WithOpen () {
    let modalText = "Задача раздела об электрической прочности рентгеновской трубки- оценить способность прибора обеспечивать стабильную работу при приложении к электродам заданного высокого напряжения. Необходимо вычислить геометрические параметры: межэлектродное расстояние, а также, исходя из выбора конструктивной группы, могут потребоваться вычисления и других параметров, таких как расстояние электрод-баллон, внутренний диаметр анодного узла, диаметр катодного узла. Все размеры вычисляются исходя из выбранных параметров: приложенного напряжения, материала мишени и конструктивной группы."

    let d = 0
    let r = 0
    let U = 0
    let B = 0
    let C = 42
    let K = 0.7
    const dInput = useRef(0)
    const rInput = useRef(0)

    function showInputU(event) {
        U = (event.target.value)
    }

    function showInputC(event) {
        C = (event.target.value)
    }

    function showInputK(event) {
        K = (event.target.value)
    }
    function showInputB(event) {
        B = (event.target.value)
    }

    return (
        <div className={s.wrapper}>
            <div className={s.content}>
                <div className={s.OneColomn}>
                    <Modal text={modalText}/>
                    <b>Выбрана группа с открытым полым пространством </b>
                    <img className={s.caseImg} src={openImg}/>
                    <b>Введите начальные значения:</b>
                    <div className={s.item}>
                        U, кВ
                        <input type="number" onInput={showInputU}/>
                        {/*<input type="number" onInput={showInput} step="1" min="1" max="100" id="age" name="age"/>*/}
                    </div>
                    <div className={s.item}>
                        Коэффициенты, которые были определены исходя из выбора <br/>
                        конструктивной группы и являются постоянными, при желании можно изменить:
                    </div>
                    <div className={s.item}>
                        C, кВ/мм^2
                        <input type="number" onInput={showInputC} defaultValue={42}/>
                    </div>
                    <div className={s.item}>
                        К
                        <input type="number" onInput={showInputK} defaultValue={0.7} step="0.1"/>
                    </div>
                    <div className={s.item}>
                        B, мм/кВ
                        <input type="number" onInput={showInputB} defaultValue={0} step="0.1"/>
                    </div>
                    <button onClick={() => {
                        let d1 = U/C;
                        let d2 = 1/K;
                        d = Math.pow(d1,d2);
                        dInput.current.value = d
                        r = 0.1 * B * U
                        rInput.current.value = r
                        console.log(`d1 = ${d1}, d2= ${d2}, d=${d}`)
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
                        <input type="number" ref={dInput} step="0.1" />
                    </div>
                    <div className={s.item}>
                        rэб,мм
                        <input type="number" ref={rInput} step="0.1" />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default WithOpen;