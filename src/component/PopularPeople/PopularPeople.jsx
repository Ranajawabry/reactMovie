import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import style from './PopularPeople.module.css'
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import pagination from '../../utlies/pagination';


export default function PopularPeople() {
   

    let [PopularPeople,setPopularPeople] = useState([]);
    let [loader,setLoader]=useState(true);

    let[pageInfo,setPageInfo]=useState({
      pageNumber:0 ,
      pageSize:8 
   })

   let ChangePage=(page)=>{
      setPageInfo({...pageInfo , pageNumber:page});

   }

    let getPeople=async()=>{
        let{data}=  await axios.get('https://api.themoviedb.org/3/person/popular?api_key=b81e4ea3c1d3d04d265bfa9056fb7110&language=en-US&page=2');
        
        
        setTimeout(()=>{
            setPopularPeople(data.results);
            setLoader(false);
            
        },2000)
       
    }
    useEffect(()=>{
        getPeople();

    },[])
     let result =""
    return (
    <div>
        <div className="container">
            <h1 className='my-5 text-center'> Popular People</h1>
            <hr />
            <div className="row mb-5 ">

              { loader && <Loader/>}
               
                {
                      pagination(PopularPeople,pageInfo.pageNumber,pageInfo.pageSize).map((People,index)=>(

                       
                       <div className='col-xl-3 col-md-4 ' key={index}>
                        <Link to={`/person/popular/${People.id}`}>
                        <div className={`card m-md-2 ${style.popular}`}  style={{width: '16rem'}}>
                        <img src={`https://image.tmdb.org/t/p/w500${People.profile_path}`} className="card-img-top" alt="..." />
                      <div className="card-body position-relative">
                        
                       <h6 className="card-title fw-bold mt-1">{People.name}</h6>
                       {
                           
                        People.known_for.map((text)=>{
                           text.original_name?result+= text.original_name+",":result+= text.original_title+',';
                             

                        })
                       }
                     <p className="card-text text-secondary ">{result.substring(0,33)}...</p>
                     {result = ''}
                      </div>
                          </div>
                          </Link>
                       </div>
                      

                    ))

                  }
            </div>
            <Pagination Array={PopularPeople} ChangePage={ChangePage} {...pageInfo} />


        </div>
    </div>
  )
}
