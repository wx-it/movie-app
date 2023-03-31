import { Link } from "react-router-dom";
import Card from "../card/Card";

const Home = ({ allData, handleIdChange }) => {
  return (
    <div className="movies">
      {allData.map((m) => (
        <Card m={m} key={m.id} handleIdChange={handleIdChange} />
      ))}
    </div>
  );
};

export default Home;
