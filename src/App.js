import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/home/Home";
import SideBar from "./components/sideBar/SideBar";
import Trending from "./components/trending/Trending";
import Movies from "./components/movies/Movies";
import Shows from "./components/shows/Shows";
import Details from "./components/details/Details";
import Loader from "./components/loading/Loader";
import { motion } from "framer-motion";
import Search from "./components/search/Search";
import { HiSearch } from "react-icons/hi";

function App() {
  const [allData, setallData] = useState([]);
  const [trending, setTrending] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [topRatedShows, setTopRatedShows] = useState([]);
  const [find, setFind] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  //set loading page
  function loaderTimer() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }
  useEffect(() => {
    loaderTimer();
  }, []);

  function loaderPageTimer() {
    setPageLoading(true);
    setTimeout(() => {
      setPageLoading(false);
    }, 2000);
  }
  useEffect(() => {
    loaderPageTimer();
  }, []);

  //switch page number
  const maxPageN = 20;
  const minPageN = 1;

  const pageIncrement = () => {
    if (currentPage < maxPageN) {
      setCurrentPage((page) => page + 1);
      loaderPageTimer();
    }
  };

  //turn off loader if max / min is reached

  const pageDecrement = () => {
    if (currentPage > minPageN) {
      setCurrentPage((page) => page - 1);
      loaderPageTimer();
    }
  };

  // discover; home link
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=305075112da051598dad6f3e8103590b&page=${currentPage}`
      );

      const response = await data.json();
      setallData(response.results);
    };
    fetchData();
  }, [currentPage]);

  //console.log(allData);

  // trending; tending link

  useEffect(() => {
    const fetchData = async () => {
      const trending = await fetch(
        `https://api.themoviedb.org/3/trending/all/day?api_key=305075112da051598dad6f3e8103590b&page=${currentPage}`
      );
      const response = await trending.json();
      setTrending(response.results);
    };

    fetchData();
  }, [currentPage]);

  // latest movies; movies link

  useEffect(() => {
    const fetchData = async () => {
      const movies = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=305075112da051598dad6f3e8103590b&language=en-US&page=${currentPage}`
      );
      const response = await movies.json();
      setTopRatedMovies(response.results);
    };

    fetchData();
  }, [currentPage]);

  // top rated shows; shows link
  useEffect(() => {
    const fetchData = async () => {
      const tv = await fetch(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=305075112da051598dad6f3e8103590b&language=en-US&page=${currentPage}`
      );
      const response = await tv.json();
      setTopRatedShows(response.results);
    };

    fetchData();
  }, [currentPage]);

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

  //get genre name for each movie/show
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    async function fetchGenres() {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=305075112da051598dad6f3e8103590b&language=en-US`
      );
      const data = await response.json();
      setGenres(data.genres);
    }
    fetchGenres();
  }, [find.id]);

  const [moreDetails, setMoreDetails] = useState([]);

  useEffect(() => {
    async function fetchMovieDetails() {
      const response = await fetch(
        `https://api.themoviedb.org/3/${find.media_type}/${find.id}?api_key=305075112da051598dad6f3e8103590b`
      );
      const data = await response.json();
      setMoreDetails(data);
    }

    fetchMovieDetails();
  }, [find.id]);

  //search movie based on name from search bar
  //get value
  //display search item in another page
  const [result, setResult] = useState([]);
  const [search, setSearch] = useState("");
  async function searchMedia() {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=305075112da051598dad6f3e8103590b&language=en-US&query=${search}&page=1&include_adult=false`
    );
    const data = await response.json();
    setResult(data.results);
  }

  const getValue = (e) => {
    setSearch(e.target.value);
    searchMedia();
  };

  const searchDiv = (
    <form>
      <input
        type="text"
        placeholder="search"
        value={search}
        onChange={getValue}
      />
      <Link to="/search-results">
        <button onClick={() => setSearch("")}>
          <HiSearch />
        </button>
      </Link>
    </form>
  );

  return (
    <>
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              duration: 2,
            },
          }}
        >
          <Loader />
        </motion.div>
      ) : (
        <div className="container">
          <SideBar
            setPage={setCurrentPage}
            page={currentPage}
            loaderPageTimer={loaderPageTimer}
          />
          {pageLoading ? (
            <Loader />
          ) : (
            <div className="right-container">
              <main>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Home
                        allData={allData}
                        handleIdChange={handleIdChange}
                        page={currentPage}
                        pageIncrement={pageIncrement}
                        pageDecrement={pageDecrement}
                        loaderPageTimer={loaderPageTimer}
                        searchDiv={searchDiv}
                      />
                    }
                  />
                  <Route
                    path="/trending"
                    element={
                      <Trending
                        trending={trending}
                        handleIdChange={handleIdChange}
                        page={currentPage}
                        pageIncrement={pageIncrement}
                        pageDecrement={pageDecrement}
                        loaderPageTimer={loaderPageTimer}
                        searchDiv={searchDiv}
                      />
                    }
                  />
                  <Route
                    path="/movies"
                    element={
                      <Movies
                        topRatedMovies={topRatedMovies}
                        handleIdChange={handleIdChange}
                        page={currentPage}
                        pageIncrement={pageIncrement}
                        pageDecrement={pageDecrement}
                        loaderPageTimer={loaderPageTimer}
                        searchDiv={searchDiv}
                      />
                    }
                  />
                  <Route
                    path="/shows"
                    element={
                      <Shows
                        topRatedShows={topRatedShows}
                        handleIdChange={handleIdChange}
                        page={currentPage}
                        pageIncrement={pageIncrement}
                        pageDecrement={pageDecrement}
                        loaderPageTimer={loaderPageTimer}
                        searchDiv={searchDiv}
                      />
                    }
                  />

                  <Route
                    path="/about"
                    element={
                      <Details find={find} id={id} moreDetails={moreDetails} />
                    }
                  />

                  <Route
                    path="/search-results"
                    element={
                      <Search
                        result={result}
                        handleIdChange={handleIdChange}
                        page={currentPage}
                        pageIncrement={pageIncrement}
                        pageDecrement={pageDecrement}
                        loaderPageTimer={loaderPageTimer}
                        searchDiv={searchDiv}
                      />
                    }
                  />
                </Routes>
              </main>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default App;
