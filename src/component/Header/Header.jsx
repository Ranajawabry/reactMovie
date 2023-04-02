import React from 'react'
import Trending from '../Trending/Trending'
import { useState } from 'react';
import style from './Header.module.css'
import Search from '../Search/Search';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Header() {
  let navigate= useNavigate();
  let [search,setSearch]=useState('');
  
  let getSearch=(e)=>{
    e.preventDefault();
    setSearch(e.target.value);
    console.log(search)
  }

  let searchData=(e)=>{
    e.preventDefault();
    console.log('llll');
    if(search != ''){
   
      navigate(`/search/${search}`) 
    }
  }

  return (
    <div>
   <div className={style.header}>

   <div  className={`text-white  ${style.text_con}`}>
      <h1 >Welcome.</h1>
      <h2 >Millions of movies, TV shows and people to discover. Explore now.</h2>
   </div>
   <div className=' position-relative'>
     <form action="" method="get" onSubmit={searchData}>

      <input type="search" className='form-control w-75 rounded-pill py-2 ' onChange={(e)=>{getSearch(e)}} placeholder='Search for a movie, tv show, person......' />
      <input type="submit" value="search" className={`${style.search} rounded-pill border-0`} />
      </form>
   </div>
   </div>
    <Trending/>
    </div>
  )
}
