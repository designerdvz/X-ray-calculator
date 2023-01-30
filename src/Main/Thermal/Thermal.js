import s from "../Themperature/Themperature.module.css";
import Modal from "../../Modal/Modal";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import thermalImg from "../../images/Thermal.png";
import {calculate_Q1, calculate_Q2, setParametr } from "../../store/thermal";

const Thermal = () => {
    let {d2, d, ro, l2, l1, r1, r2, tst, tzh, Q1, Q2, L, al1, l, al2} = useSelector((state) => state.thermal)

    const dispatch = useDispatch()
    let modalText = 'Считаем количество теплоты'
    return (
        <div className={s.wrapper}>
            <div className={s.content}>
                <div className={s.OneColomn}>
                    <Modal text={modalText}/>
                    <b>Выберите параметры:</b>
                    <div className={s.item}>
                        <span id={s.labeld2}>внутренний диаметр подводящей трубки, см</span>
                        <input type="number" value={d2}
                               onChange={(event) => dispatch(setParametr({parametr: 'd2', ref: event.target.value}))}/>
                    </div>
                    <div className={s.item}>
                        <span id={s.labeld}>внутренний диаметр зазора, см</span>
                        <input type="number" value={d}
                               onChange={(event) => dispatch(setParametr({parametr: 'd', ref: event.target.value}))}/>
                    </div>
                    <div className={s.item}>
                        <span id={s.labelro}>плотность жидкости, кг/м^3</span>
                        <input type="number" value={ro}
                               onChange={(event) => dispatch(setParametr({parametr: 'ro', ref: event.target.value}))}/>
                    </div>
                    <div className={s.item}>
                        <span id={s.labell2}>теплопроводность стенок анода</span>
                        <input type="number" value={l2}
                               onChange={(event) => dispatch(setParametr({parametr: 'l2', ref: event.target.value}))}/>
                    </div>
                    <div className={s.item}>
                        <span id={s.labell1}>теплопроводность жидкости</span>
                        <input type="number" value={l1}
                               onChange={(event) => dispatch(setParametr({parametr: 'l1', ref: event.target.value}))}/>
                    </div>
                    <div className={s.item}>
                        <span id={s.labelr1}>радиус кривизны наружной стенки</span>
                        <input type="number" value={r1}
                               onChange={(event) => dispatch(setParametr({parametr: 'r1', ref: event.target.value}))}/>
                    </div>
                    <div className={s.item}>
                        <span id={s.labelr2}>радиус кривизны внутренней стенки</span>
                        <input type="number" value={r2}
                               onChange={(event) => dispatch(setParametr({parametr: 'r2', ref: event.target.value}))}/>
                    </div>
                    <div className={s.item}>
                        <span id={s.labeltst}>температура охлаждаемой стенки</span>
                        <input type="number" value={tst}
                               onChange={(event) => dispatch(setParametr({parametr: 'tst', ref: event.target.value}))}/>
                    </div>
                    <div className={s.item}>
                        <span id={s.labeltzh}>температура охлаждающей жидкости</span>
                        <input type="number" value={tzh}
                               onChange={(event) => dispatch(setParametr({parametr: 'tzh', ref: event.target.value}))}/>
                    </div>
                    <div className={s.item}>
                        <button className={s.button1} onClick={(event) => {
                            dispatch(calculate_Q2({d, L, al1, l, r2, al2, tst, tzh}))
                            dispatch(calculate_Q1({d2, al1, r1, tst, tzh}))
                        }}> Вычислить
                        </button>
                    </div>
                </div>
                <div className={s.TwoColomn}>
                    <img className={s.termoImg} src={thermalImg}/>
                    <div className={s.resultsItem}>
                        <b>Результат вычисления:</b>
                    </div>
                    <div className={s.item}>
                        <span> тепло, отдаваемое торцевой частью охлаждаемой поверхности, ккал/ч </span>
                        <input type="number" value={Q1} disabled/>
                    </div>
                    <div className={s.item}>
                        <span> тепло, отдаваемое цилиндрической частью охлаждаемой поверхности, ккал/ч </span>
                        <input type="number" value={Q2} disabled/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Thermal