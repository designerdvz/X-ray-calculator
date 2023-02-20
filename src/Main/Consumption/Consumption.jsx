import React from 'react';
import s from './consumption.module.css'
import Modal from "../../Modal/Modal";
import Plot from 'react-plotly.js';
import {setParametr} from "../../store/plot";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";

function Consumption() {
    const [valueAnod, setValueAnod] = useState('Rhenium');
    const [valueFilter, setValueFilter] = useState('Cuprum');

    let {U, Emin, k, R, psi, m, HWindow, HFilter, HGlass, Angle} = useSelector((state) => state.plot)
    let {P} = useSelector((state) => state.themperature)
    let modalText = 'В этом разделе реализована возможность построения спектра тормозного излучениня рентгеновской трубки. При построении учитывается значение напряжения, которое было вами занесено во вкладку "электрическая прочность", а так же мощность, вписанная вами во вкладке "температура"'
    const dispatch = useDispatch()
    let Emax = U
    let I = (P / 1000) / U
    let Xe = U / 10 * Math.pow(10, -6)
    let fi = 90 - psi
    let axisX = []
    let axisY = []
    let tRh = 0
    let tMo = 0
    let tAl = 0
    let Z = 0
    let tSi = 0
    let tW = 0
    let ro_filter = 0
    let ro_anod = 0
    let ro_glass = 2.33
    let ro_window = 1.85
    let m_anod = 0
    let m_filter = 0
    let m_window = 0
    let m_glass = 0

    for (let i = Emin+0.3; i < Emax;) {
        if (valueAnod == 'Wolframium') {
            let t_BKW = (0.5609 * Math.pow(10, 7)) * Math.pow(i, -3) - (0.1409 * Math.pow(10, 9)) * Math.pow(i, -4)
            let t_L1KW = (0.2293 * Math.pow(10, 4)) * Math.pow(i, -2) + (0.5922 * Math.pow(10, 6)) * Math.pow(i, -3) - (0.2501 * Math.pow(10, 7)) * Math.pow(i, -4)
            let t_L2L1W = (0.5357 * Math.pow(10, 6)) * Math.pow(i, -3) - (0.2132 * Math.pow(10, 7)) * Math.pow(i, -4)
            let t_L3L2W = (0.3312 * Math.pow(10, 6)) * Math.pow(i, -3) - (0.8942 * Math.pow(10, 6)) * Math.pow(i, -4)
            let t_M1L3W = (0.3533 * Math.pow(10, 4)) * Math.pow(i, -2) + (0.6433 * Math.pow(10, 5)) * Math.pow(i, -3) - (0.6929 * Math.pow(10, 5)) * Math.pow(i, -4)
            let t_M2M1W = (0.7600 * Math.pow(10, 5)) * Math.pow(i, -3) - (0.8179 * Math.pow(10, 5)) * Math.pow(i, -4)
            let t_M3M2W = (0.6324 * Math.pow(10, 5)) * Math.pow(i, -3) - (0.5576 * Math.pow(10, 5)) * Math.pow(i, -4)
            let t_M4M3W = (0.6520 * Math.pow(10, 5)) * Math.pow(i, -3) - (0.7006 * Math.pow(10, 5)) * Math.pow(i, -4)
            let t_M5M4W = (0.4760 * Math.pow(10, 5)) * Math.pow(i, -3) - (0.5122 * Math.pow(10, 5)) * Math.pow(i, -4)
            let t_1M5W = (0.2594 * Math.pow(10, 4)) * Math.pow(i, -2) + (0.2704 * Math.pow(10, 4)) * Math.pow(i, -3) - (0.1624 * Math.pow(10, 4)) * Math.pow(i, -4)
            let o_kW = (1 + 1.571 * 0.1 * i) * Math.pow((8.324 * Math.pow(10, -2) + 1.526 * 0.01 * i + 2.825 * 0.001 * Math.pow(i, 2) + 6.277 * Math.pow(10, -5) * Math.pow(i, 3)), -1)
            let o_nkW = Math.pow((126.1 * Math.pow(i, -1) + 6.724 + 0.01805 * i), -1)
            if (i > 69.525) {
                tW = t_BKW
            } else if (i > 12.099) {
                tW = t_L1KW
            } else if (i > 11.544) {
                tW = t_L2L1W
            } else if (i > 10.206) {
                tW = t_L3L2W
            } else if (i > 2.819) {
                tW = t_M1L3W
            } else if (i > 2.574) {
                tW = t_M2M1W
            }else if (i > 2.281) {
                tW = t_M3M2W
            } else if (i > 1.871) {
                tW = t_M4M3W
            } else if (i > 1.809) {
                tW = t_M5M4W
            } else tW = t_1M5W
            m_anod = tW + o_kW + o_nkW
            ro_anod = 19.3
            Z = 74
        } else if (valueAnod == 'Rhenium') {
            let t_BKRh = (0.1205 * Math.pow(10, 7)) * Math.pow(i, -3) - (0.9730 * Math.pow(10, 7)) * Math.pow(i, -4)
            let t_L1KRh = (0.1050 * Math.pow(10, 4)) * Math.pow(i, -2) + (0.1054 * Math.pow(10, 6)) * Math.pow(i, -3) - (0.1398 * Math.pow(10, 6)) * Math.pow(i, -4)
            let t_L2L1Rh = (0.9003 * Math.pow(10, 5)) * Math.pow(i, -3) - (0.1030 * Math.pow(10, 6)) * Math.pow(i, -4)
            let t_L3L2Rh = (0.5655 * Math.pow(10, 5)) * Math.pow(i, -3) - (0.4734 * Math.pow(10, 5)) * Math.pow(i, -4)
            let t_L3Rh = (0.1612 * Math.pow(10, 4)) * Math.pow(i, -2) + (0.8250 * Math.pow(10, 4)) * Math.pow(i, -3) - (0.3703 * Math.pow(10, 4)) * Math.pow(i, -4)
            let o_kRh = (1 + 5.623 * 0.1 * i) * Math.pow((1.281 * Math.pow(10, -1) + 6.536 * 0.01 * i + 1.422 * 0.01 * Math.pow(i, 2) + 5.096 * Math.pow(10, -4) * Math.pow(i, 3)), -1)
            let o_nkRn = Math.pow((90.02 * Math.pow(i, -1) + 5.803 + 0.01826 * i), -1)
            if (i > 23.219) {
                tRh = t_BKRh
            } else if (i > 3.411) {
                tRh = t_L1KRh
            } else if (i > 3.146) {
                tRh = t_L2L1Rh
            } else if (i > 3.003) {
                tRh = t_L3L2Rh
            } else tRh = t_L3Rh
            m_anod = tRh + o_kRh + o_nkRn
            ro_anod = 12.4
            Z = 75
        }
        if (valueFilter == 'Molybdenum') {
            m_filter = 0
            let t_BKMo = (0.9649 * Math.pow(10, 6)) * Math.pow(i, -3) - (0.6635 * Math.pow(10, 7)) * Math.pow(i, -4)
            let t_L1KMo = (0.9956 * Math.pow(10, 3)) * Math.pow(i, -2) + (0.8166 * Math.pow(10, 5)) * Math.pow(i, -3) - (0.9212 * Math.pow(10, 5)) * Math.pow(i, -4)
            let t_L2L1Mo = (0.6946 * Math.pow(10, 5)) * Math.pow(i, -3) - (0.6720 * Math.pow(10, 5)) * Math.pow(i, -4)
            let t_L3L2Mo = (0.3382 * Math.pow(10, 5)) * Math.pow(i, -3) - (0.5891 * Math.pow(10, 4)) * Math.pow(i, -4)
            let t_L3Mo = (0.1371 * Math.pow(10, 4)) * Math.pow(i, -2) + (0.6170 * Math.pow(10, 4)) * Math.pow(i, -3) - (0.2607 * Math.pow(10, 4)) * Math.pow(i, -4)
            let o_kMo = (1 + 5.411 * 0.1 * i) * Math.pow((1.345 * Math.pow(10, -1) + 7.06 * 0.01 * i + 1.463 * 0.01 * Math.pow(i, 2) + 5.588 * Math.pow(10, -4) * Math.pow(i, 3)), -1)
            let o_nkMo = Math.pow((80.67 * Math.pow(i, -1) + 5.926 + 0.01748 * i), -1)
            if (i > 19.999) {
                tMo = t_BKMo
            } else if (i > 2.865) {
                tMo = t_L1KMo
            } else if (i > 2.625) {
                tMo = t_L2L1Mo
            } else if (i > 2.52) {
                tMo = t_L3L2Mo
            } else tMo = t_L3Mo
            m_filter = tMo + o_kMo + o_nkMo
            ro_filter = 10.2
        } else if (valueFilter == 'Aluminium') {
            let t_BKAl = -(0.3471 * Math.pow(10, -2)) * Math.pow(i, 0) + (0.1384 * Math.pow(10, 1)) * Math.pow(i, -1) - (0.2137 * Math.pow(10, 3)) * Math.pow(i, -2) + (0.295 * Math.pow(10, 5)) * Math.pow(i, -3) - (0.2217 * Math.pow(10, 5)) * Math.pow(i, -4)
            let t_1KAl = (0.1688 * Math.pow(10, 4)) * Math.pow(i, -3) - (0.5046 * Math.pow(10, 3)) * Math.pow(i, -4)
            let o_kAl = (1 + 8.58 * 0.01 * i) * Math.pow((3.905 * Math.pow(10, -1) + 8.506 * 0.01 * i + 1.611 * 0.01 * Math.pow(i, 2) + 5.524 * Math.pow(10, -4) * Math.pow(i, 3)), -1)
            let o_nkAl = Math.pow((42.58 * Math.pow(i, -1) + 4.873 + 0.01871 * i), -1)
            if (i > 1.559) {
                tAl = t_BKAl
            } else tAl = t_1KAl
            m_filter = tAl + o_kAl + o_nkAl
            ro_filter = 2.7
        } else if (valueFilter == 'Cuprum') {
            let t_BKCu = -(0.2491 * Math.pow(10, 3)) * Math.pow(i, -2) + (0.3252 * Math.pow(10, 6)) * Math.pow(i, -3) - (0.1097 * Math.pow(10, 7)) * Math.pow(i, -4)
            let t_L1KCu = (0.7031 * Math.pow(10, 3)) * Math.pow(i, -2) + (0.2165 * Math.pow(10, 5)) * Math.pow(i, -3) - (0.1127 * Math.pow(10, 5)) * Math.pow(i, -4)
            let t_lL1KCu = (0.1357 * Math.pow(10, 5)) * Math.pow(i, -3) - (0.3001 * Math.pow(10, 4)) * Math.pow(i, -4)
            let o_kCu = (1 + 1.902 * 0.01 * i) * Math.pow((1.874 * Math.pow(10, -1) + 3.418 * 0.01 * i + 1.103 * 0.01 * Math.pow(i, 2) + 3.367 * Math.pow(10, -4) * Math.pow(i, 3)), -1)
            let o_nkCu = Math.pow((65.59 * Math.pow(i, -1) + 5.428 + 0.01804 * i), -1)
            if (i > 8.978) {
                tAl = t_BKCu
            } else if (i > 1.096) {
                tAl = t_L1KCu
            } else tAl = t_lL1KCu
            m_filter = tAl + o_kCu + o_nkCu
            ro_filter = 8.93
        }
        //ослабление для Бериллиевого окошка
        let tBe = -(0.3142 * Math.pow(10, -2)) * Math.pow(i, 0) + (0.4216 * Math.pow(10, 0)) * Math.pow(i, -1) - (0.2014 * Math.pow(10, 2)) * Math.pow(i, -2) + (0.5918 * Math.pow(10, 3)) * Math.pow(i, -3) - (-0.4857 * Math.pow(10, 2)) * Math.pow(i, -4)
        let o_kBe = (1 - 3.178 * 0.01 * i) * Math.pow((1.267 * Math.pow(10, 0) + 4.619 * 0.1 * i + 3.102 * 0.01 * Math.pow(i, 2) - 1.493 * Math.pow(10, -3) * Math.pow(i, 3)), -1)
        let o_nkBe = Math.pow((25.93 * Math.pow(i, -1) + 5.067 + 0.02420 * i), -1)
        m_window = tBe + o_kBe + o_nkBe

        //ослабление для стеклянного корпуса
        let t_BKSi = -(0.2219 * Math.pow(10, -2)) * Math.pow(i, 0) + (0.1141 * Math.pow(10, 1)) * Math.pow(i, -1) - (0.2202 * Math.pow(10, 3)) * Math.pow(i, -2) + (0.3864 * Math.pow(10, 5)) * Math.pow(i, -3) - (0.3319 * Math.pow(10, 5)) * Math.pow(i, -4)
        let t_1KSi = (0.1640 * Math.pow(10, 3)) * Math.pow(i, -2) + (0.1853 * Math.pow(10, 4)) * Math.pow(i, -3) - (0.45 * Math.pow(10, 3)) * Math.pow(i, -4)
        let o_kSi = (1 + 1.97 * 1 * i) * Math.pow((3.667 * Math.pow(10, -1) + 6.375 * 0.1 * i + 1.589 * 0.1 * Math.pow(i, 2) + 1.114 * Math.pow(10, -2) * Math.pow(i, 3)), -1)
        let o_nkSi = Math.pow((42.56 * Math.pow(i, -1) + 4.729 + 0.01796 * i), -1)
        if (i > 1.838) {
            tSi = t_BKSi
        } else tSi = t_1KSi
        m_glass = tSi + o_kSi + o_nkSi

        axisX.push(i)
        axisY.push((k * I * Z * 0.001) / Math.pow(R, 2) * ((Emax / i) - 1) * Math.exp(-m_anod * ro_anod * Xe * (Math.cos(psi) / Math.cos(fi * Math.PI / 180))) * Math.exp(-m_filter * ro_filter * HFilter * 0.0001) * Math.exp(-m_window * ro_window * HWindow * 0.0001)* Math.exp(-m_glass * ro_glass * HGlass * 0.0001))
        console.log(i, '-----', m_filter, ro_filter)
        console.log((k * I * Z * 0.001) / Math.pow(R, 2) * ((Emax / i) - 1) * Math.exp(-m_anod * ro_anod * Xe * (Math.cos(psi) / Math.cos(fi * Math.PI / 180))) * Math.exp(-m_filter * ro_filter * HFilter * 0.0001) * Math.exp(-m_window * ro_window * HWindow * 0.0001)* Math.exp(-m_glass * ro_glass * HGlass * 0.0001))

        i = i + 0.1
    }


    function changeSelectAnod(event) {
        setValueAnod(event.target.value);
    }

    function changeSelectFilter(event) {
        setValueFilter(event.target.value);
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
                                layer: "G"
                            },
                        ]}
                        layout={{width: 500, height: 300, title: 'Спектр тормозного излучения', xaxis: {title:"E"}, yaxis: {title:"N(E)"},}}

                    />
                </div>
                <div className={s.TwoColomn}>
                    <b>Выберите параметры:</b>
                    {/*<div className={s.item}>*/}
                    {/*    <span id={s.labelU}>прикладываемое напряжение, кВ</span>*/}
                    {/*    <input type="number" value={U} min={0} max={1000}*/}
                    {/*           onChange={(event) => dispatch(setParametr({parametr: 'U', ref: event.target.value}))}/>*/}
                    {/*</div>*/}
                    <div className={s.item}>
                        <span id={s.labelAnod}>материал анода</span>
                        <select value={valueAnod} onChange={changeSelectAnod}>
                            <option value="Wolframium">Вольфрам</option>
                            <option value="Rhenium">Рений</option>
                        </select>
                    </div>
                    <div className={s.item}>
                        <span id={s.labelAnod}>материал фильтра</span>
                        <select value={valueFilter} onChange={changeSelectFilter}>
                            <option value="Cuprum">Медь</option>
                            <option value="Aluminium">Алюминий</option>
                            <option value="Molybdenum">Молибден</option>
                        </select>
                    </div>
                    <div className={s.item}>
                        <span id={s.labelHWindow}>толщина выпускного окна, мкм</span>
                        <input type="number" value={HWindow} min={0}
                               onChange={(event) => dispatch(setParametr({
                                   parametr: 'HWindow',
                                   ref: event.target.value
                               }))}/>
                    </div>

                    <div className={s.item}>
                        <span id={s.labelHFilter}>толщина фильтра, мкм</span>
                        <input type="number" value={HFilter} min={0} max={1000}
                               onChange={(event) => dispatch(setParametr({
                                   parametr: 'HFilter',
                                   ref: event.target.value
                               }))}/>
                    </div>
                    <div className={s.item}>
                        <span id={s.labelP}>толщина стеклянного корпуса, мкм</span>
                        <input type="number" value={HGlass} min={0} max={100}
                               onChange={(event) => dispatch(setParametr({
                                   parametr: 'HGlass',
                                   ref: event.target.value
                               }))}/>
                    </div>
                    <div className={s.item}>
                        <span id={s.labelAngle}>Угол среза анода</span>
                        <input type="number" value={Angle} min={60} max={90}
                               onChange={(event) => dispatch(setParametr({
                                   parametr: 'angle',
                                   ref: event.target.value
                               }))}/>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Consumption;