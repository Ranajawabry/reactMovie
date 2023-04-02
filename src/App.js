import React, { useEffect, useState } from "react";
import { Route, Router, Routes, useNavigate } from "react-router-dom";
import Header from "./component/Header/Header";
import MovieDetail from "./component/MovieDetail/MovieDetail";
import Navbar from "./component/Navbar/Navbar";
import Login from "./component/Login/Login";
import Popular from "./component/Popular/Popular";
import Register from "./component/Register/Register";
import Reviews from "./component/Reviews/Reviews";
import PopularPeople from "./component/PopularPeople/PopularPeople";
import NowPlaying from "./component/NowPlaying/NowPlaying";
import UpComming from "./component/UpComming/UpComming";
import jwtDecode from "jwt-decode";
import PersonDetails from "./component/PersonDetails/PersonDetails";
import Layout from "./Layout/Layout";
import ProtectedRoutes from "./component/ProtectedRoutes/ProtectedRoutes";
import TvPopular from "./component/TvPopular/TvPopular";
import TopRated from "./component/TopRated/TopRated";
import NotFound from "./component/NotFound/NotFound";
import Trending from "./component/Trending/Trending";
import Search from "./component/Search/Search";
import axios from "axios";

export default function App() {
  let navigate= useNavigate();
  let [userdata, setUserData] = useState(null);
  
  let getUserData = () => {
    if (localStorage.getItem("UserToken")) {
      let decoded = jwtDecode(localStorage.getItem("UserToken"));
      setUserData(decoded.id);
    }
  };
  let logOut= ()=>{
    localStorage.removeItem("UserToken");
    setUserData(null);
    navigate('/home');

  }

  let[nowPlaying,setNowPlaying]=useState([]);
   

  let getNowPlaying=async()=>{
     let{data}=await axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=b81e4ea3c1d3d04d265bfa9056fb7110&language=en-US&page=1');
     setNowPlaying(data.results);
  }

  let[populars,setPopular]=useState([]);
    
  let getPopular=async()=>{
        let{data}=await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=b81e4ea3c1d3d04d265bfa9056fb7110&language=en-US&page=1');
       
       setPopular(data.results);
         
     }
   
    

   
    let[topRated,setTopRated]=useState([]);
    

    let getTopRated=async()=>{
       let{data}=await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=b81e4ea3c1d3d04d265bfa9056fb7110&language=en-US&page=1');
        setTopRated(data.results);
    }

    let[popularsTv,setPopularTv]=useState([]);
    
    let getPopularTv=async()=>{
       let{data}=await axios.get('https://api.themoviedb.org/3/tv/popular?api_key=b81e4ea3c1d3d04d265bfa9056fb7110&language=en-US&page=1');
       setPopularTv(data.results);
    }
   

  useEffect(() => {
    getUserData();
    getNowPlaying();
    getPopular();
    getTopRated();
    getPopularTv();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout userdata={userdata} logOut={logOut} />}>
          <Route index element={<Header />}></Route>
          <Route element={<ProtectedRoutes/>}>
            <Route path="/movie/review/:id" element={<Reviews />}></Route>
            <Route path="/movie/:id" element={<MovieDetail />}></Route>
            <Route path="/person/popular/:id" element={<PersonDetails />}></Route>
          </Route>
          <Route path="/home" element={<Header />}></Route>
          <Route path="/movie/popular" element={<Popular />  }></Route>
          <Route path="/login" element={<Login getUserData={ getUserData } />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/person/popular" element={<PopularPeople />}></Route>
          <Route path="/movie/now_playing" element={<NowPlaying />}></Route>
          <Route path="/movie/up_comming" element={<UpComming />}></Route>
          <Route path="/TV/popular" element={<TvPopular/>}></Route>
          <Route path="/movie/top_rated" element={<TopRated/>}></Route>
          <Route path="/trending" element={<Trending/>}></Route> 
          <Route path="/search/:name" element={<Search  populars={populars} nowPlaying={nowPlaying}  topRated={topRated} popularsTv={popularsTv}/> }></Route>
          <Route path="*" element={<NotFound/>}></Route>

        </Route>
      </Routes>
    </div>
  );
}
