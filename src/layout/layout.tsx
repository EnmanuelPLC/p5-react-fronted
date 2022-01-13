// @ts-nocheck
import React, { FunctionComponent, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./header";
import Home from "../routes/home";
import NotFound from "../routes/notFound";
import Footer from "./footer";
import "./css/layout.css";
import Dashboard from "../routes/dashboard";

interface LayoutProps {
    
}
 
const Layout: FunctionComponent<LayoutProps> = () => {
    const [user, setUser] = useState(() => {
    const userSaved = localStorage.getItem("user");
    const typeSaved = localStorage.getItem("user");
    const initialValue = {
        user: JSON.parse(userSaved),
        type: JSON.parse(typeSaved)
    }
    return initialValue || "";
});

    const onSignIn = (data) => {
        setUser(data);
    }

    const onSignOut = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("type");
        setUser('');
    }

    return ( 
        <>
            <Header user={user} onSignOut={onSignOut}/>
            <div className="content-wrapper">
                <Routes>
                    <Route path="/" element={<Home onSignIn={onSignIn} user={user}/>} />
                    <Route path="/dashboard" element={<Dashboard user={user}/>} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
            <Footer />
        </>
     );
}
 
export default Layout;
