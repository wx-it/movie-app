import Card from "../card/Card";

const Shows = ({ topRatedShows }) => {
  return (
    <div className="movies">
      {topRatedShows.map((m) => (
        <Card m={m} key={m.id} />
      ))}
    </div>
  );
};

export default Shows;
