import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    U: 50000,

    Emin: 0,
    P: 600,

    k: 0.000175, //коэф-т роорциональности
    Z: 74,
    R: 0.5, // расстояние до точки, в которой находим интенсивность
    psi: Math.PI / 6,

    m: 9.4 * Math.pow(10, -6) // массовый коэффициент ослабления

}
export const plotSlice = createSlice({
        name: 'plotSlice',
        initialState,
        reducers: {
            setParametr: (state, action) => {
                state[action.payload.parametr] = action.payload.ref
            },
        }
    }
)

export const {setParametr} = plotSlice.actions

export default plotSlice.reducer