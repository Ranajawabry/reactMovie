
import axios from "axios";
import React, { useEffect, useState } from "react";
export default function Keywords(id) {
  
    let [keyWords, setKeywords] = useState([]);
  
    let getKeyWords = async () => {
        let { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/keywords?api_key=b81e4ea3c1d3d04d265bfa9056fb7110`
        );
        setKeywords(data.keywords);
      };
      useEffect(() => {
        getKeyWords();
      }, []);
  
  
    return (
    <div>
        {keyWords.map((Keyword,index) => (
          <span key={index} className="p-2 bg-light rounded d-inline-block me-2 my-2">
            {Keyword.name}
          </span>
        ))}

    </div>
  )
}
