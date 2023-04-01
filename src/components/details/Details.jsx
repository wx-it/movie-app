import "./details.css";
import { useEffect, useState } from "react";

const Details = ({ find }) => {

  const [cast, setCast] = useState()
  const getGenres = find.genres.map((g) => <p key={g.name}>{g.name}</p>);
  const getPrCompanies = find.production_companies.map(prC=> <p key={prC.name}> {prC.name} </p>)

  //get cast from imdb api
  useEffect(()=>{
    const fetchImdbCast= async () =>{
      const response = await fetch(`https://imdb-api.com/en/API/FullCast/k_apmw1kwy/${find.imdb_id}`)
      const data = await response.json()
      setCast(data)
    }
    fetchImdbCast()
  },[])
  console.log(cast)

  return (
    <div className="about">
      <div className="image">
        <span> {find.vote_average}/ 10 </span>
        <img
          src={`https://image.tmdb.org/t/p/w1280/${find.backdrop_path}`}
          alt={find.title}
        />
        <div>
        {getGenres}
        </div>
      </div>
      <h1> {find.title} </h1>
      <span> {find.release_date} </span>
      <p> {find.overview} </p>
    </div>
  );
};

export default Details;
