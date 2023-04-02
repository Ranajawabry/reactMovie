import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import style from './Search.module.css'
import { Link } from 'react-router-dom';

export default function Search({populars , nowPlaying, topRated, popularsTv}) {
  let {name}=useParams();
  console.log(name);
  let[movieResult,setmovieResult]=useState([]);
  let[tvResult,settvResult]=useState([]);


  let arr1=[];
  let arr2=[];
  let arr3=[];
  populars.filter((popular)=>{
    if(popular.original_title.toLowerCase().includes(name.toLowerCase())){
      arr1.push(popular)
    }
  })
  nowPlaying.filter((now)=>{
    if(now.original_title.toLowerCase().includes(name.toLowerCase())){
      arr1.push(now)
    }
  })
 
  topRated.filter((top)=>{
    if(top.original_title.toLowerCase().includes(name.toLowerCase())){
      arr1.push(top)
    }
  })
  popularsTv.filter((popular)=>{
    if(popular.original_name.toLowerCase().includes(name.toLowerCase())){
      arr3.push(popular)
    }
  })

  useEffect(()=>{
    setmovieResult(arr1);
   
    settvResult(arr3);

  },[])
  console.log(movieResult);
  console.log(tvResult)
  return (
    <div className='my-5'>
      <div className="container">
      {
        
      movieResult.map((movie,index)=>(
        <Link to={`/movie/${movie.id}`}>
          <div className={` ${style.popular} row rounded`} key={index} >
          <div className='col-2'>
            <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`} alt="" srcset="" />
          </div>
          <div className='ps-4 col-8'>
            <h5>{movie.original_title}</h5>
            <p className='text-secondary'>{movie.release_date}</p>

          </div>

        </div>
        
        </Link>
      

      ))

      }
       {
      tvResult.map((tv,index)=>(
        <div className={`${style.popular} row rounded`} key={index} >
          <div className='col-2'>
            <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face${tv.poster_path}`} alt="" srcset="" />
          </div>
          <div className='ps-4 col-8 py-2'>
            <h5>{tv.original_name}</h5>
            <p className='text-secondary'>{tv.release_date}</p>

          </div>

        </div>

      ))

      }
   





     

      </div>
    </div>
  )
}

