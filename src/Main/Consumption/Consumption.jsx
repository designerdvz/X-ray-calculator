import React from 'react';
import s from './consumption.module.css'
import Modal from "../../Modal/Modal";
import Plot from 'react-plotly.js';
import {setParametr} from "../../store/plot";
import {useDispatch, useSelector} from "react-redux";
import {calculate_Pmax, calculate_Tfp, calculate_Ts, calculate_Tsp} from "../../store/themperature";

function Consumption() {
    let {U, P, Emin, k, Z, R, psi, m} = useSelector((state) => state.plot)
    let modalText = "написать о построении графика."
    const dispatch = useDispatch()
    let Emax = U * Math.pow(10, -3)
    let I = P / U
    let Xe = U / 10000 * Math.pow(10, -6)
    let fi = 90 - psi
    let axisX = []
    let axisY = []
    for (let i = Emin; i <= Emax; i++) {
        axisX.push(i)
        axisY.push((k * I * Z) / Math.pow(R, 2) * (Emax - i) * Math.exp(-m * Xe * (Math.cos(psi) / Math.cos(fi))))
    }
    return (
        <div className={s.wrapper}>
            <div className={s.content}>
                <div className={s.OneColomn}>
                    <Modal text={modalText}/>
                    <Plot
                        data={[
                            {
                                x: axisX,
                                y: axisY,
                                type: 'scatter',
                                mode: 'lines+markers',
                                marker: {color: 'red'},
                            },
                        ]}
                        layout={{width: 500, height: 300, title: 'Спектр излучения'}}
                    />
                </div>
                <div className={s.TwoColomn}>
                    <b>Выберите параметры:</b>
                    <div className={s.item}>
                        <span id={s.labelU}>прикладываемое напряжение, В</span>
                        <input type="number" value={U}
                               onChange={(event) => dispatch(setParametr({parametr: 'U', ref: event.target.value}))}/>
                    </div>
                    <div className={s.item}>
                        <span id={s.labelP}>мощность трубки, Вт</span>
                        <input type="number" value={P}
                               onChange={(event) => dispatch(setParametr({parametr: 'P', ref: event.target.value}))}/>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Consumption;