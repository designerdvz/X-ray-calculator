import React, {useState} from 'react';
import s from './Themperature.module.css'
import Modal from "../../Modal/Modal";
import termoImg from "../../images/Termo.png";
import {
    calculate_a_b,
    calculate_La_Lm, calculate_Pmax,
    calculate_Tfp,
    calculate_Ts,
    calculate_Tsp,
    valid_Ha_Ra,
    setParametr
} from "../../store/themperature";
import {useDispatch, useSelector} from "react-redux";

function Themperature() {
    const dispatch = useDispatch()
    const [buttonDisabled, setButtonDisabled] = useState(false)
    let modalText = "Необходимо корректно подобрать параметры: радиус и толщину анода, а также толщину мишени.  Основываясь на них, программа вычисляет температурные параметры, которые нужно сравнить с предельно допустимыми для данного материала. К примеру, получив результат температуры в сечении, равный 1900°С, можно сделать вывод о том, что для материала медь, значение выходит за предел допустимого (800°С), это означает то, что нужно менять параметры, но если будет использован вольфрам, с предельной температурой 2000°С, то выбранные значения корректны."
    let { Ra, Ha, P, Rf, Tosn, Hm, valueA, valueM, TfpMAX, la, lm, a, b, Tfp, Pmax, Tsp, Ts, valid}
        = useSelector((state) => state.themperature)



    return (
        <div className={s.wrapper}>
            <div className={s.content}>
                <div className={s.OneColomn}>
                    <Modal text={modalText}/>
                    <b>Выберите параметры:</b>
                    <div className={s.item}>
                        <span id={s.labelRa}>радиус анода, см</span>
                        <input className={valid ? '' : s.invalid} type="number" value={Ra} min={0.5} max={2} step={0.1}
                               onChange={(event) => {
                                       dispatch(setParametr({parametr: 'Ra', ref: event.target.value}))
                                        dispatch(valid_Ha_Ra())
                                   }}/>
                    </div>
                    {!valid && <div className={s.item}>
                        <span className={s.invalid}> Толщина анода должна превышать радиус анода в 2 раза. </span>
                    </div>}
                    <div className={s.item}>
                        <span id={s.labelHa}>Толщина анода, см</span>
                        <input className={valid ? '' : s.invalid} type="number" value={Ha} min={4.5} max={9} step={0.5}
                               onChange={(event) => {dispatch(setParametr({parametr: 'Ha', ref: event.target.value}))
                                   dispatch(valid_Ha_Ra())
                               }}/>
                    </div>
                    <div className={s.item}>
                        <div className={s.valid}>
                        <span id={s.labelP}>Мощность трубки, Вт</span>
                            { (P > 3000 || P < 500) ? <div className={s.invalidText}>Диапазон значений мощности 500-3000Вт</div> : null}
                        </div>
                            <input type="number" value={P} min={500} max={3000}
                               onChange={(event) => {
                                   dispatch(setParametr({parametr: 'P', ref: event.target.value}))
                                   if (event.target.value > 3000 || event.target.value < 500) {setButtonDisabled(true)} else setButtonDisabled(false)
                               }
                        }/>


                    </div>
                    <div className={s.item}>
                        <span>Радиус фокусного пятна, см</span>
                        <input type="number" value={Rf} min={0} max={1} step={0.1}
                               onChange={(event) => dispatch(setParametr({parametr: 'Rf', ref: event.target.value}))}/>
                    </div>
                    <div className={s.item}>
                        <div className={s.valid}>
                        <span>Температура основания анода,</span>
                        { (Tosn > 90 || Tosn < 70) ? <div className={s.invalidText}>Диапазон значений температуры основания анода 70-90 </div> : null}
                        </div>
                            <input type="number" value={Tosn} min={70} max={90} onChange={(event) => {
                            dispatch(setParametr({
                                parametr: 'Tosn',
                                ref: event.target.value
                            }))
                            if (event.target.value > 90 || event.target.value < 70) {setButtonDisabled(true)} else setButtonDisabled(false)
                        }}/>
                    </div>
                    <div className={s.item}>
                        <div className={s.valid}>
                        <span>Толщина мишени, см</span>
                            { (Hm > 0.2 || Hm < 0.05) ? <div className={s.invalidText}>Диапазон значений толщины мишени 0,05-0,2 см </div> : null}
                            </div>
                            <input type="number" value={Hm} min={0.05} max={0.2} step={0.01}
                               onChange={(event) => {
                                   dispatch(setParametr({parametr: 'Hm', ref: event.target.value}))
                                   if (event.target.value > 0.2 || event.target.value < 0.05) {
                                       setButtonDisabled(true)
                                   } else setButtonDisabled(false)
                               }
                               }/>
                    </div>
                    <div className={s.item}>
                        <span>Материал анода:</span>
                        <select value={valueA} onChange={(event) => dispatch(setParametr({
                            parametr: 'valueA',
                            ref: event.target.value
                        }))}>
                            <option value="Wolframium">Вольфрам</option>
                            <option value="Cuprum">Медь</option>
                        </select>
                    </div>
                    <div className={s.item}>
                        <span>Материал мишени:</span>
                        <select value={valueM} onChange={(event) => dispatch(setParametr({
                            parametr: 'valueM',
                            ref: event.target.value
                        }))}>
                            <option value="Wolframium">Вольфрам</option>
                            <option value="Cuprum">Медь</option>
                            <option value="Molybdaenum">Молибден</option>
                            <option value="Argentum">Серебро</option>
                            <option value="Rhenium">Рений</option>
                        </select>
                    </div>
                    <div className={s.item}>

                        <button className={s.button1} disabled={buttonDisabled} onClick={(event) => {
                            dispatch(calculate_La_Lm({Ha, Ra, valueA, valueM}))
                            dispatch(calculate_a_b({Rf, Hm, Ra}))
                            dispatch(calculate_Ts({Tosn, P, Ha, Ra, la}))
                            dispatch(calculate_Tsp({Tosn, P, Ha, Ra, la, lm, a}))
                            dispatch(calculate_Tfp({Tosn, P, Ha, Ra, la, lm, b}))
                            dispatch(calculate_Pmax({TfpMAX, Tosn, Ra, lm, Ha, b}))
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
                    <input type="number" value={Tfp} disabled/>
                </div>
                <div className={s.item}>
                    <span>  Максимально допустимая мощность, Вт</span>
                    <input type="number" value={Pmax} disabled/>
                </div>
                <div className={s.item}>
                    <span> Температура в центре спая мишени с анодом,</span>
                    <input type="number" value={Tsp} disabled/>
                </div>
                <div className={s.item}>
                    <span>Температура в сечении,</span>
                    <input type="number" value={Ts} disabled/>
                </div>
            </div>
        </div>
</div>
)
}

export default Themperature;