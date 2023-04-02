import "./details.css";
import { useEffect, useState } from "react";

const Details = ({ find }) => {
  const [cast, setCast] = useState([]);
  const getGenres = find.genres.map((g) => <p key={g.name}>{g.name}</p>);

  //get cast from imdb api
  useEffect(() => {
    const fetchImdbCast = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/76600/credits?api_key=305075112da051598dad6f3e8103590b`
      );
      const data = await response.json();
      setCast(data);
    };
    fetchImdbCast();
  }, []);

  const firstThreeDirectors = cast.crew
    .filter((person) => person.known_for_department === "Directing")
    .splice(0, 3)
    .map((director) => (
      <div key={director.id}>
        <img
          src={`https://image.tmdb.org/t/p/w1280/${director.profile_path}`}
          alt={director.name}
        />
        <h4> {director.name} </h4>
      </div>
    ));

  const firstThreeActors = [...cast.cast].splice(0, 3).map((actor) => (
    <div key={actor.cast_id}>
      <img
        src={`https://image.tmdb.org/t/p/w1280/${actor.profile_path}`}
        alt={actor.name}
      />
      <h4> {actor.name} </h4>
      <h4> {actor.character} </h4>
    </div>
  ));
  /*
  const getDirectors = cast.directors.items.map((i) => (
    <div key={i.name}>
      <p> {i.name} </p>
    </div>
  ));
  
  const getWriters = cast.writers.items.map((i) => (
    <div key={i.name}>
      <div className="cast">
        <p> {i.name} </p>
      </div>
    </div>
  ));*/

  return (
    <div className="about">
      <div className="image">
        <span> {find.vote_average}/ 10 </span>
        <img
          src={`https://image.tmdb.org/t/p/w1280/${find.backdrop_path}`}
          alt={find.title}
        />
        <div>{getGenres}</div>
      </div>
      <h1> {find.title} </h1>
      <span> {find.release_date} </span>
      <p> {find.overview} </p>

      <div className="cast">
        <h3>Director</h3>
        {firstThreeDirectors}
      </div>
      <div>
        <h3> Cast </h3>
        {firstThreeActors}
      </div>
    </div>
  );
};

export default Details;
