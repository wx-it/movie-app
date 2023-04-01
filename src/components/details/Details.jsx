import "./details.css";

const Details = ({ find }) => {
  const getGenres = find.genres.map((g) => <p key={g.name}>{g.name}</p>);

  return (
    <div className="about">
      <div className="image">
        <span> {find.vote_average}/ 10 </span>
        <img
          src={`https://image.tmdb.org/t/p/w1280/${find.backdrop_path}`}
          alt={find.title}
        />
        <div>
        {getGenres}
        </div>
      </div>
      <h1> {find.title} </h1>
      <p> {find.overview} </p>
    </div>
  );
};

export default Details;
