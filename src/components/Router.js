import React, { useState } from "react";
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

const AppRouter = ({ isLoggedIn }) => {
    

    return (
        <Router>
            { isLoggedIn && <Navigation /> }
            <Routes>
                {
                    isLoggedIn ?
                        <>
                            <Route path="/" element={<Home />}/>
                            <Route path="/profile" element={<Profile />}/>
                            {/** 페이지 리디렉션 */}
                            <Route paht="*" element={<Navigate replace to="/"/>}/>
                        </>
                        : 
                        <>
                            <Route path="/" element={<Auth />}/>
                            <Route paht="*" element={<Navigate replace to="/"/>}/>
                        </>
                }
            </Routes>
        </Router>
    );
}

export default AppRouter;