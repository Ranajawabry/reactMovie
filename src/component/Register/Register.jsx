import React, { useState } from 'react'
import Joi from 'joi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify'
export default function Register() {
  
  let navigate=useNavigate();
    let [user,setUser]= useState({
        name :'',
        email :'',
        password :'',
        cPassword :''
    })

    let [errorsList,setErrorsList]=useState([]);

   let getUser = (e)=>{
    let newUser=user;
    newUser[e.target.name]=e.target.value;
    setUser(newUser);
    console.log(user);
  }
   
  function userValidation(){
     const schema =  Joi.object({
        name : Joi.string().required().min(3).max(30).alphanum() ,
        email : Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()  ,
        password : Joi.string().required().messages({
          "string.empty": "password is empty",
          "string.pattern.base": "password invalied"
    
        }), 
        cPassword : Joi.valid(Joi.in('password')).messages({
          "cPassword must be [ref:password]" : "cPassword dont match"
        })
    })
       
     return schema.validate(user , {abortEarly:false});
  
  }

  let submitRegister = async(e)=>{
    e.preventDefault();
     let validationResult = userValidation();
     
     if(!validationResult.error){
       let {data} = await axios.post('https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signup', user );
       console.log(data);
       if(data.message ==="success"){
        console.log("hi");
        toast.success("registration done correctly");
        navigate('/login');
       }
     }
     else{
      console.log(validationResult);
      setErrorsList(validationResult.error.details);
      
     }

  }









    return (
    <div className='text-center'>

    

       <div className="container">
 <h1 className='my-4'>Register Form</h1>

 {
  errorsList.map((error,index)=>(
    <div key={index} className='text-center alert alert-danger'>
     {error.message}
    </div>

  ))
 }
 <form className='border border-dark p-5 rounded bg-light mb-5' onSubmit={submitRegister} >
 <div className="mb-3">
     <label htmlFor="exampleInputName" className="form-label">Name</label>
     <input type="text"   name ='name' className="form-control" id="exampleInputName" onChange={getUser} />
     
   </div>
   <div className="mb-3">
     <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
     <input type="email" name='email'  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"onChange={getUser} />
     <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
   </div>
   <div className="mb-3">
     <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
     <input type="password" name='password'className="form-control" id="exampleInputPassword1" onChange={getUser} />
   </div>
   <div className="mb-3">
     <label htmlFor="exampleInputPassword1" className="form-label">confirm Password</label>
     <input type="password" name='cPassword' className="form-control" id="exampleInputPassword1" onChange={getUser} />
   </div>
   <div className="mb-3">
     <label htmlFor="exampleInputAge" className="form-label">Age</label>
     <input type="number" name='age'  className="form-control" id="exampleInputAge" />
   </div>
   
   <button type="submit" className="btn btn-dark my-2">Submit</button>
 </form>
</div>
</div>

  )
}
