import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavigationItem = ({ to, children }) => {
  const location = useLocation();

  // Function to determine if the navigation item is active
  const isActive = location.pathname === to;

  // Define styles for active and inactive navigation items
  const navItemStyle = {
    color: isActive ? "blue" : "black",
    fontWeight: isActive ? "normal" : "normal",
  };

  return (
    <Link to={to} style={navItemStyle}>
      {children}
    </Link>
  );
};

export default NavigationItem;
