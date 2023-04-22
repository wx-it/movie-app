import React from "react";
import "./pagination.css";

const Pagination = ({ page, pageIncrement, pageDecrement }) => {
  return (
    <div className="pagination">
      <button onClick={pageDecrement}>Previous</button>
      <p> {page} </p>
      <button onClick={pageIncrement}>Next</button>
    </div>
  );
};

export default Pagination;
