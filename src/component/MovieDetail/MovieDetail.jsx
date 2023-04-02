import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Recommendations from "../Recommendations/Recommendations";
import styles from "./Movie.module.css";


export default function MovieDetail() {
  let { id } = useParams();

  let [details, setDetails] = useState({});
  let [keyWords, setKeywords] = useState([]);

  let getDetails = async () => {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=b81e4ea3c1d3d04d265bfa9056fb7110&language=en-US`
    );
    setDetails(data);
  };
  let getKeyWords = async () => {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/keywords?api_key=b81e4ea3c1d3d04d265bfa9056fb7110`
    );
    setKeywords(data.keywords);
  };

  useEffect(() => {
    getDetails();
    getKeyWords();
  }, []);
  return (
    <div>
      <div className="text-center pt-2">


        <ul className="list-inline list-unstyled pt-2">
          <li className="list-inline-item me-5 fs-4 fw-bold"><Link to={`/movie/review/${id}`}>Reviews</Link></li>
          <li className="list-inline-item me-5 fs-4 fw-bold"><Link to={`/movie/translation/${id}`}>Translation</Link></li>
          <li className="list-inline-item me-5 fs-4 fw-bold"><Link>Release Dates</Link></li>
          <li className="list-inline-item me-5 fs-4 fw-bold"><Link></Link></li>



        </ul>
      </div>
      <div className={styles.detail}>
        <div className="container  my-4 py-4">
          <div className="row">
          <div className='img_con col-md-6'>
            <img
              src={`https://www.themoviedb.org/t/p/w220_and_h330_face${details.poster_path}`}
              className="rounded " height= {500}
            />
          </div>

          <div className="text_con ps-4 col-md-6">
            <h1 className="fw-bold text-white">{details.title}</h1>
            <div className="d-flex gap-4 mb-4">
              <p className="fs-6 text-secondary">{details.release_date}</p>
              <p className="fs-6 text-secondary">
                {Math.floor(details.runtime / 60)}h {details.runtime % 60}min
              </p>
              <div>
                {
                 // details.genres.map((gener)=>(
                  // <p>{gener.name}</p>
                 // ))
                }
              </div>
            </div>
            <div className="my-3">
              <div className="d-flex gap-3">
              <div className={`text-white p-2 bg-secondary fs-4 ${styles.percent} rounded-circle text-center`}>{Math.ceil(details.vote_average*10)}<sup>%</sup></div>
              <p className="text-capitalize text-white  fs-5 ">user <br />score</p>
              </div>
            </div>
            <p className={styles.tag}>{details.tagline}</p>
            <h2 className="text-white">overview</h2>
            <p className="fs-6 text-white">{details.overview}</p>
          </div>

          </div>
      
        </div>
      </div>

      <div className="container">
      <div className="mt-5">
        <h5 className="fw-bold">Status</h5>
        <p  className="text-secondary">{details.status}</p>
        <h5 className="fw-bold">Original Languge</h5>
        <p className="text-secondary">{details.original_language}</p>
        <h5 className="fw-bold">Budjet</h5>
        <p className="text-secondary">{details.budget}$</p>
        <h5 className="fw-bold">Revenue</h5>
        <p className="text-secondary">{details.revenue}$</p>
        <h5 className="fw-bold">Keywords</h5>
        {keyWords.map((Keyword,index) => (
          <span key={index} className="p-2 bg-secondary rounded d-inline-block me-2 mb-2">
            {Keyword.name}
          </span>
        ))}
      </div>

      <div>
        <Recommendations id={id} />
      </div>

    </div>
    </div>
  );
}
