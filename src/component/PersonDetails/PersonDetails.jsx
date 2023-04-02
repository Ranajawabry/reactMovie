import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import KnownFor from '../KnownFor/KnownFor';
export default function PersonDetails() {
  
  let [personDetails,setPersonDetails]=useState({});
  let{id}=useParams();
  let getDetails=async()=>{
    let{data}= await axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=b81e4ea3c1d3d04d265bfa9056fb7110&language=en-US`);
    setPersonDetails(data);
  }
  useEffect(()=>{
    getDetails();
  },[])
  
  
    return (
    <div>
        <div className="container">
            <div className="row">
                <div className="img_con col-md-3">
                    <img src={`https://image.tmdb.org/t/p/w500${personDetails.profile_path}`} alt=""  />
                    <h4 className='my-4'>Personal Info</h4>
                    <h5>Known For </h5>
                    <p>{personDetails.known_for_department}</p>
                    
                    <h5>Gender</h5>
                    <p>{
                    personDetails.gender==1? "Female": "male"}
                    </p>

                    <h5>Birthday</h5>
                    <p>{personDetails.birthday}</p>

                    <h5>Day of Death</h5>
                    <p>{personDetails.deathday}</p>

                    <h5>Place of Birth</h5>
                    <p>{personDetails.place_of_birth}</p>

                    


                </div>
                <div className="text_con col-md-9">
                    <h2 className='my-3 fw-bold'>{personDetails.name}</h2>
                    <h4 className='my-3'>Biography</h4>
                    <p className='text-secondery'>{personDetails.biography}</p>
                    
                    <KnownFor id={personDetails.id}/>
                   
  

                </div>
            </div>
        </div>
    </div>
  )
}
