import "./movie.css";

const Movie = ({ movies }) => {
  return (
    <>
      {movies.map((m) => (
        <div key={m.id} className="movie">
          <img
            src={`https://image.tmdb.org/t/p/w500/${m.backdrop_path}`}
            alt={m.title}
          />
          <p>{m.title}</p>
          <p>{m.overview}</p>
        </div>
      ))}
    </>
  );
};

export default Movie;
