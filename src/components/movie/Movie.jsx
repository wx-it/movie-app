import "./movie.css";

const Movie = ({ movies }) => {
  return (
    <>
      {movies.map((m) => (
        <div key={m.id} className="movie">
          <img
            src={`https://image.tmdb.org/t/p/w1280/${m.poster_path}`}
            alt={m.title}
          />
          <div className="movie-title" >
            <h3>{m.title ? m.title : m.name}</h3>
          </div>
        </div>
      ))}
    </>
  );
};

export default Movie;
