import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux"; // Import Provider from react-redux
import "./App.css";
import Search from "./Components/Search";
import Home from "./Components/Home";
import Header from "./Components/Header";
import { store } from "./redux/store";

function App() {
  return (
    <section
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('src/assets/BLUE_GRADIENT_BG.png')" }}
    >
      <Provider store={store}>
        {" "}
        {/* Wrap your component tree with the Provider */}
        <Router>
          <div className="container mx-auto py-4">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </div>
        </Router>
      </Provider>
    </section>
  );
}

export default App;
