import BreakingNews from "@/components/shared/BreakingNews";
import Header from "@/components/shared/Header";
import Navbar from "@/components/shared/Navbar";
import React from "react";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <BreakingNews />
      <Navbar />
      {/* ---------the above 3 are common components for all pages in the main layout and others --
      children are those ---> who are specific to each page */}
      {children}
    </>
  );
};

export default MainLayout;
