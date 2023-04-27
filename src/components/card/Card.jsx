import { Link } from "react-router-dom";
import "./card.css";
import { motion } from "framer-motion";

const Card = ({ m, handleIdChange, loaderPageTimer }) => {
  return (
    <Link to="/about">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: {
            duration: 2,
          },
        }}
        onClick={() => {handleIdChange(m.id, m.title || m.name); loaderPageTimer()}}
        key={m.id}
        className="movie"
      >
        <img
          src={`https://image.tmdb.org/t/p/w1280/${m.poster_path}`}
          alt={m.title}
        />
        <div className="overlay-card"></div>
        <div className="movie-title">
          <h3>{m.title ? m.title : m.name}</h3>
        </div>
      </motion.div>
    </Link>
  );
};

export default Card;
