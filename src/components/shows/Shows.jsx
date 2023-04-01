import Card from "../card/Card";

const Shows = ({ topRatedShows, handleIdChange }) => {
  return (
    <div className="movies">
      {topRatedShows.map((m) => (
        <Card m={m} key={m.id} handleIdChange={handleIdChange} />
      ))}
    </div>
  );
};

export default Shows;
