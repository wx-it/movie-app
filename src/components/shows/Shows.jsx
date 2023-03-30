import Card from "../card/Card";

const Shows = ({ topRatedShows }) => {
  return (
    <div className="movies">
      {topRatedShows.map((m) => (
        <Card m={m} />
      ))}
    </div>
  );
};

export default Shows;
