import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './UpComming.module.css'

export default function UpComming() {
    let[upComming,setUpComming]=useState([]);

    let getUpComming=async()=>{
       let{data}=await axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=b81e4ea3c1d3d04d265bfa9056fb7110&language=en-US&page=1');
       setUpComming(data.results);
    }
   useEffect(()=>{
    getUpComming();
   },[])
  
    return (
    <div>
        <h1 className='text-center my-5'>Up Comming Movies</h1>
        <hr />
        <div className="container p-4">
           <div className="row ">
            {
                upComming.map((upcome,index)=>(

                   <div className='col-xl-3 col-md-4 p-2 '  key={index}>
                    <Link to={`/movie/${upcome.id}`}>
                    <div className={`card ${style.popular}`} style={{width: '16rem'}}>
                     <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face${upcome.poster_path}`} className="card-img-top" alt="..." />
                      <div className="card-body position-relative">
                        <div className={style.percent}>{Math.ceil(upcome.vote_average*10)}<sup>%</sup></div>
                       <h5 className="card-title fw-bold mt-1">{upcome.original_title}</h5>
                     <p className="card-text ">{upcome.release_date}</p>
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
