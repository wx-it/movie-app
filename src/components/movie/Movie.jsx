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
          <h3>{m.title ? m.title : m.name}</h3>
        </div>
      ))}
    </>
  );
};

export default Movie;
