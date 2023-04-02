import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useEffect } from 'react';
import style from './Reviews.module.css'
import { Link } from 'react-router-dom';
export default function Reviews() {
  
  let {id} = useParams();
  
  let [reviews,setReviews]=useState([]);
  
  let getReviews=async()=>{
    let{data}=  await axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=b81e4ea3c1d3d04d265bfa9056fb7110&language=en-US&page=1`);
    setReviews(data.results);
  }
  useEffect(() => {
    getReviews();
  }, [])
  
  
    return (
    <div>
        <div className="container">
        <div className='mt-5' > <Link className='bg-dark rounded-pill text-white px-3 py-3 fs-4' to={`/movie/${id}`}><i className="fa-solid fa-arrow-left pe-2"></i>Go Back </Link> </div>
        
            {reviews.map((review,index)=>(
                <div className={`d-flex mt-5 rounded p-3 gap-3 ${style.reviw}`} key={index}>
                     <div className="img_con ">
                     
                        <img src={`https://image.tmdb.org/t/p/w500${review.author_details.avatar_path}`} alt=""  />
                      </div>
                      <div className='text'>
                        <div className='d-flex gap-2'>
                        <h3>A Review by {review.author}</h3>
                        <div className={`rounded-pill bg-dark text-white px-2 py-0 ${style.rate}`}><i className="fa-solid fa-star pe-2"></i>{review.author_details.rating}.0</div>

                        </div>
                       
                        <p>Written by {review.author_details.name} on <span className='text-secondary fs-7'>{review.created_at}</span></p>
                        <p className='text-secondary'>{review.content.substring(0,400)}<a href={review.url} className='text-primary'>..Read more</a></p>
                      </div>
                     </div>

            ))

            }
           

       

        </div>
    </div>
  )
}
