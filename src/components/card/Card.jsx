import { Link } from "react-router-dom";
import "./card.css";

const Card = ({ m, handleIdChange }) => {
  return (
    //<Link to="/about">
      <div  key={m.id} className="movie">
        <img
          src={`https://image.tmdb.org/t/p/w1280/${m.poster_path}`}
          alt={m.title}
        />
        <div className="overlay-card"></div>
        <div onClick={() => handleIdChange(67890)}  className="movie-title">
          <h3>{m.title ? m.title : m.name}</h3>
        </div>
      </div>
    //</Link>
  );
};

export default Card;
