import React, { useState } from 'react'
import Joi from 'joi'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Login(props){
 

let navigate=useNavigate();

 let [user,setUser]=useState({
      email :'' ,
      password : ''
 })
 let [errorsList,setErrorsList]=useState([]);

 let getData = (e)=>{
  setErrorsList([]);
  let newUser= user;
  newUser[e.target.name]=e.target.value;
  setUser(newUser);
  console.log(user);
 }
  
function inputValidation(){
   const schema = Joi.object({
    email : Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()  ,
    password : Joi.string().required()
   })
   return schema.validate(user);
}
let err=[]
let userLogin = async(e)=>{
  e.preventDefault();
console.log(inputValidation());
if(inputValidation().error){
 inputValidation().error.details.map((error)=>{
  err.push(err.message)

 })
 setErrorsList(err);

}
else{
  let {data} = await axios.post('https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signin',user);
  console.log(data);
  if(data.message ==="success"){
    setErrorsList([]);
   localStorage.setItem("UserToken",data.token);
   props.getUserData();
   navigate('/home');

  }
  else{
    err.push(data.message);
    setErrorsList(err);
  }

}


}
 
 
  return (
    <div >
        <div className="container">
        <div className="my-4 text-center">
          <h1 >Login</h1>
        </div>

        {
  errorsList.map((error,index)=>(
    <div key={index} className='text-center alert alert-danger'>
     {error}
    </div>

  ))
 }
      <form className='w-75 m-auto border border-dark p-5 rounded bg-light mb-5' action="" onSubmit={userLogin}>

      <div className="mb-3 ">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            name="email"
            placeholder="name@example.com"
            onChange={getData}
            
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleFormControlInput1"
            name="password"
            onChange={getData}
            
          />
        </div>
        <div className="text-center">
        <button type="submit" className="btn btn-dark my-4">Sign in</button>
        </div>
        
      </form>
    </div>
    </div>
  )
}
