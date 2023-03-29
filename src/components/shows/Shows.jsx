import "../home/movie.css";

const Shows = ({ topRatedShows }) => {
  return (
    <div className="movies" >
      {topRatedShows.map((m) => (
        <div key={m.id} className="movie">
          <img
            src={`https://image.tmdb.org/t/p/w1280/${m.poster_path}`}
            alt={m.title}
          />
          <div className="overlay-card" ></div>
          <div className="movie-title" >
            <h3>{m.title ? m.title : m.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shows;
