import React from "react";
import style from './Loader.module.css';

export default function Loader() {
  return (
    <div className={style.Loader}>
      <div className={style.sk_chase}>
        <div className={style.sk_chase_dot} />
        <div className={style.sk_chase_dot} />
        <div className={style.sk_chase_dot} />
        <div className={style.sk_chase_dot} />
        <div className={style.sk_chase_dot} />
        <div className={style.sk_chase_dot} />
      </div>
    </div>
  );
}
