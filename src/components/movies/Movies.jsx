import Card from "../card/Card";

const Movies = ({ topRatedMovies }) => {
  return (
    <div className="movies">
      {topRatedMovies.map((m) => (
        <Card m={m} key={m.id} />
      ))}
    </div>
  );
};

export default Movies;
