import React, { useState } from 'react'
import axios from 'axios';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import style from './TopRated.module.css'
import Pagination from '../Pagination/Pagination';
import pagination from '../../utlies/pagination';


export default function TopRated() {
    let[topRated,setTopRated]=useState([]);
    let [loader,setLoader]=useState(true);
   
    let[pageInfo,setPageInfo]=useState({
        pageNumber:0 ,
        pageSize:8 
     })
  
     let ChangePage=(page)=>{
        
        setPageInfo({...pageInfo , pageNumber:page});
  
     }

    let getTopRated=async()=>{
       let{data}=await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=b81e4ea3c1d3d04d265bfa9056fb7110&language=en-US&page=1');
       setTimeout(()=>{
          setTopRated(data.results);
           setLoader(false)

       },2000)
       
    }
   useEffect(()=>{
    getTopRated();
   },[])

    return (
    <div>
        <h1 className='text-center my-5'>Top Rated Movies</h1>
        <hr />
        <div className="container p-4">
           <div className="row ">
           
           { loader && <Loader/>}
            {
             
             pagination(topRated,pageInfo.pageNumber,pageInfo.pageSize).map((top,index)=>(

                   <div className='col-xl-3 col-md-4 p-2 '  key={index}>
                    <Link to={`/movie/${top.id}`}>
                    <div className={`card ${style.popular}`} style={{width: '16rem'}}>
                     <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face${top.poster_path}`} className="card-img-top" alt="..." />
                      <div className="card-body position-relative">
                        <div className={style.percent}>{Math.ceil(top.vote_average*10)}<sup>%</sup></div>
                       <h5 className="card-title fw-bold mt-1">{top.original_title}</h5>
                     <p className="card-text ">{top.release_date}</p>
                      </div>
                          </div>
                      </Link>

                   </div>



                ))
            }
        </div>

        <Pagination Array={topRated} ChangePage={ChangePage} {...pageInfo} />

        </div>


    </div>
  )
}
