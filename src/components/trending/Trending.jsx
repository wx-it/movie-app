import Card from "../card/Card";

const Movie = ({ trending }) => {
  return (
    <div className="movies">
      {trending.map((m) => (
        <Card m={m} />
      ))}
    </div>
  );
};

export default Movie;
