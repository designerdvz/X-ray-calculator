import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    Ra: 1.5,
    Ha: 3.5,
    P: 2800,
    Rf: 0.22,
    Tosn: 70,
    Hm: 0.1,
    valueA: 'Wolframium',
    valueM: 'Wolframium',
    TfpMAX: 2000,
    la: 0,
    lm: 0,
    a: 0,
    b: 0,
    Tfp: 0,
    Pmax: 0,
    Tsp: 0,
    Ts: 0,
    valid: true,
}

export const themperatureSlice = createSlice({
        name: 'themperatureSlice',
        initialState,
        reducers: {
            setParametr: (state, action) => {
                state[action.payload.parametr] = action.payload.ref
            },
            valid_Ha_Ra: (state, action) => {
                if (state.Ha >= state.Ra * 2) {
                    state.valid = true
                } else state.valid = false
            },
            calculate_La_Lm: (state, action) => {
                    // state.valid = true
                console.log('La_Lm_вычисление___' + 'Ha='+ action.payload.Ha + 'Ra=' +action.payload.Ra + 'valueA='+ action.payload.valueA + 'valueM=' + action.payload.valueM)
                if (action.payload.valueA === 'Wolframium') { //данные взяты из интернета (теплопроводность в Вт/см*цельсий)
                        state.la = 1.63
                    } else if (action.payload.valueA === 'Cuprum') {
                        state.la = 3.8
                    }
                    if (action.payload.valueM === 'Wolframium') {
                        state.lm = 1.63
                    } else if (action.payload.valueM === 'Cuprum') {
                        state.lm = 3.80
                    } else if (action.payload.valueM === 'Molybdaenum') {
                        state.lm = 1.35
                    } else if (action.payload.valueM === 'Argentum') {
                        state.lm = 4.30
                    } else if (action.payload.valueM === 'Rhenium') {
                        state.lm = 0.48
                    }
                console.log('новые значения'+ state.la, state.lm)
            },
            calculate_a_b: (state, action) => {
                console.log('a_b вычисление___' +'Hm=' + action.payload.Hm + 'Rf=' + action.payload.Rf + 'Ra=' + action.payload.Ra)

                const c = [[2, 1.429, 1.111, 0.909, 0.769], //Двумерный массив для fm и ff
                    [1.429, 1.111, 0.909, 0.769, 0.667],
                    [1.111, 0.909, 0.769, 0.667, 0.588],
                    [0.909, 0.769, 0.667,],
                    [8.333, 3.125, 1.923, 1.389, 1.087],
                    [9.259, 3.472, 2.137, 1.543, 1.208],
                    [10.417, 3.906, 2.404, 1.736, 1.359],
                    [11.905, 4.464, 2.747, 1.984, 1.553]]
                state.a = c[0][0]
                state.b = c[0][0]
                let x = action.payload.Rf / action.payload.Ra
                let y = action.payload.Hm / action.payload.Ra

                if (x <= 0.1) {
                    if (y <= 0.1) {
                        state.a = c[0][0];
                        state.b = c[4][0];
                    }
                    if (y > 0.1 && y <= 0.2) {
                        state.a = c[1][0];
                        state.b = c[5][0];
                    }
                    if (y > 0.2 && y <= 0.3) {
                        state.a = c[2][0];
                        state.b = c[6][0];
                    }
                    if (y > 0.3 && y <= 0.4) {
                        state.a = c[3][0];
                        state.b = c[7][0];
                    }
                }
                if (x > 0.1 && x <= 0.2) {
                    if (y <= 0.1) {
                        state.a = c[0][1];
                        state.b = c[4][1];
                    }
                    if (y > 0.1 && y <= 0.2) {
                        state.a = c[1][1];
                        state.b = c[5][1];
                    }
                    if (y > 0.2 && y <= 0.3) {
                        state.a = c[2][1];
                        state.b = c[6][1];
                    }
                    if (y > 0.3 && y <= 0.4) {
                        state.a = c[3][1];
                        state.b = c[7][1];
                    }
                }
                if (x > 0.2 && x <= 0.3) {
                    if (y <= 0.1) {
                        state.a = c[0][2];
                        state.b = c[4][2];
                    }
                    if (y > 0.1 && y <= 0.2) {
                        state.a = c[1][2];
                        state.b = c[5][2];
                    }
                    if (y > 0.2 && y <= 0.3) {
                        state.a = c[2][2];
                        state.b = c[6][2];
                    }
                    if (y > 0.3 && y <= 0.4) {
                        state.a = c[3][2];
                        state.b = c[7][2];
                    }
                }
                if (y > 0.3 && y <= 0.4) {
                    if (y <= 0.1) {
                        state.a = c[0][3];
                        state.b = c[4][3];
                    }
                    if (y > 0.1 && y <= 0.2) {
                        state.a = c[1][3];
                        state.b = c[5][3];
                    }
                    if (y > 0.2 && y <= 0.3) {
                        state.a = c[2][3];
                        state.b = c[6][3];
                    }
                    if (y > 0.3 && y <= 0.4) {
                        state.a = c[3][3];
                        state.b = c[7][3];
                    }
                }
                if (x >= 0.5) {
                    if (y <= 0.1) {
                        state.a = c[0][4];
                        state.b = c[4][4];
                    }
                    if (y > 0.1 && y <= 0.2) {
                        state.a = c[1][4];
                        state.b = c[5][4];
                    }
                    if (y > 0.2 && y <= 0.3) {
                        state.a = c[2][4];
                        state.b = c[6][4];
                    }
                    if (y > 0.3 && y <= 0.4) {
                        state.a = c[3][4];
                        state.b = c[7][4];
                    }
                }
            },
            calculate_Ts: (state, action) => {
                console.log('Ts_вычисление___' + 'Tosn='+ action.payload.Tosn + 'P=' +action.payload.P + 'Ha='+ action.payload.Ha + 'Ra=' + action.payload.Ra+ 'la=' + state.la)
                function roundPlus(x, n) { //x - число, n - количество знаков
                    if(isNaN(x) || isNaN(n)) return false;
                    let m = Math.pow(10,n);
                    return Math.round(x*m)/m;
                }
                state.Ts = roundPlus((action.payload.Tosn + (action.payload.P * (action.payload.Ha - 2 * action.payload.Ra)) / (Math.PI * action.payload.Ra * action.payload.Ra * state.la)), 2)
            },
            calculate_Tsp: (state, action) => {
                console.log('Tsp_вычисление___' + 'Tosn='+ action.payload.Tosn + 'P=' +action.payload.P + 'Ha='+ action.payload.Ha + 'Ra=' + action.payload.Ra+ 'la=' + state.la+ 'lm=' + action.payload.lm+ 'a=' + state.a)
                function roundPlus(x, n) { //x - число, n - количество знаков
                    if(isNaN(x) || isNaN(n)) return false;
                    let m = Math.pow(10,n);
                    return Math.round(x*m)/m;
                }
                state.Tsp = roundPlus(((roundPlus((action.payload.Tosn + (action.payload.P * (action.payload.Ha - 2 * action.payload.Ra)) / (Math.PI * action.payload.Ra * action.payload.Ra * state.la)), 2)) + ((action.payload.P) / (Math.PI * action.payload.Ra * state.lm)) * state.a), 2)
            },
            calculate_Tfp: (state, action) => {
                console.log('Tfp_вычисление___' + 'Tosn='+ action.payload.Tosn + 'P=' +action.payload.P + 'Ha='+ action.payload.Ha + 'Ra=' + action.payload.Ra+ 'la=' + state.la+ 'lm=' + state.lm+ 'b=' + state.b)
                function roundPlus(x, n) { //x - число, n - количество знаков
                    if(isNaN(x) || isNaN(n)) return false;
                    let m = Math.pow(10,n);
                    return Math.round(x*m)/m;
                }
                state.Tfp = roundPlus(((roundPlus((action.payload.Tosn + (action.payload.P * (action.payload.Ha - 2 * action.payload.Ra)) / (Math.PI * action.payload.Ra * action.payload.Ra * state.la)), 2)) + (action.payload.P) / (Math.PI * action.payload.Ra * state.lm) * state.b), 2)
            },
            calculate_Pmax: (state, action) => {
                console.log('Pmax_вычисление___' + 'Tosn='+ action.payload.Tosn + 'TfpMAX=' +action.payload.TfpMAX + 'Ha='+ action.payload.Ha + 'Ra=' + action.payload.Ra+ 'lm=' + state.lm+ 'b=' + state.b)
                function roundPlus(x, n) { //x - число, n - количество знаков
                    if(isNaN(x) || isNaN(n)) return false;
                    let m = Math.pow(10,n);
                    return Math.round(x*m)/m;
                }
                state.Pmax = roundPlus((((action.payload.TfpMAX - action.payload.Tosn) * Math.PI * action.payload.Ra * action.payload.Ra * state.lm) / (action.payload.Ha - 2 * action.payload.Ra + state.b * action.payload.Ra)), 2)
            },
        }
    }
)

export const {setParametr, calculate_La_Lm, calculate_a_b, calculate_Ts,calculate_Pmax,calculate_Tfp,calculate_Tsp, valid_Ha_Ra} = themperatureSlice.actions

export default themperatureSlice.reducer