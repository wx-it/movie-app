import "./details.css";
import { useEffect, useState } from "react";

const Details = ({ find, id, moreDetails }) => {
  const [data, setData] = useState([]);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);

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

  //map genres
  const getGenres = moreDetails.genres.map((genre) => (
    <p key={genre.id}>{genre.name}</p>
  ));

  //map crew / cast

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

  //get runtime in hours and minutes

  const formatDuration = () => {
    const hours = Math.floor(moreDetails.runtime / 60);
    const minutes = moreDetails.runtime % 60;
    return `${hours}h ${minutes}min`;
  };

  const formattedDuration = formatDuration(moreDetails.runtime);

  return (
    <div className="about">
      <h1> {find.title || find.original_name} </h1>

      <div className="images">
        <img
          src={`https://image.tmdb.org/t/p/w1280/${find.backdrop_path}`}
          alt={find.title}
        />
      </div>
      <div className="genres">{getGenres}</div>
      <section>
        <span className="vote">
          {find.vote_average.toString().substring(0, 3)}/<span>10</span>
        </span>
        <div className="info">
          <div>
            <h5>Released Date:</h5>
            <p> {find.release_date} </p>
          </div>
          <div>
            <h5>Duration:</h5>
            <p> {formattedDuration} </p>
          </div>
          <div>
            <h5>Status:</h5>
            <p> {moreDetails.status} </p>
          </div>
        </div>
      </section>
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
