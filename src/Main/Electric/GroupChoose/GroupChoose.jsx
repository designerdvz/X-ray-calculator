import React from 'react'
import s from './GroupChoose.module.css'
import { NavLink } from 'react-router-dom'
import GroupChoose1 from '../FormControl'
import { useState } from 'react'
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from '@mui/material'

function GroupChoose() {
    const [category, setCategory] = useState('withCase')

    const result = (category) => {
        if (category == 'withCase') {
            return 1
        }
        if (category == 'withOpen') {
            return 2
        }
        if (category == 'withTwo') {
            return 3
        }
    }

    return (
        <>
            <div className={s.wrapper}>
                <FormControl className={s.form}>
                    <FormLabel className={s.formLabel}>
                        Выберите конструктивную группу:
                    </FormLabel>
                    <RadioGroup
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <div className={s.FormControlLabel}>
                            <FormControlLabel
                                value="withCase"
                                control={<Radio />}
                                label="С чехлом на аноде"
                            />
                        </div>
                        <div className={s.FormControlLabel}>
                            <FormControlLabel
                                value="withOpen"
                                control={<Radio />}
                                label="С открытым пролётным пространством"
                            />
                        </div>
                        <div className={s.FormControlLabel}>
                            <FormControlLabel
                                value="withTwo"
                                control={<Radio />}
                                label="С двумя межэлектродными промежутками"
                            />
                        </div>
                    </RadioGroup>
                </FormControl>
            </div>

            <div className={s.button}>
                <NavLink to={`/group${result(category)}`}>
                    <button className={s.button1}>Далее </button>
                </NavLink>
            </div>
        </>
    )
}
export default GroupChoose
