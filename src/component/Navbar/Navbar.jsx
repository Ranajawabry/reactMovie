import React from 'react'
import { Link } from 'react-router-dom'
import style from './Navbar.module.css'

export default function Navbar(props) {
  
  console.log(props);
  
  return (
    <div>
     <nav className="navbar navbar-expand-lg bg-dark ">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/home"><img src="logo.webp" width={50} height={50} alt="" className='rounded' /></Link>
    <button className="text-white navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active text-white" aria-current="page" to="/home">Home</Link>
        </li>
       
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           Movies
          </a>
          <ul className="dropdown-menu ">
            <li><Link className="dropdown-item" to='/movie/popular'>Popular</Link></li>
            <li><Link className="dropdown-item" to='/movie/now_playing'>Now Playing</Link></li>
            <li><Link className="dropdown-item" to='/movie/up_comming'>Up Comming</Link></li>
            <li><Link className="dropdown-item" to='/movie/top_rated'>Top Rated</Link></li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           TV Shows
          </a>
          <ul className="dropdown-menu ">
            <li><Link className="dropdown-item" to='/TV/popular'>Popular</Link></li>
            <li><a className="dropdown-item" href="#">Airing Today</a></li>
            <li><a className="dropdown-item" href="#">On TV</a></li>
            <li><a className="dropdown-item" href="#">Top Rated</a></li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           Pepole
          </a>
          <ul className="dropdown-menu ">
            <li><Link className="dropdown-item" to='/person/popular'>Popular Pepole</Link></li>
           
          </ul>
        </li>
        
      </ul>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
       {
       props.userdata ==null?
       <>
       <li className="nav-item">
          <Link className="nav-link active text-white" aria-current="page" to='/login'>Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active text-white" aria-current="page" to='/register'>Register</Link>
        </li>
       </> : null}
       
    
        {props.userdata?
        <li className="nav-item">
        <span className="nav-link active text-white" aria-current="page" onClick={props.logOut}  >Logout</span>
         </li>:null }
        
        
    
      </ul>
      
    </div>
  </div>
</nav>

    </div>
  )
}
