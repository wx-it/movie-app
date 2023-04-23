import Card from "../card/Card";
import Pagination from "../pagination/Pagination";

const Shows = ({
  topRatedShows,
  handleIdChange,
  pageDecrement,
  pageIncrement,
  page,
}) => {
  return (
    <div className="all-content">
      <div className="movies">
        {topRatedShows.map((m) => (
          <Card m={m} key={m.id} handleIdChange={handleIdChange} />
        ))}
      </div>
      <Pagination
        page={page}
        pageIncrement={pageIncrement}
        pageDecrement={pageDecrement}
      />
    </div>
  );
};

export default Shows;
