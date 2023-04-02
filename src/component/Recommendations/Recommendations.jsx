import axios from 'axios';
import React, { useEffect, useState } from 'react'
import style from './Recommendations.module.css'

export default function Recommendations(props) {
 
 let [Recoms,setRecom]=useState([]);

 let getRecom=async()=>{
    let {data}= await axios.get(`https://api.themoviedb.org/3/movie/${props.id}/recommendations?api_key=b81e4ea3c1d3d04d265bfa9056fb7110&language=en-US&page=1`)
    setRecom(data.results);
}
useEffect(()=>{
    getRecom();
},[])
 
    return (
        <>
        <hr className='my-3'></hr>
        <h3 className='mb-5'>Recommendations</h3>
    <div className={`d-flex gap-2 ${style.recom}`}>
        {
      Recoms.map((Recom,index)=>(
        <div key={index}>
        <img  src={`https://www.themoviedb.org/t/p/w220_and_h330_face${Recom.poster_path}`} className="rounded" alt='' height={250} />
        <p className='mt-2'>{Recom.title}</p>
        </div>

    ))
   }

    </div>
    </>
  )
}
