import { Link } from "react-router-dom";
import Card from "../card/Card";
import Pagination from "../pagination/Pagination";
import "../card/card.css";
import { motion } from "framer-motion";

const Home = ({
  allData,
  handleIdChange,
  page,
  pageIncrement,
  pageDecrement,
  loaderPageTimer,
}) => {
  return (
    <div className="all-content">
      <h2>Discover</h2>
      <div className="movies">
        {allData.map((m) => (
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

export default Home;
