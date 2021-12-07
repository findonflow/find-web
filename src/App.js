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

export default function App() {

  const [user, setUser] = useState({ loggedIn: null })
  useEffect(() => fcl.currentUser().subscribe(setUser), [])
  const [subdomain, setSubdomain] = useState("NoSub")
  useEffect(() => {
    const host = window.location.hostname
    const validSubdomain = (/(\..*){2,}/).test(host)
  if (validSubdomain) {
    setSubdomain(window.location.hostname.split('.'))
    console.log(validSubdomain)
  }}
  , [])
  


  return (
    <Container className="main-container g-0" fluid>
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
          { subdomain !== "NoSub" &&
            <Route path="/" element={<NameSearch subdomain={subdomain} />} />}
            <Route path='/' element={<Home />} />
          {/* <Route path='/profile' element={<Profile user={user} />} /> */}
          <Route path='/me' element={<Profile user={user} />} />
            <Route path=':id' element={<NameSearch />} />
          <Route path='/remove' element={<RemoveProfile />} />
        </Routes>
        <Footer />
      </Router>
    </Container>
  )
}
