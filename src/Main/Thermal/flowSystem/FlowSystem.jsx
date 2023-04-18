import s from './flowThermal.module.css'
import Modal from '../../../Modal/Modal'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import thermalImg from '../../../images/Thermal.png'
import { calculate_Q1, calculate_Q2, setParametr } from '../../../store/thermal'

const FlowSystem = () => {
    let { d2, d, r1, r2, tst, tzh, Q1, Q2, l1, l2 } = useSelector(
        (state) => state.thermal
    )

    const dispatch = useDispatch()
    let modalText = 'Считаем количество теплоты'

    return (
        <div className={s.wrapper}>
            <div className={s.content}>
                <div className={s.OneColomn}>
                    <Modal text={modalText} />
                    <b>Выберите параметры:</b>
                    <div className={s.item}>
                        <span id={s.labeld2}>
                            Внутренний диаметр подводящей трубки, см
                        </span>
                        <input
                            type="number"
                            value={d2}
                            onChange={(event) =>
                                dispatch(
                                    setParametr({
                                        parametr: 'd2',
                                        ref: event.target.value,
                                    })
                                )
                            }
                        />
                    </div>
                    <div className={s.item}>
                        <span id={s.labeld}>Внутренний диаметр зазора, м</span>
                        <input
                            type="number"
                            value={d}
                            min={0.001}
                            onChange={(event) =>
                                dispatch(
                                    setParametr({
                                        parametr: 'd',
                                        ref: event.target.value,
                                    })
                                )
                            }
                        />
                    </div>
                    <div className={s.item}>
                        <span id={s.labelr1}>
                            Радиус кривизны наружной стенки
                        </span>
                        <input
                            type="number"
                            value={r1}
                            onChange={(event) =>
                                dispatch(
                                    setParametr({
                                        parametr: 'r1',
                                        ref: event.target.value,
                                    })
                                )
                            }
                        />
                    </div>
                    <div className={s.item}>
                        <span id={s.labelr2}>
                            Радиус кривизны внутренней стенки
                        </span>
                        <input
                            type="number"
                            value={r2}
                            onChange={(event) =>
                                dispatch(
                                    setParametr({
                                        parametr: 'r2',
                                        ref: event.target.value,
                                    })
                                )
                            }
                        />
                    </div>
                    <div className={s.item}>
                        <span id={s.labeltst}>
                            Температура охлаждаемой стенки
                        </span>
                        <input
                            type="number"
                            value={tst}
                            onChange={(event) =>
                                dispatch(
                                    setParametr({
                                        parametr: 'tst',
                                        ref: event.target.value,
                                    })
                                )
                            }
                        />
                    </div>
                    <div className={s.item}>
                        <span id={s.labeltzh}>
                            Температура охлаждающей жидкости
                        </span>
                        <input
                            type="number"
                            value={tzh}
                            onChange={(event) =>
                                dispatch(
                                    setParametr({
                                        parametr: 'tzh',
                                        ref: event.target.value,
                                    })
                                )
                            }
                        />
                    </div>
                    <div className={s.item}>
                        <button
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
