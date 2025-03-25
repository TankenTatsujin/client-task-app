import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import AddClient from "./pages/AddClient";
import EditClient from "./pages/EditClient"; // Import EditClient

function App() {
  return (
    <Router>
      <>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<LandingPage />} />
          <Route path="/add-client" element={<AddClient />} />
          <Route path="/edit-client/:id" element={<EditClient />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
