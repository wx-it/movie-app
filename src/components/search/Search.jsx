import React from "react";
import Card from "../card/Card";
import Pagination from "../pagination/Pagination";

const Search = ({
  result,
  handleIdChange,
  pageIncrement,
  pageDecrement,
  page,
  loaderPageTimer,
}) => {
  console.log(result);
  return (
    <div className="all-content">
      <h2>Search Results</h2>
      <div className="movies">
        {result.map((m) => (
          <Card
            m={m}
            key={m.id}
            handleIdChange={handleIdChange}
            loaderPageTimer={loaderPageTimer}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
