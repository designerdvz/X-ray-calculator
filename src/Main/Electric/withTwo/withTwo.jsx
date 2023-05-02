import React from 'react'
import s from './withTwo.module.css'
import { useRef } from 'react'
import Modal from '../../../Modal/Modal'
import TwoImg from '../../../images/WithTwo.png'
import { Tooltip } from '@mui/material'
import { calculate_d, calculate_D1 } from '../../../store/electricWithTwo'
import { useDispatch, useSelector } from 'react-redux'
import { setParametr } from '../../../store/electricWithTwo'

function WithTwo() {
    let modalText =
        'Задача раздела об электрической прочности рентгеновской трубки- оценить способность прибора обеспечивать стабильную работу при приложении к электродам заданного высокого напряжения. Необходимо вычислить геометрические параметры: межэлектродное расстояние, а также, исходя из выбора конструктивной группы, могут потребоваться вычисления и других параметров, таких как расстояние электрод-баллон, внутренний диаметр анодного узла, диаметр катодного узла. Все размеры вычисляются исходя из выбранных параметров: приложенного напряжения, материала мишени и конструктивной группы.'
    const dispatch = useDispatch()

    const { d, D2, D1, U, C, K } = useSelector(
        (state) => state.electric_withTwo
    )
    // let { U } = useSelector((state) => state.electricWithCase)

    return (
        <div className={s.wrapper}>
            <div className={s.content}>
                <div className={s.OneColomn}>
                    <Modal text={modalText} />
                    <b>Выбрана группа с двумя межэлектродными промежутками </b>
                    <img className={s.twoImg} src={TwoImg} />
                    <b>Введите начальные значения:</b>
                    <div className={s.item}>
                        <span>U, кВ</span>
                        <input
                            type="number"
                            value={U}
                            onChange={(event) =>
                                dispatch(
                                    setParametr({
                                        parametr: 'U',
                                        ref: event.target.value,
                                    })
                                )
                            }
                        />
                    </div>
                    <div className={s.item}>
                        <span>D2, мм</span>
                        <input
                            type="number"
                            value={D2}
                            onChange={(event) =>
                                dispatch(
                                    setParametr({
                                        parametr: 'D2',
                                        ref: event.target.value,
                                    })
                                )
                            }
                        />
                    </div>
                    <div className={s.item}>
                        Коэффициенты, которые были определены исходя из выбора{' '}
                        <br />
                        конструктивной группы и являются постоянными, при
                        желании можно изменить:
                    </div>
                    <div className={s.item}>
                        <Tooltip
                            describeChild
                            title="C - Коэффициент, зависящий от конфигурации электродов, формы кривой напряжения и некоторых других факторов"
                        >
                            <span>C, кВ/мм^2 </span>
                        </Tooltip>
                        <input
                            type="number"
                            value={C}
                            step="0.1"
                            onChange={(event) =>
                                dispatch(
                                    setParametr({
                                        parametr: 'C',
                                        ref: event.target.value,
                                    })
                                )
                            }
                        />
                    </div>
                    <div className={s.item}>
                        <Tooltip
                            describeChild
                            title="К - Коэффициент, зависящий от конфигурации электродов, формы кривой напряжения и некоторых других факторов"
                        >
                            <span>K</span>
                        </Tooltip>
                        <input
                            type="number"
                            value={K}
                            step="0.1"
                            onChange={(event) =>
                                dispatch(
                                    setParametr({
                                        parametr: 'K',
                                        ref: event.target.value,
                                    })
                                )
                            }
                        />
                    </div>
                    <button
                        className={s.button1}
                        onClick={() => {
                            let d1 = U / C
                            let d2 = 1 / K
                            dispatch(calculate_d({ d1, d2 }))
                            dispatch(calculate_D1({ D2, U }))
                        }}
                    >
                        {' '}
                        Вычислить
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
                        <span> d,мм</span>
                        <input type="number" value={d} disabled />
                    </div>
                    <div className={s.item}>
                        <span>D1,мм</span>
                        <input type="number" value={D1} disabled />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default WithTwo
