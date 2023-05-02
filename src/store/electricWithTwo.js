import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    d: 0,
    D2: 0,
    U: 30,
    D1: 0,
    C: 33,
    K: 0.6,
}

export const electricWithTwoSlice = createSlice({
    name: 'electricWithTwo',
    initialState,
    reducers: {
        setParametr: (state, action) => {
            state[action.payload.parametr] = action.payload.ref
        },
        // D1 = roundPlus((D2 * Math.exp((2*U)/(30*D2))),2)
        calculate_D1: (state, action) => {
            function roundPlus(x, n) {
                //x - число, n - количество знаков
                if (isNaN(x) || isNaN(n)) return false
                let m = Math.pow(10, n)
                return Math.round(x * m) / m
            }
            state.D1 = roundPlus(
                action.payload.D2 *
                    Math.exp(
                        (2 * action.payload.U) / (30 * action.payload.D2),
                        action.payload.d2
                    ),
                2
            )
        },
        // r = roundPlus((0.1 * B * U),2)
        calculate_d: (state, action) => {
            function roundPlus(x, n) {
                //x - число, n - количество знаков
                if (isNaN(x) || isNaN(n)) return false
                let m = Math.pow(10, n)
                return Math.round(x * m) / m
            }
            state.d = roundPlus(
                Math.pow(action.payload.d1, action.payload.d2),
                2
            )
        },
    },
})

export const { setParametr, calculate_d, calculate_D1 } =
    electricWithTwoSlice.actions

export default electricWithTwoSlice.reducer
