import "./details.css";
import { useEffect, useState } from "react";

const Details = ({ find, id }) => {
  const [data, setData] = useState([]);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  //const getGenres = find.genres.map((g) => <p key={g.name}>{g.name}</p>);

  //get cast from imdb api
  useEffect(() => {
    const fetchImdbCast = async () => {
      const allData = await fetch(
        `https://api.themoviedb.org/3/${find.media_type}/${id}/credits?api_key=305075112da051598dad6f3e8103590b`
      );
      const response = await allData.json();
      setData(response);
    };
    fetchImdbCast();
  }, [find.media_type]);

  useEffect(() => {
    if (data.crew && data.crew.length > 2) {
      const firstFourObjects = data.crew
        .filter(
          (obj, index, self) => index === self.findIndex((t) => t.id === obj.id)
        )
        .slice(0, 4);
      setCrew(firstFourObjects);
    }

    if (data.cast && data.cast.length > 2) {
      const firstFourActors = data.cast.slice(0, 4);
      setCast(firstFourActors);
    }
  }, [data]);

  const firstFourCrew = crew.map((c) => (
    <div key={c.id}>
      <div className="crew-title">
        <h4> {c.name} </h4>
      </div>
    </div>
  ));

  const firstThreeActors = cast.map((actor) => (
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
      </div>
      <h1> {find.title || find.original_name} </h1>
      <span> {find.release_date} </span>
      <p> {find.overview} </p>

      <div className="crew">
        <h3>Crew</h3>
        {firstFourCrew}
      </div>
      <div className="cast">
        <h3>Cast</h3>
        <section>{firstThreeActors}</section>
      </div>
    </div>
  );
};

export default Details;
