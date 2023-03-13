import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    d2: 0.015,
    ro: 0,
    d: 0.012,
    r1: 0.03,
    r2: 0.028,
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

        }
    }
)

export const {setParametr } = thermalSlice.actions

export default thermalSlice.reducer