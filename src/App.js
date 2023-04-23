import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import Home from "./components/home/Home";
import SideBar from "./components/sideBar/SideBar";
import Trending from "./components/trending/Trending";
import Movies from "./components/movies/Movies";
import Shows from "./components/shows/Shows";
import Details from "./components/details/Details";
import Loader from "./components/loading/Loader";
import { motion } from "framer-motion";

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
          <SideBar setPage={setCurrentPage} page={currentPage} />
          {pageLoading ? (
            <Loader />
          ) : (
            <div className="right-container">
              <motion.header
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: 2,
                  },
                }}
              >
                <h1>Movies Planet</h1>
              </motion.header>
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
                      />
                    }
                  />

                  <Route
                    path="/about"
                    element={<Details find={find} id={id} />}
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
