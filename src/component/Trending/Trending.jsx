import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import InnerLoader from './InnerLoader';
import style from './Trending.module.css'




export default function Trending() {
 
 let[trending,setTrending]=useState([]);

 let[timeWindow,setTimewindow]=useState("day");

 let[loader,setLoader]=useState(true);

 let getTrending = async()=>{
    let{data}= await axios.get(`https://api.themoviedb.org/3/trending/all/${timeWindow}?api_key=b81e4ea3c1d3d04d265bfa9056fb7110`);
    setTimeout(()=>{
        setLoader(false);
        setTrending(data.results);
    },2000)
  
 }
  
 let getTimewindow=(e)=>{
    e.preventDefault();
    if(e.target.InnerText=="Today"){
        setTimewindow('day');
        setTrending([]);
        setLoader(true);
        setTimeout(()=>{
        getTrending();
        },1000);
        
        console.log(trending)
    }
    else{
        setTimewindow('week');
        setTrending([]);
       setLoader(true);
        setTimeout(()=>{
         getTrending();
        },1000);
        
        console.log(trending)

    }
 }


 
 
 useEffect(()=>{
    getTrending();
  },[])
 
 
    return (

    <div className='my-4'>
        <div className="container">
        <div className='d-flex gap-5 my-4'>
            <h2>Trending</h2>
            <div className={`${style.head} d-flex gap-5 rounded-pill`}>
                <h5 className={`${style.title} ps-3 pt-2`} id='day'><a href='#' onClick={(e)=>{getTimewindow(e)}}>Today</a></h5>
                <h5 className={ `${style.title} px-3 pt-2`}  id='week'><a onClick={(e)=>{getTimewindow(e)}} href='#'>This Week</a></h5>
            </div>
        </div>
        <div className={`${style.inner_Movies} d-flex gap-2 my-2 p-2 rounded `} >
           
           { loader && <InnerLoader/> }
           
            {
                
                trending.map((trend,index)=>(
                    <div   key={index}>
                    <Link to={`/movie/${trend.id}`}>
                    <div className={`card ${style.popular} mt-4`} style={{width: '14rem'}}>
                     <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face${trend.poster_path}`} className="card-img-top" alt="..." />
                      <div className="card-body position-relative">
                        <div className={style.percent}>{Math.ceil(trend.vote_average*10)}<sup>%</sup></div>
                       <h5 className="card-title fw-bold mt-1">{trend.original_title || trend.original_name }</h5>
                     <p className="card-text ">{trend.release_date}</p>
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
