import { useEffect, useState } from "react";
import Movie from "./components/movie/Movie";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/trending/all/day?api_key=305075112da051598dad6f3e8103590b"
      );

      const response = await data.json();
      setMovies(response.results);
    };
    fetchData();
  }, []);

  console.log(movies);

  return (
    <div className="App">
      <header>
        <h1>Movies App</h1>
      </header>
      <main>
        <Movie movies={movies} />
      </main>
    </div>
  );
}

export default App;
