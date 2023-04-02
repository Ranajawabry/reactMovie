import React from 'react'
import style from './InnerLoader.module.css'

export default function InnerLoader() {
  return (
    <div className={style.loader}>
   <div className={style.spinner}>
   <div className={style.bounce1} />
   <div className={style.bounce2} />
   <div className={style.bounce3} />
   </div>
    </div>
  )
}
