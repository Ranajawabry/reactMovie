import React, { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react';
import style from './KnownFor.module.css'
export default function KnownFor(props) {
  
    let[Knowns,setKnown]=useState([]);
    
    let getKnown=async()=>{
        let{data}= await axios.get(`https://api.themoviedb.org/3/person/${props.id}/movie_credits?api_key=b81e4ea3c1d3d04d265bfa9056fb7110&language=en-US`)
        setKnown(data.cast);
    }    
 useEffect(()=>{
    getKnown();
 },[])
   

 return (
    <div className={`${style.known} d-flex gap-2  my-5` }>
        {Knowns.map((Known,index)=>(
           
           <div className={`card m-2 ${style.popular}`}  style={{width: '300px'}} key={index}>
                        <img src={`https://image.tmdb.org/t/p/w500${Known.poster_path}`} className="card-img-top" alt="..." />
                      <div className="card-body position-relative">
                        
                       <h6 className="card-title fw-bold mt-1">{Known.title}</h6>
                      
                      </div>
                          </div>

        ))}
    </div>
  )
}
