import Card from "../card/Card";

const Movies = ({ topRatedMovies, setCurrentId }) => {
  return (
    <div className="movies">
      {topRatedMovies.map((m) => (
        <Card m={m} setCurrentId={setCurrentId} />
      ))}
    </div>
  );
};

export default Movies;
