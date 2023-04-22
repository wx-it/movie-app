import { Link } from "react-router-dom";
import Card from "../card/Card";
import Pagination from "../pagination/Pagination";
import "../card/card.css";

const Home = ({
  allData,
  handleIdChange,
  page,
  pageIncrement,
  pageDecrement,
}) => {
  return (
    <div className="all-content">
      <div className="movies">
        {allData.map((m) => (
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

export default Home;
