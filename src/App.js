// File: ./src/App.js

import React, { useState, useEffect } from "react";
import Home from "./pages/Home"
import { Profile } from "./pages/Profile"
import * as fcl from "@onflow/fcl"
import NavHead from "./components/NavBar";
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Footer from "./components/Footer";
import toast, { ToastBar, Toaster } from 'react-hot-toast';
import { CloseButton, Container } from "react-bootstrap";
import NameSearch from "./pages/NameSearch";
import RemoveProfile from "./pages/RemoveProfile";
import LiveFeed from "./pages/LiveFeed";
import SalesAuction from "./pages/SalesAuctions";

export default function App() {

  const [user, setUser] = useState({ loggedIn: null })
  useEffect(() => fcl.currentUser().subscribe(setUser), [])

  return (
    <Container className="main-container g-0" fluid="true">
      <div className="toastText">
        <Toaster toastOptions={{
          duration: Infinity,
          className: 'toastNotification'
        }}>
          {(t) => (
            <ToastBar toast={t}>
              {({ icon, message }) => (
                <>
                  {icon}
                  {message}
                  {t.type !== 'loading' && (
                    <CloseButton onClick={() => toast.dismiss(t.id)}></CloseButton>
                  )}
                </>
              )}
            </ToastBar>
          )}
        </Toaster></div>
      <Router>
        <NavHead />
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path='/profile' element={<Profile user={user} />} /> */}
          <Route path='/me' element={<Profile user={user} />} />
          <Route path=':id' element={<NameSearch default="profile" />} />
          <Route path=':id/collection' element={<NameSearch default="collection" />} />
          <Route path=':id/collection/:col' element={<NameSearch default="collection" />} />
          <Route path=':id/fund' element={<NameSearch default="fund" />} />

          <Route path='/remove' element={<RemoveProfile />} />
          <Route path='/lf' element={<LiveFeed />} />
          <Route path='mp' element={<SalesAuction />} />
        </Routes>
        <Footer />
      </Router>
    </Container>
  )
}
