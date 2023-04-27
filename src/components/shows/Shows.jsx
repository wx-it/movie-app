import Card from "../card/Card";
import Pagination from "../pagination/Pagination";

const Shows = ({
  topRatedShows,
  handleIdChange,
  pageDecrement,
  pageIncrement,
  page,
  loaderPageTimer,
}) => {
  return (
    <div className="all-content">
      <h2>TV Shows</h2>
      <div className="movies">
        {topRatedShows.map((m) => (
          <Card
            m={m}
            key={m.id}
            handleIdChange={handleIdChange}
            loaderPageTimer={loaderPageTimer}
          />
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
