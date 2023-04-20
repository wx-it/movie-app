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
  const [find, setFind] = useState();
  const [currentId, setCurrentId] = useState("");

  // discover; home link
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/discover/movie?api_key=305075112da051598dad6f3e8103590b"
      );

      const response = await data.json();
      setallData(response.results);
    };
    fetchData();
  }, []);

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
  const [mediaType, setMediaType] = useState("movie");

  useEffect(() => {
    async function fetchMovie() {
      const movieResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=305075112da051598dad6f3e8103590b&language=en-US`
      );
      const movieData = await movieResponse.json();

      const tvResponse = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=305075112da051598dad6f3e8103590b&language=en-US`
      );
      const tvData = await tvResponse.json();
      if(tvData.first_air_date){
        setMediaType("tv")
        setFind(tvData)
      } else {
        setMediaType("movie");
        setFind(movieData);
      }
      console.log(tvData)
    }
    fetchMovie();
  }, [id, mediaType]);
  console.log(id)

  function handleIdChange(newId) {
    setId(newId);
    setMediaType(find.name ? "tv" : "movie");
  }

  console.log(mediaType);
  console.log(find);

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
                  setCurrentId={setCurrentId}
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
      </div>
    </div>
  );
}

export default App;
