import s from './flowThermal.module.css'
import Modal from '../../../Modal/Modal'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import thermalImg from '../../../images/Thermal.png'
import { calculate_Q1, calculate_Q2, setParametr } from '../../../store/thermal'

const FlowSystem = () => {
    let { d2, d, r1, r2, tst, tzh, Q1, Q2, l1, l2 } = useSelector(
        (state) => state.thermal
    )

    const dispatch = useDispatch()
    let modalText = 'Считаем количество теплоты'
    const [invalid_d1, setInvalid_d1] = useState(false)
    const [invalid_d2, setInvalid_d2] = useState(false)
    const [invalidT_D1, setInvalid_D1] = useState(false)
    const [invalidT_D2, setInvalid_D2] = useState(false)
    const [invalidT_Tst, setInvalid_Tst] = useState(false)
    const [invalidT_Tzh, setInvalid_Tzh] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)

    useEffect(() => {
        if (invalid_d1 || invalid_d2 || invalidT_D1 || invalidT_D2 || invalidT_Tst || invalidT_Tzh) {
            setIsDisabled(true)
        } else {
            setIsDisabled(false)
        }
    })

    return (
        <div className={s.wrapper}>
            <div className={s.content}>
                <div className={s.OneColomn}>
                    <Modal text={modalText} />
                    <b>Выберите параметры:</b>
                    <div className={s.item}>
                        <div className={s.valid}>
                            <span>Диаметр подводящей трубки (d2), мм</span>
                            {d2 > 23 || d2 < 4 || d2 >= r2 || d2 >= r1 || d2 <= d ?(
                                <div className={s.invalidText}>
                                    Диапазон значений диаметра подводящей трубки 4-23 мм
                                    и должен быть меньше D1, D2, но больше d1{' '}
                                </div>
                            ) : null}
                        </div>
                        <input
                            type="number"
                            value={d2}
                            min={4}
                            max={23}
                            onChange={(event) =>{
                                dispatch(
                                    setParametr({
                                        parametr: 'd2',
                                        ref: event.target.value,
                                    })
                                )
                                if (
                                    event.target.value > 23 ||
                                    event.target.value < 4
                                ) {
                                    setInvalid_d2(true)
                                } else setInvalid_d2(false)
                            }
                            }
                        />
                    </div>
                    <div className={s.item}>
                        <div className={s.valid}>
                            <span>Внутренний диаметр подводящей трубки (d1), мм</span>
                            {d > 20 || d < 3 || d >= r2 || d >= r1 || d >= d2 ? (
                                <div className={s.invalidText}>
                                    Диапазон значений внутреннего диаметра подводящей трубки 3-20 мм
                                    и должен быть меньше D2, d1 и d2{' '}
                                </div>
                            ) : null}
                        </div>
                        <input
                            type="number"
                            value={d}
                            min={3}
                            max={20}
                            onChange={(event) => {
                                dispatch(
                                    setParametr({
                                        parametr: 'd',
                                        ref: event.target.value,
                                    })
                                )
                                if (
                                    event.target.value > 20 ||
                                    event.target.value < 3
                                ) {
                                    setInvalid_d1(true)
                                } else setInvalid_d1(false)
                            }
                            }
                        />
                    </div>
                    <div className={s.item}>
                        <div className={s.valid}>
                            <span> Диаметр внутренней стенки (D1), мм</span>
                            {r1 > 26 || r1 < 5 || r1 >= r2 || r1 <= d || r1 <= d2 ? (
                                <div className={s.invalidText}>
                                    Диапазон значений диаметра внутренней стенки 5-26 мм 
                                    и должен быть больше d1 и d2, но меньше D2{' '}
                                </div>
                            ) : null}
                        </div>
                        <input
                            type="number"
                            value={r1}
                            min={5}
                            max={26}
                            onChange={(event) =>{
                                dispatch(
                                    setParametr({
                                        parametr: 'r1',
                                        ref: event.target.value,
                                    })
                                )
                                if (
                                    event.target.value > 26 ||
                                    event.target.value < 5
                                ) {
                                    setInvalid_D1(true)
                                } else setInvalid_D1(false)
                            }
                            }
                        />
                    </div>
                    <div className={s.item}>
                        <div className={s.valid}>
                            <span>  Диаметр наружней стенки (D2), мм</span>
                            {r2 > 31 || r2 < 8 || r2 <= r1 || r2 <= d || r2 <= d2? (
                                <div className={s.invalidText}>
                                    Диапазон значений диаметра наружней стенки 8-31 мм
                                    и должен быть больше D2, d1 и d2{' '}
                                </div>
                            ) : null}
                        </div>
                        <input
                            type="number"
                            value={r2}
                            min={8}
                            max={31}
                            onChange={(event) => {
                                dispatch(
                                    setParametr({
                                        parametr: 'r2',
                                        ref: event.target.value,
                                    })
                                )
                                if (
                                    event.target.value > 31 ||
                                    event.target.value < 8
                                ) {
                                    setInvalid_D2(true)
                                } else setInvalid_D2(false)
                            }
                            }
                        />
                    </div>
                    <div className={s.item}>
                        <div className={s.valid}>
                            <span>  Температура охлаждаемой стенки, °C</span>
                            {tst > 90 || tst < 70 ? (
                                <div className={s.invalidText}>
                                    Диапазон значений  температуры охлаждаемой стенки 70-90 °C{' '}
                                </div>
                            ) : null}
                        </div>
                        <input
                            type="number"
                            value={tst}
                            min={70}
                            max={90}
                            onChange={(event) => {
                                dispatch(
                                    setParametr({
                                        parametr: 'tst',
                                        ref: event.target.value,
                                    })
                                )
                                if (
                                    event.target.value > 90 ||
                                    event.target.value < 70
                                ) {
                                    setInvalid_Tst(true)
                                } else setInvalid_Tst(false)
                            }
                            }
                        />
                    </div>
                    <div className={s.item}>
                        <div className={s.valid}>
                            <span> Температура охлаждающей жидкости, °C</span>
                            {tzh > 40 || tzh < 20 ? (
                                <div className={s.invalidText}>
                                    Диапазон значений  температуры охлаждающей жидкости 20-40 °C{' '}
                                </div>
                            ) : null}
                        </div>
                        <input
                            type="number"
                            value={tzh}
                            min={20}
                            max={40}
                            onChange={(event) => {
                                dispatch(
                                    setParametr({
                                        parametr: 'tzh',
                                        ref: event.target.value,
                                    })
                                )
                                if (
                                    event.target.value > 40 ||
                                    event.target.value < 20
                                ) {
                                    setInvalid_Tzh(true)
                                } else setInvalid_Tzh(false)
                            }
                            }
                        />
                    </div>
                    <div className={s.item}>
                        <button
                            disabled={isDisabled}
                            className={s.button1}
                            onClick={(event) => {
                                dispatch(calculate_Q1({ d2, r1, l1, tst, tzh }))
                                dispatch(
                                    calculate_Q2({ d, l1, r2, l2, tst, tzh })
                                )
                            }}
                        >
                            {' '}
                            Вычислить
                        </button>
                    </div>
                </div>
                <div className={s.TwoColomn}>
                    <img className={s.termoImg} src={thermalImg} />
                    <div className={s.resultsItem}>
                        <b>Результат вычисления:</b>
                    </div>
                    <div className={s.item}>
                        <span>
                            {' '}
                            Тепло, отдаваемое торцевой частью охлаждаемой
                            поверхности, ккал/ч{' '}
                        </span>
                        <input type="number" value={Q1} disabled />
                    </div>
                    <div className={s.item}>
                        <span>
                            {' '}
                            Тепло, отдаваемое цилиндрической частью охлаждаемой
                            поверхности, ккал/ч{' '}
                        </span>
                        <input type="number" value={Q2} disabled />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FlowSystem
