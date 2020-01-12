import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./components/home/index";
import LinearRegression from "./components/linear-regression/index";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/linear-regression" component={LinearRegression} />
      </Switch>
    </div>
  );
}

export default App;
