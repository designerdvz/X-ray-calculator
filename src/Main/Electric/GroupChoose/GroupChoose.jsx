import React from 'react';
import s from './GroupChoose.module.css';
import {NavLink} from "react-router-dom";
import GroupChoose1 from "../FormControl";


function GroupChoose() {
    const [checked_1, setChecked_1] = React.useState(false)
    const [checked_2, setChecked_2] = React.useState(false)
    const [checked_3, setChecked_3] = React.useState(false)

    const result = (checked_1, checked_2, checked_3) => {
        if (checked_3) {
            return 3
        } else if (checked_2) {
            return 2
        } else if (checked_1) {
            return 1
        } else
            return 'h'
    }


    return (<div>
            <div className={s.modal}>
                <div className={s.content}>
                    <div className={s.title}>
                        Необходимо выбрать конструктивную группу:
                    </div>
                    <div className={s.item}>
                        <input
                            disabled={(checked_2) || (checked_3) ? true : false}
                            type="checkbox" id="id1"
                               className={s.checkbox} onChange={() => {setChecked_1(!checked_1)}}
                        />
                        <label for="id1"> С чехлом на аноде </label>
                    </div>
                    <div className={s.item}>
                        <input disabled={(checked_1) || (checked_3) ? true : false} type="checkbox" id="id2"
                               className={s.checkbox} onChange={() => setChecked_2(!checked_2)}/>
                        <label className={s.label} for="id2">С открытым полым пространством </label>
                    </div>
                    <div className={s.item}>
                        <input disabled={(checked_1) || (checked_2) ? true : false} type="checkbox" id="id3"
                               className={s.checkbox} onChange={() => setChecked_3(!checked_3)}/>
                        <label for="id3"> С двумя межлектродными промежутками </label>
                    </div>
                </div>
            </div>

            <div className={s.button}>
                <NavLink to={`/group${(result(checked_1, checked_2, checked_3))}`}>
                    <button>Далее </button>
                </NavLink>
                {console.log(result(checked_1, checked_2, checked_3))}

            </div>

        </div>
    )
}

export default GroupChoose;

