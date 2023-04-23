import React from "react";
import "./pagination.css";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Pagination = ({ page, pageIncrement, pageDecrement }) => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowText(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{
        y: 0,
        opacity: showText ? 1 : 0,
        transition: {
          duration: 2,
        },
      }}
      className="pagination"
    >
      {showText && (
        <>
          <button onClick={pageDecrement}>Previous</button>
          <p> {page} </p>
          <button onClick={pageIncrement}>Next</button>
        </>
      )}
    </motion.div>
  );
};

export default Pagination;
