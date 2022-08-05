import React, { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { GlobalStyle } from "./GlobalStyle";
import HomePage from "./HomePage";
import LogInPage from "./LogInPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const App = () => {
  if (localStorage.getItem("isLogin") === "true") {
    return <HomePage userName={localStorage.getItem("userName") || ""} />;
  }
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LogInPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
      <GlobalStyle />
    </Fragment>
  );
};

export default App;
