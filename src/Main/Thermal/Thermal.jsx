import React, {useState} from 'react';
import s from './thermal.module.css'
import Header from "../../Header/header";
import Footer from "../../Footer/footer";
import Modal from "../../Modal/Modal";
import {useRef} from "react";
import termoImg from "../../images/Termo.png";

function Thermal() {

    let modalText = "Необходимо корректно подобрать параметры: радиус и толщину анода, а также толщину мишени.  Основываясь на них, программа вычисляет температурные параметры, которые нужно сравнить с предельно допустимыми для данного материала. К примеру, получив результат температуры в сечении, равный 1900°С, можно сделать вывод о том, что для материала медь, значение выходит за предел допустимого (800°С), это означает то, что нужно менять параметры, но если будет использован вольфрам, с предельной температурой 2000°С, то выбранные значения корректны."
    let Ra, Ha, P, Rf, Tosn, Hm, d, Tfp, Pmax, Tsp, Ts, la, lm, x, y, a, b = 0

    let c = [[2, 1.429, 1.111, 0.909, 0.769], //Двумерный массив для fm и ff
    [1.429, 1.111, 0.909, 0.769, 0.667],
    [1.111, 0.909, 0.769, 0.667, 0.588],
    [0.909, 0.769, 0.667,],
    [8.333, 3.125, 1.923, 1.389, 1.087],
    [9.259, 3.472, 2.137, 1.543, 1.208],
    [10.417, 3.906, 2.404, 1.736, 1.359],
    [11.905, 4.464, 2.747, 1.984, 1.553]]

    x = Rf/Ra ;
    y = Hm/Ra ;

    if (x == 0.1) {
        if (y == 0.1) {
            a = c[0][0];
            b = c[4][0];
        }
        if (y == 0.2) {
            a = c[1][0];
            b = c[5][0];
        }
        if (y == 0.3) {
            a = c[2][0];
            b = c[6][0];
        }
        if (y == 0.4) {
            a = c[3][0];
            b = c[7][0];
        }
    }
    if (x == 0.2) {
        if (y == 0.1) {
            a = c[0][1];
            b = c[4][1];
        }
        if (y == 0.2) {
            a = c[1][1];
            b = c[5][1];
        }
        if (y == 0.3) {
            a = c[2][1];
            b = c[6][1];
        }
        if (y == 0.4) {
            a = c[3][1];
            b = c[7][1];
        }
    }
    if (x == 0.3) {
        if (y == 0.1) {
            a = c[0][2];
            b = c[4][2];
        }
        if (y == 0.2) {
            a = c[1][2];
            b = c[5][2];
        }
        if (y == 0.3) {
            a = c[2][2];
            b = c[6][2];
        }
        if (y == 0.4) {
            a = c[3][2];
            b = c[7][2];
        }
    }
    if (x == 0.4) {
        if (y == 0.1) {
            a = c[0][3];
            b = c[4][3];
        }
        if (y == 0.2) {
            a = c[1][3];
            b = c[5][3];
        }
        if (y == 0.3) {
            a = c[2][3];
            b = c[6][3];
        }
        if (y == 0.4) {
            a = c[3][3];
            b = c[7][3];
        }
    }
    if (x == 0.5) {
        if (y == 0.1) {
            a = c[0][4];
            b = c[4][4];
        }
        if (y == 0.2) {
            a = c[1][4];
            b = c[5][4];
        }
        if (y == 0.3) {
            a = c[2][4];
            b = c[6][4];
        }
        if (y == 0.4) {
            a = c[3][4];
            b = c[7][4];
        }
    }

    const TfpInput = useRef(0)
    const PmaxInput = useRef(0)
    const TspInput = useRef(0)
    const TsInput = useRef(0)

    const [valueA, setValueA] = useState('Wolframium');
    const [valueM, setValueM] = useState('Wolframium');

    function showInputRa(event) {
        Ra = (event.target.value)
    }

    function showInputHa(event) {
        Ha = (event.target.value)
    }

    function showInputP(event) {
        P = (event.target.value)
    }

    function showInputRf(event) {
        Rf = (event.target.value)
    }

    function showInputTosn(event) {
        Tosn = (event.target.value)
    }

    function showInputHm(event) {
        Hm = (event.target.value)
    }


    function changeSelectA(event) {
        setValueA(event.target.value);
    }

    function changeSelectM(event) {
        setValueM(event.target.value);
    }

    if (valueA == 'Wolframium') {
        la = 1.2
    } else if (valueA == 'Cuprum') {
        la = 3.7
    }
    if (valueM == 'Wolframium') {
        lm = 1.2
    } else if (valueM == 'Cuprum') {
        lm = 3.7
    } else if (valueM == 'Molybdaenum') {
        lm = 1.3
    } else if (valueM == 'Cobaltum') {
        lm = 0.7
    }


    return (
        <div className={s.wrapper}>
            <div className={s.content}>
                <div className={s.OneColomn}>
                    <Modal text={modalText}/>
                    <b>Выберите параметры:</b>
                    <div className={s.item}>
                        Радиус анода, см
                        <input type="number" onInput={showInputRa}/>
                    </div>
                    <div className={s.item}>
                        Толщина анода, см
                        <input type="number" onInput={showInputHa}/>
                    </div>
                    <div className={s.item}>
                        Мощность трубки, Вт
                        <input type="number" onInput={showInputP}/>
                    </div>
                    <div className={s.item}>
                        Радиус фокусного пятна, см
                        <input type="number" onInput={showInputRf}/>
                    </div>
                    <div className={s.item}>
                        Температура основания анода,
                        <input type="number" onInput={showInputTosn}/>
                    </div>
                    <div className={s.item}>
                        Толщина мишени
                        <input type="number" onInput={showInputHm}/>
                    </div>
                    <div className={s.item}>
                        Материал анода:
                        <select value={valueA} onChange={changeSelectA}>
                            <option value="Wolframium">Вольфрам</option>
                            <option value="Cuprum">Медь</option>
                        </select>
                    </div>
                    <div className={s.item}>
                        Материал мишени:
                        <select value={valueM} onChange={changeSelectM}>
                            <option value="Wolframium">Вольфрам</option>
                            <option value="Cuprum">Медь</option>
                            <option value="Molybdaenum">Молибден</option>
                            <option value="Cobaltum">Кобальт</option>
                        </select>
                    </div>
                    <div className={s.item}>

                        <button onClick={() => {
                            Ts = Tosn + (P*(Ha-2*Ra))/(3.14*Ra*Ra*la)
                            console.log(Tosn, P, Ha, Ra, la)
                            TfpInput.current.value = Tfp
                            PmaxInput.current.value = Pmax
                            TspInput.current.value = Tsp
                            TsInput.current.value = Ts

                        }}> Вычислить
                        </button>
                    </div>
                </div>
                <div className={s.TwoColomn}>
                    <img className={s.termoImg} src={termoImg}/>
                    <div className={s.resultsItem}>
                        <b>Результат вычисления:</b>
                    </div>
                    <div className={s.item}>
                        Температура центра фокусного пятна,
                        <input type="number" ref={TfpInput} step="0.1"/>
                    </div>
                    <div className={s.item}>
                        Максимально допустимая мощность, Вт
                        <input type="number" ref={PmaxInput} step="0.1"/>
                    </div>
                    <div className={s.item}>
                        Температура в центре спая мишени с анодом,
                        <input type="number" ref={TspInput} step="0.1"/>
                    </div>
                    <div className={s.item}>
                        Температура в сечении,
                        <input type="number" ref={TsInput} step="0.1"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Thermal;