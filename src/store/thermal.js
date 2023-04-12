import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    d2: 0.015,
    d: 0.012,
    r1: 0.03,
    r2: 0.028,
    P: 100,
    tst: 30,
    tzh: 0,
    Q1: 0,
    Q2: 0,
    l1: 1, //теплопроводность жидкости
    l2: 267,
}

export const thermalSlice = createSlice({
    name: 'themperatureSlice',
    initialState,
    reducers: {
        setParametr: (state, action) => {
            state[action.payload.parametr] = action.payload.ref
        },
        calculate_Q1: (state, action) => {
            function roundPlus(x, n) {
                //x - число, n - количество знаков
                if (isNaN(x) || isNaN(n)) return false
                let m = Math.pow(10, n)
                return Math.round(x * m) / m
            }
            let W = 1.5 // кинематическая вязкость жидкости, м2/сек
            let S1 = Math.PI * ((action.payload.d2 * action.payload.d2) / 4)
            let V1 = (Math.pow(10, -4) * 2.5) / (6 * S1)
            let A = 1 // коэффициент температуропроводности
            let Pr = W / A
            let Re1 = (V1 * action.payload.d2) / W
            let F1 = Math.PI * action.payload.r1 * action.payload.r1
            let A1 =
                1.68 *
                Math.pow(Re1, 0.46) *
                Math.pow(Pr, 0.4) *
                (action.payload.l1 / action.payload.d2) //коэффициент теплоотдачи
            state.Q1 = roundPlus(
                A1 * F1 * (action.payload.tst - action.payload.tzh),
                2
            )
        },
        calculate_Q2: (state, action) => {
            console.log(
                'calculate_Q2___' +
                    'd=' +
                    action.payload.d +
                    'l1=' +
                    action.payload.l1 +
                    'r2=' +
                    action.payload.r2 +
                    'l2=' +
                    action.payload.l2 +
                    'tst=' +
                    action.payload.tst +
                    'tzh=' +
                    action.payload.tzh
            )
            function roundPlus(x, n) {
                //x - число, n - количество знаков
                if (isNaN(x) || isNaN(n)) return false
                let m = Math.pow(10, n)
                return Math.round(x * m) / m
            }
            let S2 = Math.PI * ((action.payload.d * action.payload.d) / 4)
            let L = 2 * Math.PI * action.payload.d
            let d3 = (4 * S2) / L //эквивалентный диаметр цилиндрического зазора
            let V2 = (Math.pow(10, -4) * 2.5) / (6 * S2)
            let W = 1.5 // кинематическая вязкость жидкости, м2/сек
            let Re2 = (V2 * d3) / W
            let A = 1 // коэффициент температуропроводности
            let Pr = W / A
            let A2 =
                0.22 *
                Math.pow(Re2, 0.6) *
                Math.pow(Pr, 0.4) *
                (action.payload.l1 / d3) //коэффициент теплоотдачи
            let F2 = Math.PI * action.payload.r2 * action.payload.r2
            let m = Math.pow((A2 * 0.25) / (action.payload.l2 * F2), 0.5)
            console.log(
                'S2=' +
                    S2 +
                    'L=' +
                    L +
                    'd3=' +
                    d3 +
                    'V2=' +
                    V2 +
                    'Re2=' +
                    Re2 +
                    'Pr=' +
                    Pr +
                    'A2=' +
                    A2 +
                    'F2=' +
                    F2
            )
            state.Q2 = roundPlus(
                (action.payload.tst - action.payload.tzh) *
                    action.payload.l2 *
                    F2 *
                    m *
                    action.payload.tst *
                    0.25,
                2
            )
        },
    },
})

export const { setParametr, calculate_Q2, calculate_Q1 } = thermalSlice.actions

export default thermalSlice.reducer
