import Card from "../card/Card";

const Movie = ({ trending, handleIdChange }) => {
  return (
    <div className="movies">
      {trending.map((m) => (
        <Card m={m} key={m.id} handleIdChange={handleIdChange} />
      ))}
    </div>
  );
};

export default Movie;
