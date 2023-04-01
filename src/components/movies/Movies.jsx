import Card from "../card/Card";

const Movies = ({ topRatedMovies, handleIdChange }) => {
  return (
    <div className="movies">
      {topRatedMovies.map((m) => (
        <Card m={m} key={m.id} handleIdChange={handleIdChange} />
      ))}
    </div>
  );
};

export default Movies;
