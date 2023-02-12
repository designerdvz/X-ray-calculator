import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    U: 30,
    HWindow: 10, //толщина выпускного окна
    HFilter: 0.2, //толщина фильтра
    HGlass: 12, //толщина стеклянного корпуса
    Angle: 60, //угол среза анода
    Emin: 0,
    P: 3,
    k: 8.8 * Math.pow(10,8), //коэф-т роорциональности
    R: 1, // расстояние до точки, в которой находим интенсивность
    psi: Math.PI / 2,
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