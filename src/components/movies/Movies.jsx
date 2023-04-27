import Card from "../card/Card";
import Pagination from "../pagination/Pagination";

const Movies = ({
  topRatedMovies,
  handleIdChange,
  pageIncrement,
  pageDecrement,
  page,
  loaderPageTimer,
}) => {
  return (
    <div className="all-content">
      <div className="movies">
        {topRatedMovies.map((m) => (
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

export default Movies;
