import { Link } from "react-router-dom";
import Card from "../card/Card";

const Home = ({ allData }) => {
  return (
    <div className="movies">
      {allData.map((m) => (
        <Card m={m} key={m.id} />
      ))}
    </div>
  );
};

export default Home;