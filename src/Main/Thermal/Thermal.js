import s from "../Themperature/Themperature.module.css";
import Modal from "../../Modal/Modal";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import thermalImg from "../../images/Thermal.png";
import {setParametr} from "../../store/thermal";

const Thermal = () => {
    let {d2, d, ro, l2, l1, r1, r2, tst, tzh } = useSelector((state) => state.thermal)

    function roundPlus(x, n) { //x - число, n - количество знаков
        if (isNaN(x) || isNaN(n)) return false;
        let m = Math.pow(10, n);
        return Math.round(x * m) / m;
    }


    const dispatch = useDispatch()
    const [Q1, setQ1] = useState(0)
    const [Q2, setQ2] = useState(0)
    const [V1, setV1] = useState(0)
    const [V2, setV2] = useState(0)
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
                        <span id={s.labeld}>внутренний диаметр зазора, м</span>
                        <input type="number" value={d} min={0.001}
                               onChange={(event) => dispatch(setParametr({parametr: 'd', ref: event.target.value}))}/>
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
                            let S1 = Math.PI * ((d2 * d2) / 4)
                            let S2 = Math.PI * ((d * d) / 4)
                            let L = 2 * Math.PI * d
                            let A = 1 // коэффициент температуропроводности
                            let d3 = (4 * S2)/L //эквивалентный диаметр цилиндрического зазора
                            let W = 1.5 // кинематическая вязкость жидкости, м2/сек
                            let Pr = W/A
                            let Re1 = (V1 * d2) / W
                            let Re2 = (V2 * d3) / W
                            console.log(`S1 = ${S1} S2 = ${S2} L = ${L} V1 = ${V1} V2 = ${V2} d3 = ${d3} Pr = ${Pr} `)
                            let A1 = 1.68 * Math.pow(Re1, 0.46) * Math.pow(Pr, 0.4) * (l1 / d2) //коэффициент теплоотдачи
                            let A2 = 0.22 * Math.pow(Re2, 0.6) * Math.pow(Pr, 0.4) * (l1 / d3) //коэффициент теплоотдачи
                            let F1 = Math.PI * r1 * r1
                            let F2 = Math.PI * r2 * r2
                            let m = Math.pow((A2 * 0.25)/(l2 * F2), 0.5)
                            setQ1(roundPlus((A1 * F1 * (tst - tzh)), 2))
                            setQ2(roundPlus((tst - tzh) * l2 * F2 * m * tst * 0.25, 2))
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