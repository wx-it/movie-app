import Card from "../card/Card";
import Pagination from "../pagination/Pagination";

const Movie = ({
  trending,
  handleIdChange,
  pageDecrement,
  pageIncrement,
  page,
  loaderPageTimer,
  searchDiv,
}) => {
  return (
    <div className="all-content">
      <div className="title-search">
        <h2>Trending</h2>
        {searchDiv}
      </div>
      <div className="movies">
        {trending.map((m) => (
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

export default Movie;
