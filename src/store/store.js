import { configureStore } from '@reduxjs/toolkit'
import electric_withOpen from './electricWithOpenSlice'
import electric_withTwo from './electricWithTwo'
import electric_withCase from './electricWithCase'
import thermal from './thermal'
import themperature from './themperature'
import plot from './plot'
export const store = configureStore({
    reducer: {
        electric_withOpen: electric_withOpen,
        electric_withTwo: electric_withTwo,
        electric_withCase: electric_withCase,
        themperature: themperature,
        thermal: thermal,
        plot: plot,
    },
})
