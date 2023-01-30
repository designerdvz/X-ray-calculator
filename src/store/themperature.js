import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    Tfp: 0,
    Pmax: 0,
    Tsp: 0,
    Ts: 0,
    la: 0,
    lm: 0,
    a: 0,
    b: 0,
    Ra: 2.9,
    Ha: 3.85,
    P: 2800,
    Rf: 0.22,
    Tosn: 100,
    Hm: 0.29,
    valueA: 'Wolframium',
    valueM: 'Wolframium',
    TfpMAX: 2000,
    c: [[2, 1.429, 1.111, 0.909, 0.769], //Двумерный массив для fm и ff
        [1.429, 1.111, 0.909, 0.769, 0.667],
        [1.111, 0.909, 0.769, 0.667, 0.588],
        [0.909, 0.769, 0.667,],
        [8.333, 3.125, 1.923, 1.389, 1.087],
        [9.259, 3.472, 2.137, 1.543, 1.208],
        [10.417, 3.906, 2.404, 1.736, 1.359],
        [11.905, 4.464, 2.747, 1.984, 1.553]]
}

export const themperatureSlice = createSlice({
        name: 'themperatureSlice',
        initialState,
        reducers: {
            setParametr: (state, action) => {
                state[action.payload.parametr] = action.payload.ref
            },
            calculate_Ts: (state, action) => {
                function roundPlus(x, n) { //x - число, n - количество знаков
                    if(isNaN(x) || isNaN(n)) return false;
                    let m = Math.pow(10,n);
                    return Math.round(x*m)/m;
                }
                state.Ts = roundPlus((action.payload.Tosn + (action.payload.P * (action.payload.Ha - 2 * action.payload.Ra)) / (Math.PI * action.payload.Ra * action.payload.Ra * action.payload.la)), 2)
            },
            calculate_Tsp: (state, action) => {
                function roundPlus(x, n) { //x - число, n - количество знаков
                    if(isNaN(x) || isNaN(n)) return false;
                    let m = Math.pow(10,n);
                    return Math.round(x*m)/m;
                }
                state.Tsp = roundPlus((action.payload.Ts + (action.payload.P) / (Math.PI * action.payload.Ra * action.payload.lm) * action.payload.a), 2)
            },
            calculate_Tfp: (state, action) => {
                function roundPlus(x, n) { //x - число, n - количество знаков
                    if(isNaN(x) || isNaN(n)) return false;
                    let m = Math.pow(10,n);
                    return Math.round(x*m)/m;
                }
                state.Tfp = roundPlus((action.payload.Ts + (action.payload.P) / (Math.PI * action.payload.Ra * action.payload.lm) * action.payload.b), 2)
            },
            calculate_Pmax: (state, action) => {
                function roundPlus(x, n) { //x - число, n - количество знаков
                    if(isNaN(x) || isNaN(n)) return false;
                    let m = Math.pow(10,n);
                    return Math.round(x*m)/m;
                }
                state.Pmax = roundPlus((((action.payload.TfpMAX - action.payload.Tosn) * Math.PI * action.payload.Ra * action.payload.Ra * action.payload.lm) / (action.payload.Ha - 2 * action.payload.Ra + action.payload.b * action.payload.Ra)), 2)
            },
        }
    }
)

export const {setParametr, calculate_Ts,calculate_Pmax,calculate_Tfp,calculate_Tsp, calculate_a_b, calculate_la_lm} = themperatureSlice.actions

export default themperatureSlice.reducer