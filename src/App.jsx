import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Search from "./Components/Search";
import Home from "./Components/Home";
import Header from "./Components/Header";

function App() {
  return (
    <section
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('src/assets/BLUE_GRADIENT_BG.png')" }}
    >
      <Router>
        <div className="container mx-auto py-4">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </div>
      </Router>
    </section>
  );
}

export default App;
