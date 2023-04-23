import "./sideBar.css";
import { useState } from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { SlScreenDesktop } from "react-icons/sl";
import { TbMovie } from "react-icons/tb";
import { AiOutlineHome, AiOutlineFire } from "react-icons/ai";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SideBar = ({ setPage }) => {
  const sideBarCollapse = localStorage.getItem("sideBar-collapsed");
  const [isExpanded, setIsExpanded] = useState(sideBarCollapse ? false : true);

  const handleToggler = () => {
    if (isExpanded) {
      setIsExpanded(false);
      localStorage.setItem("sideBar-collapsed", true);
      return;
    }
    setIsExpanded(true);
    localStorage.removeItem("sideBar-collapsed");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          duration: 2,
        },
      }}
      className={isExpanded ? "sideBar" : "sideBar collapsed"}
    >
      <div className="sideBar-top">
        <h2>Movies</h2>
        <MdKeyboardDoubleArrowRight
          className={isExpanded ? "sidebar-toggle rotated" : "sidebar-toggle"}
          onClick={handleToggler}
        />
      </div>

      <nav className={isExpanded ? "links" : "links icons-only"}>
        <Link to="/">
          <div onClick={() => setPage(1)}>
            <AiOutlineHome />
            <h4>Home</h4>
          </div>
        </Link>
        <Link to="/trending">
          <div onClick={() => setPage(1)}>
            <AiOutlineFire />
            <h4>Trending</h4>
          </div>
        </Link>
        <Link to="/movies">
          <div onClick={() => setPage(1)}>
            <TbMovie />
            <h4>Movies</h4>
          </div>
        </Link>
        <Link to="/shows">
          <div onClick={() => setPage(1)}>
            <SlScreenDesktop />
            <h4>Shows</h4>
          </div>
        </Link>
      </nav>
    </motion.div>
  );
};

export default SideBar;
