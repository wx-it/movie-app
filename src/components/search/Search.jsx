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
  searchDiv,
}) => {
  return (
    <div className="all-content">
      <div className="title-search">
        <h2>Search Results</h2>
        {searchDiv}
      </div>
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
