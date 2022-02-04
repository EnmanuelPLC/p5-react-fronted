// @ts-nocheck
import React, { FunctionComponent, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./header";
import Home from "../routes/home";
import NotFound from "../routes/notFound";
import Footer from "./footer";
import "./css/layout.css";
import Dashboard from "../routes/dashboard";

interface LayoutProps { }

const Layout: FunctionComponent<LayoutProps> = () => {
  const [user, setUser] = useState(() => {
    const nameSaved = localStorage.getItem("name");
    const typeSaved = localStorage.getItem("type");
    const tokenSaved = localStorage.getItem("token");
    const initialValue = {
      name: JSON.parse(nameSaved),
      type: JSON.parse(typeSaved),
      token: JSON.parse(tokenSaved),
    };
    return initialValue || "";
  });

  const onSignIn = (data) => {
    setUser(data);
  };

  const onSignOut = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("type");
    localStorage.removeItem("token");
    setUser("");
  };

  return (
    <>
      <Header user={user} onSignOut={onSignOut} />
      <div className="content-wrapper">
        <div id="myAlert" className="alert alert-primary fade" role="alert">
          <div className="ico"></div>
          <div className="text"></div>
        </div>
        <Routes>
          <Route path="/" element={<Home onSignIn={onSignIn} user={user} />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="*" element={<NotFound user={user} />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
