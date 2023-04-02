import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import pagination from '../../utlies/pagination';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import style from './Popular.module.css'

export default function Popular() {
     let[populars,setPopular]=useState([]);
     let [loader,setLoader]=useState(true);
     
     let[pageInfo,setPageInfo]=useState({
        pageNumber:0 ,
        pageSize:8 
     })

     let ChangePage=(page)=>{
        
        setPageInfo({...pageInfo , pageNumber:page});

     }
     let getPopular=async()=>{
        let{data}=await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=b81e4ea3c1d3d04d265bfa9056fb7110&language=en-US&page=1');
        setTimeout(()=>{
            setPopular(data.results);
            setLoader(false)

        },3000)
        
     }
    useEffect(()=>{
        getPopular();
    },[])
     return (
    <div>
        <h1 className='text-center my-5'>Popular Movies</h1>
        <hr />
        <div className="container p-4">
           <div className="row ">
           
           { loader && <Loader/>}
            {
             
                pagination(populars,pageInfo.pageNumber,pageInfo.pageSize).map((popular,index)=>(

                   <div className='col-xl-3 col-md-4 p-2 '  key={index}>
                    <Link to={`/movie/${popular.id}`}>
                    <div className={`card ${style.popular}`} style={{width: '16rem'}}>
                     <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face${popular.poster_path}`} className="card-img-top" alt="..." />
                      <div className="card-body position-relative">
                        <div className={style.percent}>{Math.ceil(popular.vote_average*10)}<sup>%</sup></div>
                       <h5 className="card-title fw-bold mt-1">{popular.original_title}</h5>
                     <p className="card-text ">{popular.release_date}</p>
                      </div>
                          </div>
                      </Link>

                   </div>



                ))
            }
           
           
        </div>
        <Pagination Array={populars} ChangePage={ChangePage} {...pageInfo} />
        </div>


    </div>
  )
}
