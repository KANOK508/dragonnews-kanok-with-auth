import Navbar from "@/components/shared/Navbar";
import React from "react";
import { montserrat } from "../layout";

const AuthLayout = ({ children }) => {
  return (
    <div className={`${montserrat.className}`}>
      <Navbar />
      {children}
      {/* if we give any thing here, they will stay for every time..  */}
      {/* --------all page we create in this (auth)  folder they will be the children..  */}
    </div>
  );
};

export default AuthLayout;
