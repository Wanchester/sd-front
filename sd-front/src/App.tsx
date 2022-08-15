import React, { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { GlobalStyle } from "./GlobalStyle";
import HomePage from "./HomePage";
import LogInPage from "./LogInPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import StatsPage from "./StatsPage";
const App = () => {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/StatsPage" element={<StatsPage />} />
        </Routes>
      </Router>
      <GlobalStyle />
    </Fragment>
  );
};

export default App;
