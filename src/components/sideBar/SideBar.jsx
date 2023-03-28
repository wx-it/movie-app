import "./sideBar.css";
import { useState } from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { SlScreenDesktop } from "react-icons/sl";
import { TbMovie } from "react-icons/tb";
import { AiOutlineHome, AiOutlineFire } from "react-icons/ai";
const SideBar = () => {
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
    <div className={isExpanded ? "sideBar" : "sideBar collapsed"}>
      <div className="sideBar-top">
        <h2>Movies</h2>
        <MdKeyboardDoubleArrowRight
          className={isExpanded ? "sidebar-toggle rotated" : "sidebar-toggle"}
          onClick={handleToggler}
        />
      </div>

      <nav className={isExpanded ? "links" : "links icons-only"}>
        <div>
          <AiOutlineHome />
          <h4>Home</h4>
        </div>
        <div>
          <AiOutlineFire />
          <h4>Trending</h4>
        </div>
        <div>
          <TbMovie />
          <h4>Movies</h4>
        </div>
        <div>
          <SlScreenDesktop />
          <h4>Shows</h4>
        </div>
      </nav>
    </div>
  );
};

export default SideBar;
