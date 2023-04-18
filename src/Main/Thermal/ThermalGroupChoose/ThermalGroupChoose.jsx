import React from 'react'
import s from './ThermalGroupChoose.module.css'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from '@mui/material'

function ThermalGroupChoose() {
    const [category, setCategory] = useState('flowSystem')

    const result = (category) => {
        if (category == 'flowSystem') {
            return 1
        }
        if (category == 'tubeSystem') {
            return 2
        }
    }

    return (
        <>
            <div className={s.wrapper}>
                <FormControl className={s.form}>
                    <FormLabel className={s.formLabel}>
                        Выберите вид охлаждающей системы:
                    </FormLabel>
                    <RadioGroup
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <div className={s.FormControlLabel}>
                            <FormControlLabel
                                value="flowSystem"
                                control={<Radio />}
                                label="Проточная система охлаждения"
                            />
                        </div>
                        <div className={s.FormControlLabel}>
                            <FormControlLabel
                                value="tubeSystem"
                                control={<Radio />}
                                label="В виде системы трубок"
                            />
                        </div>
                    </RadioGroup>
                </FormControl>
            </div>

            <div className={s.button}>
                <NavLink to={`/ThermalGroup${result(category)}`}>
                    <button className={s.button1}>Далее </button>
                </NavLink>
            </div>
        </>
    )
}
export default ThermalGroupChoose
