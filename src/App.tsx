import React, { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { GlobalStyle } from "./GlobalStyle";
import HomePage from "./HomePage";
import LogInPage from "./LogInPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LogInPage />} />
        </Routes>
      </BrowserRouter>
      <GlobalStyle />
    </Fragment>
  );
};

export default App;
