import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Layout({ children }) {
  return (
    <div style={{ position: "relative" }}>
      <Header />
      {children}
      {/* <br/>   <br/>  <br/>   <br/>   <br/>   <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/> */}
      <Footer />
    </div>
  );
}

export default Layout;