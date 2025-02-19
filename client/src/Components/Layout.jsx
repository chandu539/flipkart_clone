import React from "react";
import NavbarLogin from "./NavbarLogin";
import SecondaryNavbar from "./SecondaryNavbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar"; // Import Sidebar component

const Layout = ({ children }) => {
  return (
    <div>
      <NavbarLogin />
      <SecondaryNavbar />
      <div style={{ display: "flex" }}>
        <Sidebar /> {/* Sidebar added here */}
        <div style={{ flex: 1, padding: "20px" }}>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
