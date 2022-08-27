import React from 'react';
import s from './footer.module.css'

function Footer () {
   return ( <div className={s.wrapper}>
       <div className={s.content}>
           ©2022–2023 Расчёт характеристик рентгеновских трубок. СПбГЭТУ «ЛЭТИ».
       </div>
    </div>
   )
}
export default Footer;
