import { FunctionComponent, useState } from "react";
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
    const userNameSaved = localStorage.getItem("username");
    const typeSaved = localStorage.getItem("type");
    const tokenSaved = localStorage.getItem("token");
    if (nameSaved && userNameSaved && typeSaved && tokenSaved) {
      return {
        name: JSON.parse(nameSaved),
        username: JSON.parse(userNameSaved),
        type: JSON.parse(typeSaved),
        token: JSON.parse(tokenSaved),
      }
    } else return ''
  });

  const onSignIn = (data: any) => {
    setUser(data);
  };

  const onSignOut = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("username");
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
