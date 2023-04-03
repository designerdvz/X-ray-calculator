import React, {useState} from 'react';
import s from './Themperature.module.css'
import Header from "../../Header/header";
import Footer from "../../Footer/footer";
import Modal from "../../Modal/Modal";
import {useRef} from "react";
import termoImg from "../../images/Termo.png";
import {IconButton, Tooltip} from "@mui/material";
import {setParametr} from "../../store/themperature";
import {useDispatch, useSelector} from "react-redux";
import {calculate_Pmax, calculate_Tfp, calculate_Ts, calculate_Tsp} from "../../store/themperature";

function Themperature() {
    const dispatch = useDispatch()
    const [Tfp, setTfp] = useState(0)
    const [Pmax, setPmax] = useState(0)
    const [Tsp, setTsp] = useState(0)
    const [Ts, setTs] = useState(0)

    let modalText = "Необходимо корректно подобрать параметры: радиус и толщину анода, а также толщину мишени.  Основываясь на них, программа вычисляет температурные параметры, которые нужно сравнить с предельно допустимыми для данного материала. К примеру, получив результат температуры в сечении, равный 1900°С, можно сделать вывод о том, что для материала медь, значение выходит за предел допустимого (800°С), это означает то, что нужно менять параметры, но если будет использован вольфрам, с предельной температурой 2000°С, то выбранные значения корректны."
    let {Ra, Ha, P, Rf, Tosn, Hm, TfpMAX} = useSelector((state) => state.themperature)
let la, lm = 0
    let x, y = 0
    let c = [[2, 1.429, 1.111, 0.909, 0.769], //Двумерный массив для fm и ff
        [1.429, 1.111, 0.909, 0.769, 0.667],
        [1.111, 0.909, 0.769, 0.667, 0.588],
        [0.909, 0.769, 0.667,],
        [8.333, 3.125, 1.923, 1.389, 1.087],
        [9.259, 3.472, 2.137, 1.543, 1.208],
        [10.417, 3.906, 2.404, 1.736, 1.359],
        [11.905, 4.464, 2.747, 1.984, 1.553]]

    let a, b = c[0][0]

    x = Rf / Ra;
    y = Hm / Ra;

    if (x <= 0.1) {
        if (y <= 0.1) {
            a = c[0][0];
            b = c[4][0];
        }
        if (y > 0.1 && y <= 0.2) {
            a = c[1][0];
            b = c[5][0];
        }
        if (y > 0.2 && y <= 0.3) {
            a = c[2][0];
            b = c[6][0];
        }
        if (y > 0.3 && y <= 0.4) {
            a = c[3][0];
            b = c[7][0];
        }
    }
    if (x > 0.1 && x <= 0.2) {
        if (y <= 0.1) {
            a = c[0][1];
            b = c[4][1];
        }
        if (y > 0.1 && y <= 0.2) {
            a = c[1][1];
            b = c[5][1];
        }
        if (y > 0.2 && y <= 0.3) {
            a = c[2][1];
            b = c[6][1];
        }
        if (y > 0.3 && y <= 0.4) {
            a = c[3][1];
            b = c[7][1];
        }
    }
    if (x > 0.2 && x <= 0.3) {
        if (y <= 0.1) {
            a = c[0][2];
            b = c[4][2];
        }
        if (y > 0.1 && y <= 0.2) {
            a = c[1][2];
            b = c[5][2];
        }
        if (y > 0.2 && y <= 0.3) {
            a = c[2][2];
            b = c[6][2];
        }
        if (y > 0.3 && y <= 0.4) {
            a = c[3][2];
            b = c[7][2];
        }
    }
    if (y > 0.3 && y <= 0.4) {
        if (y <= 0.1) {
            a = c[0][3];
            b = c[4][3];
        }
        if (y > 0.1 && y <= 0.2) {
            a = c[1][3];
            b = c[5][3];
        }
        if (y > 0.2 && y <= 0.3) {
            a = c[2][3];
            b = c[6][3];
        }
        if (y > 0.3 && y <= 0.4) {
            a = c[3][3];
            b = c[7][3];
        }
    }
    if (x >= 0.5) {
        if (y <= 0.1) {
            a = c[0][4];
            b = c[4][4];
        }
        if (y > 0.1 && y <= 0.2) {
            a = c[1][4];
            b = c[5][4];
        }
        if (y > 0.2 && y <= 0.3) {
            a = c[2][4];
            b = c[6][4];
        }
        if (y > 0.3 && y <= 0.4) {
            a = c[3][4];
            b = c[7][4];
        }
    }


    const [valueA, setValueA] = useState('Wolframium');
    const [valueM, setValueM] = useState('Wolframium');

    function changeSelectA(event) {
        setValueA(event.target.value);
    }
        function roundPlus(x, n) { //x - число, n - количество знаков
            if(isNaN(x) || isNaN(n)) return false;
            let m = Math.pow(10,n);
            return Math.round(x*m)/m;
        }

    function changeSelectM(event) {
        setValueM(event.target.value);
    }

let [valid, setValid] = React.useState(true)

    return (
        <div className={s.wrapper}>
            <div className={s.content}>
                <div className={s.OneColomn}>
                    <Modal text={modalText}/>
                    <b>Выберите параметры:</b>
                    <div className={s.item}>
                        <span id={s.labelRa}>радиус анода, см</span>
                        <input className={valid ? '' : s.invalid} type="number" value={Ra} min={0.5} max={2} step={0.1} onChange={(event) => dispatch(setParametr({parametr: 'Ra', ref: event.target.value}))} />
                    </div>
                    {!valid && <div className={s.item}>
                        <span className={s.invalid}> Толщина анода должна превышать радиус анода в 2 раза. </span>
                    </div>}
                    <div className={s.item}>
                        <span id={s.labelHa}>Толщина анода, см</span>
                        <input className={valid ? '' : s.invalid} type="number" value={Ha} min={4.5} max={9} step={0.5}onChange={(event) => dispatch(setParametr({parametr: 'Ha', ref: event.target.value}))} />
                    </div>
                    <div className={s.item}>
                        <span id={s.labelP}>Мощность трубки, Вт</span>
                        <input type="number" value={P} min={500} max={3000} onChange={(event) => dispatch(setParametr({parametr: 'P', ref: event.target.value}))} />
                    </div>
                    <div className={s.item}>
                        <span>Радиус фокусного пятна, см</span>
                        <input type="number" value={Rf} onChange={(event) => dispatch(setParametr({parametr: 'Rf', ref: event.target.value}))} />
                    </div>
                    <div className={s.item}>
                        <span>Температура основания анода,</span>
                        <input type="number" value={Tosn} min={70} max={90} onChange={(event) => dispatch(setParametr({parametr: 'Tosn', ref: event.target.value}))} />
                    </div>
                    <div className={s.item}>
                        <span>Толщина мишени, см</span>
                        <input type="number" value={Hm} min={0.5} max={2} onChange={(event) => dispatch(setParametr({parametr: 'Hm', ref: event.target.value}))} />
                    </div>
                    <div className={s.item}>
                        <span>Материал анода:</span>
                        <select value={valueA} onChange={changeSelectA}>
                            <option value="Wolframium">Вольфрам</option>
                            <option value="Cuprum">Медь</option>
                        </select>
                    </div>
                    <div className={s.item}>
                        <span>Материал мишени:</span>
                        <select value={valueM} onChange={changeSelectM}>
                            <option value="Wolframium">Вольфрам</option>
                            <option value="Cuprum">Медь</option>
                            <option value="Molybdaenum">Молибден</option>
                            <option value="Argentum">Серебро</option>
                            <option value="Rhenium">Рений</option>
                        </select>
                    </div>
                    <div className={s.item}>

                        <button className={s.button1} onClick={(event) => {
                            if (Ha >= Ra * 2) {
                                setValid(true)
                                if (valueA == 'Wolframium') { //данные взяты из интернета (теплопроводность в Вт/см*цельсий)
                                    la = 1.63
                                } else if (valueA == 'Cuprum') {
                                    la = 3.8
                                }
                                if (valueM == 'Wolframium') {
                                    lm = 1.63
                                } else if (valueM == 'Cuprum') {
                                    lm = 3.80
                                } else if (valueM == 'Molybdaenum') {
                                    lm = 1.35
                                } else if (valueM == 'Argentum') {
                                    lm = 4.30
                                } else if (valueM == 'Rhenium') {
                                    lm = 0.48
                                }
                                setTs(roundPlus((Tosn + (P * (Ha - 2 * Ra)) / (Math.PI * Ra * Ra * la)), 2))
                                setTsp(roundPlus(((roundPlus((Tosn + (P * (Ha - 2 * Ra)) / (Math.PI * Ra * Ra * la)), 2)) + ((P) / (Math.PI * Ra * lm)) * a), 2))
                                setTfp(roundPlus(((roundPlus((Tosn + (P * (Ha - 2 * Ra)) / (Math.PI * Ra * Ra * la)), 2)) + (P) / (Math.PI * Ra * lm) * b), 2))
                                console.log(la, lm, a, b)
                                setPmax(roundPlus((((TfpMAX - Tosn) * Math.PI * Ra * Ra * lm) / (Ha - 2 * Ra + b * Ra)), 2))

                            } else {
                                setValid(false)
                                setPmax(0)
                                setTfp(0)
                                setTs(0)
                                setTsp(0)
                            }
                        }
                        }> Вычислить
                        </button>
                    </div>
                </div>
                <div className={s.TwoColomn}>
                    <img className={s.termoImg} src={termoImg}/>
                    <div className={s.resultsItem}>
                        <b>Результат вычисления:</b>
                    </div>
                    <div className={s.item}>
                        <span> Температура центра фокусного пятна, </span>
                        <input type="number" value={Tfp} disabled />
                    </div>
                    <div className={s.item}>
                        <span>  Максимально допустимая мощность, Вт</span>
                        <input type="number" value={Pmax} disabled />
                    </div>
                    <div className={s.item}>
                        <span> Температура в центре спая мишени с анодом,</span>
                        <input type="number" value={Tsp} disabled />
                    </div>
                    <div className={s.item}>
                        <span>Температура в сечении,</span>
                        <input type="number" value={Ts} disabled />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Themperature;