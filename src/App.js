import React from "react";
import Login from "./components/Login/Login";
import AddressBook from "./components/Address-book/Address-book";
import Favorites from "./components/Favorites/Favorites";
import Contact from "./components/Contact/Contact";
import Details from "./components/Details/Details";
import Signup from "./components/Signup/Signup";
import { AuthProvider } from "./AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/adresar" element={<AddressBook />} />
            <Route path="/adresar/omiljeni" element={<Favorites />} />
            <Route path="/kontakt" element={<Contact />} />
            <Route path="/kontakt/detalji/:detailId" element={<Details />} />
            <Route path="/kontakt/:updateId" element={<Contact />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
