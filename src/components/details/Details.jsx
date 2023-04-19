import "./details.css";
import { useEffect, useState } from "react";

const Details = ({ find, id }) => {
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const getGenres = find.genres.map((g) => <p key={g.name}>{g.name}</p>);
  const [type, setType] = useState('movie')

  //get cast from imdb api
  useEffect(() => {
    const fetchImdbCast = async () => {
      setType(find.first_air_date ? "tv" : "movie")
      const response = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=305075112da051598dad6f3e8103590b`
      );
      const data = await response.json();
      setCast(data.cast);
      setCrew(data.crew);
    };
    fetchImdbCast();
  }, [type]);

  console.log(crew);

  const firstThreeDirectors = [...crew]
    .filter(
      (obj, index, self) => index === self.findIndex((t) => t.id === obj.id)
    )
    .splice(0, 6)
    .map((director) =>
        <div key={director.id}>
          <div className="cast-title">
            <h4> {director.name} </h4>
          </div>
        </div>
    );

  const firstThreeActors = [...cast].splice(0, 5).map((actor) => (
    <div key={actor.cast_id}>
      <img
        src={`https://image.tmdb.org/t/p/w1280/${actor.profile_path}`}
        alt={actor.name}
      />
      <div className="cast-title">
        <h4> {actor.name} </h4>
      </div>
    </div>
  ));

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
      <h1> {find.title || find.original_name} </h1>
      <span> {find.release_date} </span>
      <p> {find.overview} </p>

      <div className="crew">
        <h3>Crew</h3>
        <section>{firstThreeDirectors}</section>
      </div>
      <div className="crew">
        <h3>Cast</h3>
        <section>{firstThreeActors}</section>
      </div>
    </div>
  );
};

export default Details;
