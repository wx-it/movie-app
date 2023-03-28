import { useEffect, useState } from "react";
import Movie from "./components/movie/Movie";
import SideBar from "./components/sideBar/SideBar";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/discover/movie?api_key=305075112da051598dad6f3e8103590b"
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
        <h1>Movies Planet</h1>
      </header>
      <main>
        <SideBar />
        <Movie movies={movies} />
      </main>
    </div>
  );
}

export default App;
