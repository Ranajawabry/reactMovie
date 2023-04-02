import React from 'react'
import style from './Footer.module.css'
export default function Footer() {
  return (
    <div className={`py-3 text-center ${style.footer}`} >
        
        <ul className='"list-inline list-unstyled'>
            <li className='list-inline-item mx-4'><a className='text-white fs-4' href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
            <li className='list-inline-item mx-4'><a className='text-white fs-4' href="#"><i className="fa-brands fa-instagram"></i></a></li>
            <li className='list-inline-item mx-4'><a className='text-white fs-4' href="#"><i className="fa-brands fa-twitter"></i></a></li>
            <li className='list-inline-item mx-4'><a className='text-white fs-4' href="#"><i className="fa-brands fa-dribbble"></i></a></li>
        </ul>

    </div>
  )
}
