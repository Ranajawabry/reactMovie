import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './TvPopular.module.css'

export default function TvPopular() {
  
    let[populars,setPopular]=useState([]);
    
    let getPopular=async()=>{
       let{data}=await axios.get('https://api.themoviedb.org/3/tv/popular?api_key=b81e4ea3c1d3d04d265bfa9056fb7110&language=en-US&page=1');
       setPopular(data.results);
    }
   useEffect(()=>{
       getPopular();
   },[])
  
    return (
    <div>
<h1 className='text-center my-5'>Popular TV-show</h1>
        <hr />
        <div className="container p-4">
           <div className="row ">
            {
                populars.map((popular,index)=>(

                   <div className='col-xl-3 col-md-4 p-2 '  key={index}>
                    <Link to={`/movie/${popular.id}`}>
                    <div className={`card ${style.popular}`} style={{width: '16rem'}}>
                     <img src={`https://image.tmdb.org/t/p/w500${popular.poster_path}`} className="card-img-top" alt="..." />
                      <div className="card-body position-relative">
                        <div className={style.percent}>{Math.ceil(popular.vote_average*10)}<sup>%</sup></div>
                       <h5 className="card-title  mt-1">{popular.original_name}</h5>
                     <p className="card-text ">{popular.release_date}</p>
                      </div>
                          </div>
                      </Link>

                   </div>



                ))
            }
        </div>
        </div>
    </div>
  )
}
