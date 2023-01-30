import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    d2: 0.015,
    ro: 0,
    d: 0.012,
    r1: 0.03,
    r2: 0.028,
    l: 0.25,
    P: 100,
    tst: 30,
    tzh: 0,
    Q1: 0,
    Q2: 0,
    l1: 1, //теплопроводность жидкости
    l2: 267
}

export const thermalSlice = createSlice({
        name: 'themperatureSlice',
        initialState,
        reducers: {
            setParametr: (state, action) => {
                state[action.payload.parametr] = action.payload.ref
            },
            calculate_Q1: (state, action) => {
                function roundPlus(x, n) { //x - число, n - количество знаков
                    if(isNaN(x) || isNaN(n)) return false;
                    let m = Math.pow(10,n);
                    return Math.round(x*m)/m;
                }
                let A = 1 // коэффициент температуропроводности
                let V = 2.5 // скорость жидкости
                let W = 1.5 // кинематическая вязкость жидкости, м2/сек
                let Re1 = (((V * 0.0004)/(6*Math.PI * Math.pow((action.payload.d2/2),2)))*action.payload.d2)/W
                let A1 = 1.68 * Math.pow(Re1, 0.46) * Math.pow(W/A, 0.4) * (action.payload.l1/action.payload.d2) //коэффициент теплоотдачи
                state.Q1 = roundPlus((A1 * Math.PI * Math.pow(action.payload.r1, 2) * (action.payload.tst - action.payload.tzh)), 2)
            },
            calculate_Q2: (state, action) => {
                function roundPlus(x, n) { //x - число, n - количество знаков
                    if(isNaN(x) || isNaN(n)) return false;
                    let m = Math.pow(10,n);
                    return Math.round(x*m)/m;
                }
                let A = 1 // коэффициент температуропроводности
                let V = 2.5 // скорость жидкости
                let W = 1.5 // кинематическая вязкость жидкости, м2/сек
                let Re2 = (((V * 0.0004)/(6 * Math.PI * Math.pow((action.payload.d/2),2)))*((4 * Math.PI * Math.pow(action.payload.d/2), 2) /(2* Math.PI * action.payload.d)))/W
                let A2 = 0.22 * Math.pow(Re2, 0.6) * Math.pow(W/A, 0.4) * (action.payload.l1/(4 * Math.PI * Math.pow(action.payload.d/2, 2))/(2* Math.PI * action.payload.d)) //коэффициент теплоотдачи
                let m = Math.pow((A2 * action.payload.l)/(action.payload.l2 * Math.PI * Math.pow(action.payload.r2, 2)) ,0.5)
                state.Q2 = roundPlus((action.payload.tst - action.payload.tzh) * action.payload.l2 * Math.PI * Math.pow(action.payload.r2,2) * m * action.payload.tst * action.payload.l, 2)
                console.log(Re2)
            },
        }
    }
)

export const {setParametr,calculate_Q2, calculate_Q1 } = thermalSlice.actions

export default thermalSlice.reducer