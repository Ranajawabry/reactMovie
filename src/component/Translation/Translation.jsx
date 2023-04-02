import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Translation() {
  let {id}=useParams();
  let [translation,setTrans]=useState([]);
   
  let getTrans=async()=>{
    let {data}= await axios.get(`https://api.themoviedb.org/3/movie/${id}/translations?api_key=b81e4ea3c1d3d04d265bfa9056fb7110`);
    setTrans(data.translations);
   }
  useEffect(()=>{
    getTrans();
  },[])
  
    return (
    <div>
        <div className="container">
            
        </div>
    </div>
  )
}
