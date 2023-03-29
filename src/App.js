import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import Movie from "./components/movie/Movie";
import SideBar from "./components/sideBar/SideBar";
import Trending from "./components/trending/Trending";
import Movies from "./components/movies/Movies";

function App() {
  const [movies, setMovies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);

  // discover; home link
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

  //console.log(movies);

  // trending; tending link

  useEffect(() => {
    const fetchData = async () => {
      const trending = await fetch(
        "https://api.themoviedb.org/3/trending/all/day?api_key=305075112da051598dad6f3e8103590b"
      );
      const response = await trending.json();
      setTrending(response.results);
    };

    fetchData();
  }, []);

  // latest movies; movies link

  useEffect(() => {
    const fetchData = async () => {
      const movies = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=305075112da051598dad6f3e8103590b&language=en-US"
      );
      const response = await movies.json();
      setLatestMovies(response.results);
    };

    fetchData();
  }, []);

  console.log(latestMovies);

  return (
    <div className="container">
      <SideBar />
      <div className="right-container">
        <header>
          <h1>Movies Planet</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Movie movies={movies} />} />
            <Route
              path="/trending"
              element={<Trending trending={trending} />}
            />

            <Route
              path="/movies"
              element={<Movies latestMovies={latestMovies} />}
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
