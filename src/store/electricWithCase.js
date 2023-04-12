import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    d: 0,
    U: 30,
    C: 47,
    K: 0.6,
}

export const electricWithCaseSlice = createSlice({
    name: 'electricWithCase',
    initialState,
    reducers: {
        setParametr: (state, action) => {
            state[action.payload.parametr] = action.payload.ref
        },
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
        // r = roundPlus((0.1 * B * U),2)
        calculate_r: (state, action) => {
            function roundPlus(x, n) {
                //x - число, n - количество знаков
                if (isNaN(x) || isNaN(n)) return false
                let m = Math.pow(10, n)
                return Math.round(x * m) / m
            }
            state.r = roundPlus(0.1 * action.payload.B * action.payload.U, 2)
        },
    },
})

export const { setParametr, calculate_d } = electricWithCaseSlice.actions

export default electricWithCaseSlice.reducer
