import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import Home from "./components/home/Home";
import SideBar from "./components/sideBar/SideBar";
import Trending from "./components/trending/Trending";
import Movies from "./components/movies/Movies";
import Shows from "./components/shows/Shows";
import Details from "./components/details/Details";
import Card from "./components/card/Card";

function App() {
  const [allData, setallData] = useState([]);
  const [trending, setTrending] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [topRatedShows, setTopRatedShows] = useState([]);
  const [find, setFind] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const [page, setPage] = useState(1)

  //switch page number
  const incrementPageN=()=>{
    setPage(page => page+1)
    console.log(page)
  }

  // discover; home link
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=305075112da051598dad6f3e8103590b&page=${page}`
      );

      const response = await data.json();
      setallData(response.results);
    };
    fetchData();
  }, [page]);

  //console.log(allData);

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
      setTopRatedMovies(response.results);
    };

    fetchData();
  }, []);

  // top rated shows; shows link
  useEffect(() => {
    const fetchData = async () => {
      const tv = await fetch(
        "https://api.themoviedb.org/3/tv/top_rated?api_key=305075112da051598dad6f3e8103590b&language=en-US"
      );
      const response = await tv.json();
      setTopRatedShows(response.results);
    };

    fetchData();
  }, []);

  //get any movie/show
  const [id, setId] = useState(1399); // replace with actual ID
  const [name, setName] = useState();
  function handleIdChange(newId, newName) {
    setId(newId);
    setName(newName);
  }
  useEffect(() => {
    async function fetchSingleMedia() {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=305075112da051598dad6f3e8103590b&language=en-US&query=${name}&page=1&include_adult=false`
      );
      const data = await response.json();
      setFind(data.results[0]);
    }
    fetchSingleMedia();
  }, [name]);

  return (
    <div className="container">
      <SideBar />
      <div className="right-container">
        <header>
          <h1>Movies Planet</h1>
        </header>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <Home allData={allData} handleIdChange={handleIdChange} />
              }
            />
            <Route
              path="/trending"
              element={
                <Trending trending={trending} handleIdChange={handleIdChange} />
              }
            />
            <Route
              path="/movies"
              element={
                <Movies
                  topRatedMovies={topRatedMovies}
                  handleIdChange={handleIdChange}
                />
              }
            />
            <Route
              path="/shows"
              element={
                <Shows
                  topRatedShows={topRatedShows}
                  handleIdChange={handleIdChange}
                />
              }
            />

            <Route path="/about" element={<Details find={find} id={id} />} />
          </Routes>
        </main>
          <button onClick={incrementPageN} >click</button>
      </div>
    </div>
  );
}

export default App;
