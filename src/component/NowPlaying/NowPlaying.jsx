import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './NowPlaying.module.css'
import pagination from '../../utlies/pagination';
import Pagination from '../Pagination/Pagination';
export default function NowPlaying() {
 
    let[nowPlaying,setNowPlaying]=useState([]);
   
    let[pageInfo,setPageInfo]=useState({
      pageNumber:0 ,
      pageSize:8 
   })

   let ChangePage=(page)=>{
      
      setPageInfo({...pageInfo , pageNumber:page});

   }

    let getNowPlaying=async()=>{
       let{data}=await axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=b81e4ea3c1d3d04d265bfa9056fb7110&language=en-US&page=1');
       setNowPlaying(data.results);
    }
   useEffect(()=>{
    getNowPlaying();
   },[])
    return (
    <div>
        <h1 className='text-center my-5'>Now Playing Movies</h1>
        <hr />
        <div className="container p-4">
           <div className="row ">
            {
                pagination(nowPlaying,pageInfo.pageNumber,pageInfo.pageSize).map((nowPlay,index)=>(

                   <div className='col-xl-3 col-md-4 p-2 '  key={index}>
                    <Link to={`/movie/${nowPlay.id}`}>
                    <div className={`card ${style.popular}`} style={{width: '16rem'}}>
                     <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face${nowPlay.poster_path}`} className="card-img-top" alt="..." />
                      <div className="card-body position-relative">
                        <div className={style.percent}>{Math.ceil(nowPlay.vote_average*10)}<sup>%</sup></div>
                       <h5 className="card-title fw-bold mt-1">{nowPlay.original_title}</h5>
                     <p className="card-text ">{nowPlay.release_date}</p>
                      </div>
                          </div>
                      </Link>

                   </div>



                ))
            }
        </div>
        <Pagination Array={nowPlaying} ChangePage={ChangePage} {...pageInfo} />
        </div>

    </div>
  )
}
