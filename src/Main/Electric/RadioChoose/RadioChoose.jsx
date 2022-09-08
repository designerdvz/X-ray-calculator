import s from "./RadioChoose.module.css"
import React, {useState} from "react"
import {FormControlLabel, Radio, RadioGroup, FormControl, FormLabel} from "@mui/material";

function RadioChoose () {
    const [category, setCategory] = useState('money')
    console.log(category)
    return (
        <div className={s.wrapper}>
            <FormControl className={s.form}>
            <FormLabel>Выбери категорию:</FormLabel>
            <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
                <FormControlLabel value="money" control={<Radio/>} label="Money"/>
                <FormControlLabel value="money1" control={<Radio/>} label="Money1"/>
                <FormControlLabel value="money2" control={<Radio/>} label="Money2"/>
            </RadioGroup>
            </FormControl>
        </div>
    )

}

export default RadioChoose