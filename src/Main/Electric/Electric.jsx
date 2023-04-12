import React from 'react'
import s from './electric.module.css'
import Modal from '../../Modal/Modal'
import GroupChoose from './GroupChoose/GroupChoose'

function Electric() {
    let modalText =
        'Задача раздела об электрической прочности рентгеновской трубки- оценить способность прибора обеспечивать стабильную работу при приложении к электродам заданного высокого напряжения. Необходимо вычислить геометрические параметры: межэлектродное расстояние, а также, исходя из выбора конструктивной группы, могут потребоваться вычисления и других параметров, таких как расстояние электрод-баллон, внутренний диаметр анодного узла, диаметр катодного узла. Все размеры вычисляются исходя из выбранных параметров: приложенного напряжения, материала мишени и конструктивной группы.'
    return (
        <div className={s.wrapper}>
            <div className={s.content}>
                <Modal text={modalText} />
                <GroupChoose />
            </div>
        </div>
    )
}
export default Electric
