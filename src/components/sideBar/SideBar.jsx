import "./sideBar.css";
import { useState } from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
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
      <MdKeyboardDoubleArrowRight
        className="sidebar-toggle"
        onClick={handleToggler}
      />
    </div>
  );
};

export default SideBar;
