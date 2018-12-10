import React, { Component } from "react";
import { Link, Switch, Route } from "react-router-dom";
import Home from "./components/home";
import About from "./components/about";
import "./app.css";

export default class App extends Component {

  render() {
    return (
      <>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
        </Switch>
      </>
    );
  }
}